const { helperPost } = require("../utils/helper");

const { userAuthModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");

const verifier = async (req, res, next) => {
  try {
    const { token } = req.body;
    // console.log("token= " + token);
    if (!token) return helperPost(res, "Invalid request", 404, false);

    const result = await jwt.verify(token, process.env.JWT_KEY);
    // console.log(result);
    // console.log(result["userid"]);
    if (result) {
      const check = await userAuthModel.findOne({ _id: result["userid"] });
      // console.log(result["userid"]);
      // console.log(check);
      if (!check) {
        return helperPost(res, "User not exist", 404, false);
      }
      req.body.userId = result["userid"];
      // console.log(req.body);
      // console.log("user verified");
      next();
    } else {
      return helperPost(res, "Invalid token", 404, false);
    }
  } catch (error) {
    return helperPost(res, error.message, 500, false);
  }
};

module.exports = { verifier };
