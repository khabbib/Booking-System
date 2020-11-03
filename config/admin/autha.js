module.exports = {
    adminensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view Admin');
      res.redirect('/admin');
    },
    adminforwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/adminDash');      
    }
  };
  