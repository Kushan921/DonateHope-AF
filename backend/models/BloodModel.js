const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BloodSchema = new Schema({

    event_name : {
        type : String,
        required : true
    },
    closing_date : {
        type : String,
        required : true
    },
    closing_time : {
        type : Number,
        required : true
    },
    blood_type : {
        type : String,
        required : true
    },
    blood_count : {
        type : Number,
        required : true
    },
    doctor_incharge : {
        type : String,
        required : true
    }
})

const Blood = mongoose.model("blood",BloodSchema)
module.exports = Blood;