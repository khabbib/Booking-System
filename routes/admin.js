const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const md5encrypt = require('md5');
// Load User model

const Session = require('../models/session').Session;

const Admin = require('../models/admin');
const { forwardAuthenticated } = require('../config/auth');
const { collection, find } = require('../models/admin');
const db = require('../config/keys').mongoURI;
const mongoose = require('mongoose');
const { response } = require('express');
const { password } = require('../config/emailkey');
const { has } = require('browser-sync');
const sessions = require('../models/session');

function random(low, high) {
  return Math.random() * (high - low) + low
}

// Register
router.post('/registerA', (req, res) => {
  const { name, Lastname, email, password, password2} = req.body;
  let errors = [];

  if (!name || !Lastname || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('admin', {
      errors,
      name,
      Lastname,
      email,
      password,
      password2
    });
  } else {
    Admin.findOne({ email: email }).then(admin => {
      if (admin) {
        errors.push({ msg: 'Email already exists' });
        res.render('admin', {
          errors,
          name,
          Lastname,
          email,
          password,
          password2
        });
      } else {
        const newAdmin = new Admin({
          name,
          Lastname,
          email,
          password,
          password2
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin
              .save()
              .then(admin => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/admin');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/loginA', (req, res) => {
  let errors = [];
  mongoose.connect(db, (err, db)=>{
    if(err) {
      console.log("Cannot connect to database");
    } else {
        console.log("Connected to database");
    }
    
    var collection = db.collection('admins');
    collection.find({}).toArray(function(err, item) {
      var list_of_client = [];
      for (x in item) {
        if (req.body.email === item[x].email) {
          list_of_client.push(item[x]);
          break;
        }
      }
      if (list_of_client.length == 1) {
        bcrypt.compare(req.body.password, list_of_client[0].password, (err, isMatch)=>{
          if (isMatch) {
          var rand = random(10, 1000);
          var hashed = md5encrypt(list_of_client[0].password+rand)
          Session[hashed] = [list_of_client[0], hashed];
          res.cookie('AdminSess', hashed,{ maxAge: 900000, httpOnly: true });
          res.redirect('/adminDash')
          console.log(Session.ActivSession)
          }else{
            errors.push({ msg: 'Email or password' });
            res.render('admin', {
              title: 'Admin',
              errors
            });
            
          }
          // res.cookie('AdminSess', '');
          
          
        })  
      }else{
        res.render('admin');
        
      }
    }); 
    
  })
 
    
});
// Logout
router.get('/logoutA', (req, res) => {
  req.logout();
  console.log(Session);
  try {
    delete Session[req.cookies.AdminSess];
    
  } catch (err) {
    console.log(err)
  }
  res.cookie('AdminSess', '');
  req.flash('success_msg', 'You are logged out');
  console.log(Session);

  res.redirect('/admin');
});

module.exports = router;
