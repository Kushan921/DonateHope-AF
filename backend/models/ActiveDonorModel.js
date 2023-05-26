const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActiveDonorSchema = new Schema({
  weight: {
    type: Number,
    required: true,
  },

  Pulse: {
    type: Number,
    required: true,
  },
  Hb: {
    type: Number,
    required: true,
  },
  Bp: {
    type: Number,
    required: true,
  },
  Temperature: {
    type: Number,
    required: true,
  },
  hasDonated: {
    type: Boolean,
    required: true,
  },
  donatedDate: {
    type: Date,
    required: true,
  },
  hasTattoo: {
    type: Boolean,
    required: true,
  },
  hasEarPiercing: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  medicalDocument: {
    type: String,
  },
  path:{
    type:String,
  }
});

const ActiveDonor = mongoose.model("ActiveDonor", ActiveDonorSchema);
module.exports = ActiveDonor;
