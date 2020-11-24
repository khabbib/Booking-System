const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const md5encrypt = require('md5');
const db = require('../config/keys').mongoURI;
ObjectID = require('mongodb').ObjectID;
const Appointment = require('../models/appointment');
const Time = require('../models/time');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const nodemailer = require('nodemailer');
const Pass = require('../config/emailkey');
const Session = require('../models/session');


// Welcome Page
router.get('/', (req, res) => res.render('home',{
  title: 'Home'
}));

// Login Page
router.get('/admin', (req, res) => {
  if (req.cookies.AdminSess) {

    if(Session[req.cookies.AdminSess]){
      if (Session[req.cookies.AdminSess][1] == req.cookies.AdminSess) {
        
        res.redirect('/adminDash')
        console.log("adminDash loged in  ")
      }
      else{
        console.log("admin run ")
        res.render('admin');
            
      }

    }
    else{
      console.log("admin run ")
      res.render('admin');
          
    }
  }
  else{
    console.log("admin run ")
    res.render('admin');  
  }

});

// add days of weeks work time
router.post('/addTime', (req, res)=>{
  var postTime = {
    time:{

      monday: parseInt(req.body.monday),
      tuesday: parseInt( req.body.tuesday),
      wednesday: parseInt(req.body.wednesday),
      thursday: parseInt(req.body.thursday),
      friday: parseInt(req.body.friday),
      saturday: parseInt(req.body.saturday),
      sunday: parseInt(req.body.sunday),
    },
    workTime: {
      beginWork: req.body.beginWork,
      endWork: req.body.endWork,
    },
    postedBy:{
      UserName: Session[req.cookies.AdminSess][0].name,
      LastName: Session[req.cookies.AdminSess][0].Lastname,
    }
  }
  new Time(postTime)
  .save()
  .then(
    res.redirect('/adminDash')
  )
})

router.get('/adminReg', (req, res) => 
res.render('adminReg',{
  title: 'Admin Reg'
}));

router.get('/done', (req, res) => 
res.render('done',{
  title: 'Booked'
}));








router.get('/table', (req, res) => {
  
    
  
  mongoose.connect(db, (err, db)=>{
    if(err) {
      console.log("Cannot connect to database");
    } else {
        console.log("Connected to database");
    }
  var collection = db.collection('times');
    collection.find({}).toArray(function(err, item) {
      if(err) {
        console.log(err)
      }else{
        var outPut = '';


        var time = new Date();
      //var newTime = time.getFullYear() + "/" + time.getMonth() + "/" + time.getDay()
        var timeYMD = [time.getFullYear(), time.getMonth()+1, time.getDate()];

        var maxDays = [31,28,31,30,31,30,31,31,30,31,30,31];
        var eachWeek = 7;
        var maxMonth = 12;    
        var minDays = 0;    
        var minMonth = 0;   
        var changeWeeks = 0; 

        // year
        var workYear = 1;
        var meetingT = 30;

        // months
        var workMonth = 12;
        var totalWorkMonth = workYear*workMonth;

        // days
        var workDays = 5;
        var totalWorkDays = workDays*totalWorkMonth;

        // our

        var workTime2 = [7,6,2,4,7,0,3];
        var workTime2inmin = []; // [8*60, 4*60....]

          // change week to minuts
        for (let i = 0; i < workTime2.length; i++) {
          const element = workTime2[i];
          workTime2inmin.push(element*60);
        };


        // testing weeks work times per minuts
        for (let i = 0; i < workTime2inmin.length; i++) {
            const element = workTime2inmin[i];
            console.log(element);
            
        };
        
        for (let o = 0; o < workTime2.length; o++) {
          var html = '<div class="eachDay" >';
          var unikTime = new Date(timeYMD[0], timeYMD[1], timeYMD[2], 8, 0, 0);
          var uniktime2 = new Date(timeYMD[0], timeYMD[1], timeYMD[2], 8, 0, 0);
          for(let i = 0;i < (workTime2inmin[o]/meetingT); i++){
              uniktime2.setTime(uniktime2.getTime()+(30 * 60 * 1000));
              html += `<input class="parttimes" name="eachtime" value="${unikTime.getHours()}:${unikTime.getMinutes()} - ${uniktime2.getHours()}:${uniktime2.getMinutes()}"> <input type="text" id="" value="" style="display: none;"/>`
              unikTime.setTime(unikTime.getTime()+(30 * 60 * 1000));
              
          }
          html+= '</div>';
          outPut+= html;
        }
        console.log(item);
        var items = item[0]["postedBy"]["UserName"];
        

        // check the appointments from MongodDb Dataabse
        var appointmentCol = db.collection('appointments');
        var htmlInputs = req.body.eachtime;
        
        appointmentCol.find({}).toArray(function(err, appointmentFind){

          if(err){
            console.log(err);
          }else{
            console.log("appointments connected and finded")
            // console.log(appointmentFind)
            res.render('table', {
              title: 'Appointmen',
              user: req.user,
              class: 'active',
              divs: outPut,
              sclass: 'timeTaken'
            })
          }
        });
      }
    }); 


     
  });

})












router.post('/table',  function(req, res){
  const newAppointment = new Appointment();
  let user = req.user;
  let errors = [];
  Appointment.findOne({timeAP: req.body.time}, (err, finded)=>{
    console.log(finded)
    if(finded){
      req.flash(
        'error_msg',
        'The time is already booked! Please try some of our other times'
      );
      res.redirect('/table')
      return
    }
    else{
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
    }    

  })
})
   


// user delete control router

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
 
// delete appointments from Admin
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

// delete users from Admin
router.post('/deleteUser',  function(req, res){
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
              var collection = db.collection('users')
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
    `Successfully, the User deleted.`
  );
  res.setHeader("Content-Type", "text/html");
  res.redirect("/adminDash");
 }else{
  req.flash(
    'error_msg',
    `Unsuccessfully, the User not deleted.`
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
  var redirectPage = false;
  
  if (req.cookies.AdminSess) {
    if (req.cookies.AdminSess.length > 0) {
      console.log(Session)
        if (Session[req.cookies.AdminSess]) {
          try {
            if (Session[req.cookies.AdminSess][1] == req.cookies.AdminSess) {
              mongoose.connect(db, (err, db)=> {
                if(err){
                  console.log(err)
                }else{
                  
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
              redirectPage = true;
              console.log("1")
            }
          } catch (err) {
            redirectPage = true;
            console.log("catch")
          }
          
        }
        else{
          redirectPage = true;
          console.log("2")
        }
      
    }
    else{
      redirectPage = true;
      console.log("4")
    }
  }
  else{
    redirectPage = true;
    console.log("5")
    }

if(redirectPage){
  res.redirect('/');
}


    

})

module.exports = router;
