module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("authenticated")
      return next();
    }
       console.log("Not authenticated")
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
      console.log("ensureAuthenticated function")

  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  }
};
