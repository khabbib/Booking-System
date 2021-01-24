
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect( db, { useNewUrlParser: true ,useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// EJS
app.use(expressLayouts); 
app.set('view engine', 'ejs');
app.use(express.static('views'))
app.use(cookieParser());
// Express body parser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/admin', require('./routes/admin.js'));

const PORT = process.env.PORT || 8080;

// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static('views'));
//   app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'views', 'ejs'));
//   })
// }
app.listen(PORT, console.log(`Server started on port ${PORT}`));
// app.listen(300,"192.168.1.95", console.log(`Server started on port ${PORT}`));

// live reload the server (auto refresh the browser)
// var livereload = require('livereload').createServer({
//   exts: ['js', 'html','css','ejs']
// });

// livereload.watch(path.join(__dirname, 'views'));


