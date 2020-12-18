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
const Session = require('../models/session').Session;


var outPut = '';

function getInfos(today, todaysDay, firstDayinWeek, newdate, infos, AppFined){
  
  if (infos.length > 0) {
    // next prev week condition
    
    var days = [];
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var daysName = ["Mön", "Tis", "Ons", "Tur", "Fre", "Lör", "Son"];

    var maxDays = [31,28,31,30,31,30,31,31,30,31,30,31];

    var time = new Date();
    var timeYMD = [time.getFullYear(), time.getMonth()+1, time.getDate()];
    var meetingT = 30;
    var workTime2 = [7,6,2,4,7,0,3];
    var workTime2inmin = [];
    // console.log(infos);
    meetingT = infos[0]["meeTing"]["meeting"];
    workTime2 = [
      infos[0]["time"]["monday"], 
      infos[0]["time"]["tuesday"],
      infos[0]["time"]["wednesday"],
      infos[0]["time"]["thursday"],
      infos[0]["time"]["friday"],
      infos[0]["time"]["saturday"],
      infos[0]["time"]["sunday"]
  ];
// change week to minuts
  for (let i = 0; i < workTime2.length; i++) {
    const element = workTime2[i];
    workTime2inmin.push(element*60);
  };


// divider times
  for (let o = 0; o < workTime2.length; o++) {
    if (firstDayinWeek > maxDays[newdate.getMonth()])  {
      newdate.setDate(firstDayinWeek - maxDays[newdate.getMonth()] );  
      firstDayinWeek = 1;
      newdate.setMonth(newdate.getMonth()+1);
      
    }
    if(firstDayinWeek <= 0){
      
      // newdate.setMonth(newdate.getMonth()+1);
      firstDayinWeek = newdate.getDate();
    }
      newdate.setDate(firstDayinWeek++)
      var html = '<div class="eachDay" >';
      html += `<div class="tabled">${daysName[o]} / ${newdate.getDate()} / ${monthNames[newdate.getMonth()]} <input type="hidden" value="${newdate}" /></div>`;

      // TableTime.push(Date.now().toLocaleString('en-GB'));
      
      var unikTime = new Date(timeYMD[0], timeYMD[1], timeYMD[2], 8, 0, 0);
      var uniktime2 = new Date(timeYMD[0], timeYMD[1], timeYMD[2], 8, 0, 0);
      for(let i = 0;i < (workTime2inmin[o]/meetingT); i++){
          
          uniktime2.setTime(uniktime2.getTime()+(meetingT * 60 * 1000));
          var nowDate = new Date();
          var compareDate = newdate.getFullYear() + "/" + newdate.getMonth() + "/" + newdate.getDate()
                            + " " + unikTime.getHours() + ":"+ unikTime.getMinutes()+ " - " + uniktime2.getHours() + ":"+ uniktime2.getMinutes();
          
          var addedInput = false;

          for (let b = 0; b < AppFined.length; b++) {
            var exportedTime = AppFined[b]["dateAP"] + " " + AppFined[b]["timeAP"];
            if(compareDate == exportedTime){
              html += `<input style="background: gray; opacity: 0.3;" class="expertTime" data-date="${newdate}" name="eachtime" value="${unikTime.getHours()}:${unikTime.getMinutes()} - ${uniktime2.getHours()}:${uniktime2.getMinutes()}" disabled> `;
              addedInput = true;
            }  
            
          }
          if (!addedInput) {
            var endDate = new Date(infos[0]["workTime"]["endWork"]);
              console.log(endDate.getTime());
              if (newdate.getTime() <= endDate.getTime()) {

                if(nowDate > newdate){
                  html += `<input style="background: gray; opacity: 0.3;" class="expertTime" data-date="${newdate}" name="eachtime" value="${unikTime.getHours()}:${unikTime.getMinutes()} - ${uniktime2.getHours()}:${uniktime2.getMinutes()}" disabled> `;
                }else{
                  html += `<input class="parttimes" data-date="${newdate}" name="eachtime" value="${unikTime.getHours()}:${unikTime.getMinutes()} - ${uniktime2.getHours()}:${uniktime2.getMinutes()}"> `;
                  
                }
                
              }else{
                html += `<input style="background: gray; opacity: 0.3;" class="expertTime" data-date="${newdate}" name="eachtime" value="${unikTime.getHours()}:${unikTime.getMinutes()} - ${uniktime2.getHours()}:${uniktime2.getMinutes()}" disabled> `;
                
              }
            
          }
          unikTime.setTime(unikTime.getTime()+(meetingT * 60 * 1000));
      }
    
      html+= '</div>';
      outPut+= html;
    }
  }
  return [ today, todaysDay, firstDayinWeek, newdate];
}


