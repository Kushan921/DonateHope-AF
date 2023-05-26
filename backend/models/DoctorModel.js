const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({

    id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const Doctor = mongoose.model("doctor",DoctorSchema)
module.exports = Doctor;