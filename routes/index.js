const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const md5encrypt = require('md5');
const db = require('../config/keys').mongoURI;
ObjectID = require('mongodb').ObjectID;
const Appointment = require('../models/appointment');
const Admin = require('../models/admin');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const nodemailer = require('nodemailer');
const Pass = require('../config/emailkey');
const Session = require('../models/session');
const { find } = require('../models/appointment');


// Welcome Page
router.get('/', (req, res) => res.render('home',{
  title: 'Home'
}));



// Login Page
router.get('/admin', (req, res) => {
  var active = Session.ActivSession;
  if(req.cookies.AdminSess){
    res.redirect('/adminDash')
    console.log("admin dash run ")
  }
  else{
    console.log("admin run ")
    res.render('admin');
  }
});

router.get('/done', (req, res) => 
res.render('done',{
  title: 'Booked'
}));

router.get('/table', (req, res) =>  
res.render('table', {
    title: 'Appointmen',
    user: req.user,
    class: 'active'
  }))

router.post('/table',  function(req, res){
  const newAppointment = new Appointment();
  let user = req.user;
  let item = req.item;
 if(user){
   console.log("user");
   newAppointment.timeAP = req.body.time;
   newAppointment.nameAP = req.body.name;
   newAppointment.lastnameAP = req.body.Lastname; 
   newAppointment.uniqueID = md5encrypt(req.user.id);
   newAppointment.useremailAP = req.user.email;
   newAppointment.emailAP = req.body.email;
   newAppointment.numberAP = req.body.number;
   newAppointment.addressAP = req.body.address;
   newAppointment.postAdressAP = req.body.postAdress;
  }
  
  newAppointment.timeAP = req.body.time;
    newAppointment.nameAP = req.body.name;
    newAppointment.lastnameAP = req.body.Lastname; 
    // newAppointment.uniqueID = md5encrypt(req.user.id);
    // newAppointment.useremailAP = req.user.email;
    newAppointment.emailAP = req.body.email;
    newAppointment.numberAP = req.body.number;
    newAppointment.addressAP = req.body.address;
    newAppointment.postAdressAP = req.body.postAdress;
  
  newAppointment.save(function(err, sent){
    if(err){
      req.flash(
        'error_msg',
        "You'r appointment hasn't booked successfully! Please fill all the sheets"
      );
      res.redirect('table');
    }else {
      const output = `
        <p>Hej</p>
        <p>You have booked an appointment!</p>
        <h3>The appointments details</h3>
        <h3>Du har tid hos oss den ...  kl: <span style="color: red;"> ${req.body.time}</span></h3>
        <h3>Mer information angående bookning</h3>
          <ul>  
            <li>Name: ${req.body.name}</li>
            <li>Last Name: ${req.body.Lastname}</li>
            <li>Appointment: ${req.body.time}</li>
          </ul>
        <h3 style="color: red;">Note!</h3>
        <p>Please make sure to be on time</p>
      `;
      console.log(newAppointment)
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Pass.epost, // generated ethereal user
        pass: Pass.password  // generated ethereal password
    }
    
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"DevPakdel" <habib.pakdel1121@gmail.com>', // sender address
      to: `${req.body.email}`, // list of receivers
      subject: 'New Appointment', // Subject line
      text: "Bookning", // plain text body
      html: output
    };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log("successfully insert the information")
      if(user){
        res.redirect('/dashboard')
      }
      res.redirect('/done')
      
  });
  req.flash(
    'success_msg',
    `You'r appointment successfully booked!`
  );

    }
  })
})




// delete router

router.post('/delete',  function(req, res){
  console.log(req.body)
  var GoneThrough = true;
  try {
     // define the id 
      var todelete = [];
      for (var el in req.body) {
        if (el.includes("unique")) {
          if (req.body[el][1] == "true") {
            todelete.push(req.body[el][0])
          }
        }
      }
      mongoose.connect(db, (err, db)=>{

        if(err) {
          console.log("Cannot connect to database");
        } else {
            for (let x = 0; x <= todelete.length; x++) {
              // console.log(todelete[x])
              var obj = ObjectID(todelete[x])
              var collection = db.collection('appointments')
              collection.deleteOne({_id: obj});
            }
            
          }
          
        })
        GoneThrough = true;
  } catch (err) {
    GoneThrough = false;
  }
  
 if (GoneThrough) {
  req.flash(
    'success_msg',
    `Successfully, the appointment deleted.`
  );
  res.setHeader("Content-Type", "text/html");
  res.redirect("/dashboard");
 }else{
  req.flash(
    'error_msg',
    `Unsuccessfully, the appointment not deleted.`
  );
  res.setHeader("Content-Type", "text/html");
  res.redirect("/dashboard");
 }    
    
})
 

router.post('/deleteA',  function(req, res){
  console.log(req.body)
  var GoneThrough = true;
  try {
     // define the id 
      var todelete = [];
      for (var el in req.body) {
        if (el.includes("unique")) {
          if (req.body[el][1] == "true") {
            todelete.push(req.body[el][0])
          }
        }
      }
      mongoose.connect(db, (err, db)=>{

        if(err) {
          console.log("Cannot connect to database");
        } else {
            for (let x = 0; x <= todelete.length; x++) {
              // console.log(todelete[x])
              var obj = ObjectID(todelete[x])
              var collection = db.collection('appointments')
              collection.deleteOne({_id: obj});
            }
            
          }
          
        })
        GoneThrough = true;
  } catch (err) {
    GoneThrough = false;
  }
  
 if (GoneThrough) {
  req.flash(
    'success_msg',
    `Successfully, the appointment deleted.`
  );
  res.setHeader("Content-Type", "text/html");
  res.redirect("/adminDash");
 }else{
  req.flash(
    'error_msg',
    `Unsuccessfully, the appointment not deleted.`
  );
  res.setHeader("Content-Type", "text/html");
  res.redirect("/adminDash");
 }    
    
})
  

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{
  mongoose.connect(db, (err, db)=>{
    if(err) {
      console.log("Cannot connect to database");
    } else {
        console.log("Connected to database");
    }
    var collection = db.collection('appointments');
    collection.find({useremailAP: req.user.email}).toArray(function(err, item) {
      if(err) {
        console.log("There was a problem finding the ticket.");
        res.redirect('/users/login');
      } 
        res.render('dashboard', {
          title: 'Dashboard',
          item: item,
          user: req.user,
          class: 'active'
        });
     }); 
  })
});

// admin dashboard

router.get('/adminDash', (req, res)=>{
  if ((req.cookies.AdminSess) || (Session[1] === req.cookies.AdminSess)) {
    mongoose.connect(db, (err, db)=> {
      if(err){
        console.log(err)
      }else{
        console.log("Admin dash database connected")
      }
      var adminCollection = db.collection('admins');
     
      adminCollection.findOne({password: req.cookies.AdminSess},(err, find)=>{
        if(err){
          console.log(err);
          res.redirect('/')
        }
        else{
          var uses = db.collection('users');
          uses.find({}).toArray(function(err, usr){
              var appointment = db.collection('appointments');
              appointment.find({}).toArray((err, appns)=>{
                res.render('adminDash',{
                  title: 'Admin dashboard',
                  user: usr,
                  item: appns,
                  admin: adminCollection
                })
              })
              
          });
        } 
        
      })
    })
  }else{
    res.redirect('/')
  }


})

module.exports = router;
