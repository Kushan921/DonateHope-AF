const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const NormalSchema = new Schema({

   
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
        type : String,
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
    }
   
    
})

const Normal = mongoose.model("normal",NormalSchema)
module.exports = Normal;