const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EmergencySchema = new Schema({

    
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    nic : {
        type : String,
        required : true
    },
   
    contactno : {
        type : Number,
        required : true
    },
    bloodtype : {
        type : String,
        required : true
    },   
   
    hospital : {
        type : String,
        required : true
    },
    bloodpint : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    }

})

const Emergency = mongoose.model("emergency",EmergencySchema)
module.exports = Emergency;