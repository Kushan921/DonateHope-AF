const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({

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
    type : {
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
    }
})

const User = mongoose.model("user",UserSchema)
module.exports = User;