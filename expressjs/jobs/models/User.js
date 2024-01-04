const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name."],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email.",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password."],
    minLength: 6,
  },
});

// writing "function" explicitly instead of arrow func,
// keeps the this to be scoped to this given schema instance

// helper method to auto hash password at the document level
// instead of in the registration controller
schema.pre("save", async function () {
  // need to hash the user password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

schema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// helper method to compare typed password to hashed password in db
// for this user document
schema.methods.checkPassword = async function (input) {
  const isMatch = await bcrypt.compare(input, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", schema);
