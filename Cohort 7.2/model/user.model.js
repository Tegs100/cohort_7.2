const mongoose = require("mongoose");

//new is introduced because mongoose.Schema is a class in Javascript
const user = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
}, { timestamps: true }
);

const userModel = mongoose.model("User", user)

module.exports = userModel;