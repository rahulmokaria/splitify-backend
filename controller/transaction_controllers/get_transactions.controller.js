const { userDetailsModel } = require("../../model/userDetails.model");
const { transactionModel } = require("../../model/transaction.model");

const {helperPost} = require("../../utils/helper");

const getTransactionsController = async (req, res) => {
  try {
    console.log("req to access transactions");
    const { userId } = req.body;
    var result = await transactionModel.find({ userId }).sort({ date: "desc" });
    if (!result) return helperPost(res, "No transactions till now", 200, true);
    return helperPost(res, result, 200, true);
  } catch (err) {
    console.log(err);
    return helperPost(res, err.message, 400, false);
  }
};

module.exports = getTransactionsController;
