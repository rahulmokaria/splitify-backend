const { userAuthModel } = require("../../model/user.model");
const { userDetailsModel } = require("../../model/userDetails.model");

const {helperPost} = require("../../utils/helper");
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    console.log("new registeration request");
    // console.log(req.body);
    const { email, name, password, contactNo } = req.body;

    //validate the email
    if (!validator.validate(email))
      return helperPost(res, "Email is invalid", 404, false);

    //check if already exist
    const check = await userAuthModel.findOne({ email: email });
    if (check) {
      return helperPost(res, "User already exist", 409, false);
    }

    //create user
    const { _id } = await userAuthModel.create({
      email,
      name,
      password,
      contactNo,
    });
    await userDetailsModel.create({ userId: _id, name: name });
    return helperPost(res, "Successfully created", 200, true);

    //
  } catch (err) {
    console.log("error to create new user" + err);
    return helperPost(res, err.message, 500, false);
  }
};

module.exports = { registerController };
