const { userAuthModel } = require("../../model/user.model");
const { userDetailsModel } = require("../../model/userDetails.model");

const { helperPost } = require("../../utils/helper");

const getCompleteUserDetailsController = async (req, res) => {
  try {
    const { userId } = req.body;
    const resultd = await userDetailsModel.findOne({ userId });
    if (!resultd) return helperPost(res, "USer does not exist", 404, false);
    const resulta = await userAuthModel.findById(userId);
    if (!resulta) return helperPost(res, "USer does not exist", 404, false);

    const response = { name: resultd.name, email: resulta.email };
    // console.log(response);
    // console.log("sending user complete details");
    return helperPost(res, response, 200, true);
  } catch (err) {
    console.log(err);
    return helperPost(res, err.message, 400, false);
  }
};

module.exports = getCompleteUserDetailsController;
