const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DonorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  NIC: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  isActiveDonor: {
    type: Boolean,
  },
  contact: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
});

const Donor = mongoose.model("donor", DonorSchema);
module.exports = Donor;
