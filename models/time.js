const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
    time: Object, dic: {
        monday: {
        type: Number,
        required: true
        },
        tuesday: {
        type: Number,
        required: true
        },
        wednesday: {
        type: Number,
        required: true
        },
        thursday: {
        type: Number,
        required: true
        },
        friday: {
        type: Number,
        required: true
        },
        saturday: {
        type: Number,
        required: true
        },
        sunday: {
        type: Number,
        required: true
        }
    },
    workTime: Object, dic:{
        beginWork: {
          type: String,
          required: true
        },
        endWork: {
          type: String,
          required: true
        }
    },
    postedBy: Object, dic:{
        UserName:{
            type: String,
            required: false
        },
        LastName:{
            type: String,
            required: false
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Time = mongoose.model('time', timeSchema);

module.exports = Time;
