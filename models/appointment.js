const mongoose = require('mongoose');

const bookedSchema = new mongoose.Schema({
  uniqueID: {
    type: String
  },
  timeAP: {
    type: String,
    required: true
  },
  nameAP: {
    type: String,
    required: false
  },
  emailAP: {
    type: String,
    required: true
  },
  useremailAP: {
    type: String
  },
  numberAP: {
    type: String,
    required: true
  },
  lastnameAP: {
    type: String,
    required: true
  },
  addressAP: {
    type: String,
    required: true
  },
  postAdressAP: {
    type: String,
    required: true
  },
  
  
  date: {
    type: Date,
    default: Date.now
  }
});

const Appointment = mongoose.model('appointment', bookedSchema);

module.exports = Appointment;
