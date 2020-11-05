const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  Lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  
  
  password: {
    type: String,
    required: true
  },
  password2: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Admin = mongoose.model('admins', UserSchema);

module.exports = Admin;


