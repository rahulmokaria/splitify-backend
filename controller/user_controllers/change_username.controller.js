const { userDetailsModel } = require("../../model/userDetails.model");

const { helperPost } = require("../../utils/helper");

const changeUserNameController = async (req, res) => {
  try {
    // console.log("req to change username");
    const { userId, newUserName } = req.body;
    // console.log(newUserName);
    await userDetailsModel.findOneAndUpdate(
      { userId: userId },
      { name: newUserName }
    );
    console.log("username updated successfully");
    return helperPost(res, "Successfully updated", 200, true);
  } catch (err) {
    return helperPost(res, err.message, 400, false);
  }
};

module.exports = changeUserNameController;