// second function 

function get_cookies_packag(cookie, pack_true_unpack_false){
  /* cookies can be string or array, pack to pack dates to one string 
      and unpack to unpacke dates to dic with list value {1: ["2020....", "23", "23", "2"]}
  */
 try {
      if(!pack_true_unpack_false){ //unpack the string to dic with value of array
          var list_of_records = cookie.split("'") 
          var list_of_records_by_dic = {};
          for (let i = 0; i < list_of_records.length; i++) {
              const item = list_of_records[i];
              list_of_records_by_dic[i+1] = item.split("|");
          }
          return list_of_records_by_dic;
      }else{ // pack the list of dates to string
          var list_to_string = [];
          for (let i = 0; i < cookie.length; i++) {
              const item = cookie[i];
              
              list_to_string.push(item.join("|"));
          }
          return list_to_string.join("'");
      } 
 } catch (error) {
     console.log(error);
     return null;
 }

}




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
    },
    meeTing: {
      meeting: parseInt(req.body.meetingTime)
    }
  }
 
  Time.find({},(function(err, items) {
    if (items.length > 0) {
      Time.find({}, function(err, findd){
          console.log(findd);
          Time.updateOne(findd[0], postTime, function(err, finddd){
            if(err){
              console.log(err)
            }else{
              console.log("updated");
              res.redirect('/adminDash')
            }
          });
      
        });
    }else{
      console.log("added");
      new Time(postTime)
      .save()
      .then(
        res.redirect('/adminDash')
      )
    }
    
  }));
  
  

})

router.get('/adminReg', (req, res) => 
res.render('adminReg',{
  title: 'Admin Reg'
}));

router.get('/done', (req, res) => 
res.render('done',{
  title: 'Booked'
}));


