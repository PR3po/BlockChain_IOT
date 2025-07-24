const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userDataSchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  bloodPressure: {
    type: Number,
    required: true,
  },
  pulse: {
    type: Number,
    required: true,
  },
});

const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;
