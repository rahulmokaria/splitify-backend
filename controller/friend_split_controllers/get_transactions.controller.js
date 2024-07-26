const {helperPost} = require("../../utils/helper");
const friendTransacationModel = require("../../model/friendTransaction.model");

const getFriendSplitTransactionsController = async (req, res) => {
  try {
    const { friendDebtId } = req.body;
    var result = await friendTransacationModel
      .find({ friendDebtId })
      .sort({ date: "desc" });
    if (!result) return helperPost(res, "No transactions till now, 200", true);
    // console.log(result);
    return helperPost(res, result, 200, true);
  } catch (err) {
    console.log(err);
    return helperPost(res, "Failed to fetch transactions", 400, false);
  }
};

module.exports = getFriendSplitTransactionsController;
