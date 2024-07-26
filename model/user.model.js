const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Contact number is required"],
    unique: true,
  },
});

userSchema.pre("save", async function () {
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
});

const userAuthModel = model("userAuth", userSchema);

module.exports = { userAuthModel };
