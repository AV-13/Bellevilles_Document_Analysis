const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true },
  email: {type: String, required: true, unique: true },
  password: {type: String, required: true },
  avatar: {
    data: Buffer,
    contentType: String
  }
}, {timestamps: true});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;
