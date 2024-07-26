const { userAuthModel } = require("../../model/user.model");

const {helperPost} = require("../../utils/helper");
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    console.log("tried to login");
    const { email, password } = req.body;
    if (!validator.validate(email))
      return helperPost(res, "Email/Password is invalid", 404, false);

    const user = await userAuthModel.findOne({ email: email });
    if (!user) {
      return helperPost(res, "User not exist", 404, false);
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) return helperPost(res, "Email/Password is invalid", 404, false);

    const { _id } = user;
    const token = jwt.sign({ userid: _id, issuer: true }, process.env.JWT_KEY, {
      expiresIn: "15d",
    });
    // console.log("login token=" + token);

    return res.status(200).json({
      message: token,
      flag: true,
    });
    //
  } catch (err) {
    return helperPost(res, err.message, 500, false);
  }
};

module.exports = { loginController };
