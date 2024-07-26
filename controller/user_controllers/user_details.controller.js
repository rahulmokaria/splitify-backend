const { userDetailsModel } = require("../../model/userDetails.model");

const helper = require("../../utils/helper");

const userDetailsController = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(userDetailsModel);
    const { userId } = req.body;
    // console.log(userId + " user details asked");
    const result = await userDetailsModel.findOne({ userId });

    if (!result) return helper(res, "User not exist", 404, false);
    else {
      return res.status(200).json({
        message: result,
        flag: true,
      });
    }
  } catch (err) {
    console.log(err);
    return helper(res, err.message, 404, false);
  }
};

module.exports = userDetailsController;
