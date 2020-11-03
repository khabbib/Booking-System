const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const Admin = require('../../models/admin');

module.exports = function(passport) {
  console.log("passortAdmin")
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      Admin.findOne({
        email: email
      }).then(admin => {
        console.log(admin);
        if (!admin) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, admin.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, admin);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(admin, done) {
    done(null, admin.id);
  });

  passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, admin) {
      done(err, admin);
    });
  });
};
