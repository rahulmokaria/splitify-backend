const { userAuthModel } = require("../../model/user.model");

const { helperPost } = require("../../utils/helper");
const bcrypt = require("bcrypt");

const changePasswordController = async (req, res) => {
  try {
    const { userId, currPassword, newPassword } = req.body;
    const user = await userAuthModel.findById(userId);
    const result = await bcrypt.compare(currPassword, user.password);
    if (!result) return helperPost(res, "Wrong current password", 404, false);
    var salt = await bcrypt.genSalt(10);
    var hash = await bcrypt.hash(newPassword, salt);
    await userAuthModel.findOneAndUpdate({ _id: userId }, { password: hash });
    console.log("Password changed successfully");
    return helperPost(res, "Password changed successfully", 200, true);
  } catch (err) {
    console.log(err);
    return helperPost(res, err.message, 400, false);
  }
};

module.exports = { changePasswordController };