router.get('/changeD', (req, res)=>{
  
  Time.find({},function(err, infos){
    if (err) {
      console.log(err)
    }else{
      Appointment.find({}, function(err, AppFined){
        if(err){
          console.log("Appointments not found!");
        }else{
          
        
          if (req.cookies.timeStamp == "true") {
            var today = new Date(req.cookies.today);
            var todaysDay = req.cookies.todaysDay;
            var firstDayinWeek =  req.cookies.firstDayinWeek;
            var newdate = new Date(req.cookies.newdate);
            var redirekt_to = true;
            var ended_of_work = false;
            

            if (req.query.change === "prevweek") {
              // record the next weeek into the cookies. that later can go back each week backward.
              var cookies_Record = 0;
              var cookies_String = get_cookies_packag(req.cookies.StringCookie, false);
              try {
                cookies_Record = parseInt(req.cookies.RecordedNextWeek);
              } catch (error) {
                cookies_Record = 0;
              }

              
              cookies_Record-=1;
              if (cookies_Record >= 1) {
                
                    var prev_week = cookies_String[cookies_Record.toString()];
                    try {
                      today = new Date(prev_week[0]);
                      todaysDay = parseInt(prev_week[1]);
                      firstDayinWeek = parseInt(prev_week[2]);
                      newdate = new Date(prev_week[3]);
                      
                    } catch (error) {
                      res.cookie('timeStamp',"false");
                      res.redirect('/changeD');
                    }                    

                    delete cookies_String[cookies_Record.toString()];
                    res.cookie('RecordedNextWeek', cookies_Record.toString())
                }else{
                  redirekt_to = false;
                }
           
            }

            else if (req.query.change === "thisweek") {
              today = new Date();
              todaysDay = today.getDate();
              firstDayinWeek =  todaysDay - today.getDay()+1;
              newdate = new Date(today.getFullYear(), today.getMonth(), firstDayinWeek);

              res.cookie('RecordedNextWeek', "0");
              res.cookie('StringCookie', '');
            
            }
            
            if (req.query.change === "nextweek") {
              var endDate = new Date(infos[0]["workTime"]["endWork"]);
              console.log(endDate.getTime());
              if (newdate.getTime() <= endDate.getTime()) {
                
                var getRecordCookie = 0; // next week counter
                
                try {
                  getRecordCookie = parseInt(req.cookies.RecordedNextWeek);
                } catch (error) {
                  getRecordCookie = 0;
                }
                
                getRecordCookie +=1;
                res.cookie('RecordedNextWeek', getRecordCookie);

                if (req.cookies.StringCookie) {
                  var thisweekCookie = get_cookies_packag([[today.toString(), todaysDay.toString(),
                    firstDayinWeek.toString(), newdate.toString()]], true);

                  res.cookie("StringCookie", req.cookies.StringCookie + "'" + thisweekCookie);
                  
                }else{
                  var thisweekCookie = get_cookies_packag([[today.toString(), todaysDay.toString(),
                    firstDayinWeek.toString(), newdate.toString()]], true);


                  res.cookie('StringCookie', thisweekCookie);

                }
              }else{
                ended_of_work = true;

              }

            }
            var listOutPuts = [];
            if (!ended_of_work) {
              outPut = '';
              listOutPuts = getInfos(today, todaysDay, firstDayinWeek, newdate, infos, AppFined);
              
            }
            
            today = listOutPuts[0];
            todaysDay = listOutPuts[1];
            firstDayinWeek = listOutPuts[2];
            newdate = listOutPuts[3];
            if (redirekt_to) {
              res.cookie('timeStamp',"true");
              
            }else{
              res.cookie('timeStamp',"false");
              
            }
            
            res.cookie('today', today);
            res.cookie('todaysDay', todaysDay);
            res.cookie('firstDayinWeek', firstDayinWeek);
            res.cookie('newdate', newdate);
            res.redirect('/table');
            
            
            
            
          }else{
            outPut = '';

            var today = new Date();
            var todaysDay = today.getDate();
            var firstDayinWeek =  todaysDay - today.getDay()+1;
            var newdate = new Date(today.getFullYear(), today.getMonth(), firstDayinWeek);
            var listOutPuts = getInfos(today, todaysDay, firstDayinWeek, newdate, infos, AppFined);
            
            today = listOutPuts[0];
            todaysDay = listOutPuts[1];
            firstDayinWeek = listOutPuts[2];
            newdate = listOutPuts[3];
            res.cookie('timeStamp',"true");
            
            res.cookie('today', today);
            res.cookie('todaysDay', todaysDay);
            res.cookie('firstDayinWeek', firstDayinWeek);
            res.cookie('newdate', newdate);
            console.log("second if");

            res.cookie('RecordedNextWeek', "0");
            res.cookie('StringCookie', '');


            res.redirect('/table');

            
          }
        }
      });
    }
  })
  
});


        // change date rout
router.get('/table', (req, res) => {
  if(req.cookies.timeStamp == "true"){
    var xx = outPut;
    // outPut = '';

    if (xx.length > 0) {
      res.render('table', {
        title: 'Appointmen',
        user: req.user,
        class: 'active',
        divs: xx,
        sclass: 'timeTaken'
      })  
    }else{
      res.cookie('timeStamp', 'false');
      res.redirect('/changeD');
      
    }
    
  }else{
    res.redirect('/changeD');
  }

});


router.post('/table',  function(req, res){
  const newAppointment = new Appointment();
  let user = req.user;
  let errors = [];
  var choosenDate = new Date(req.body.datadate);
  var formatDate = choosenDate.getFullYear()+"/"+choosenDate.getMonth()+"/"+choosenDate.getDate();
  if(user){
    console.log("user");
    newAppointment.timeAP = req.body.time;
    newAppointment.dateAP = formatDate;
    
    newAppointment.nameAP = req.body.name;
    newAppointment.lastnameAP = req.body.Lastname; 
    newAppointment.uniqueID = md5encrypt(req.user.id);
    newAppointment.useremailAP = req.user.email;
    newAppointment.emailAP = req.body.email;
    newAppointment.numberAP = req.body.number;
    newAppointment.addressAP = req.body.address;
    newAppointment.postAdressAP = req.body.postAdress;
  }
    newAppointment.dateAP = formatDate;
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
            const outputmail = `
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
            html: outputmail
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
   


// user delete control router

router.post('/deleteUserAP',  function(req, res){
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
