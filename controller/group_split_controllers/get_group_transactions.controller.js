const groupTransacationModel = require("../../model/groupTransaction.model");
const { helperGet, helperPost } = require("../../utils/helper");

const getGroupTransactionsController = async (req, res) => {
  try {
    const { groupId } = req.body;

    var trans = await groupTransacationModel
      .find({ groupId })
      .sort({ date: "desc" });

    // console.log(trans);
    let result = {};
    result.flag = true;
    result.message = "Success";
    result.transactions = trans;
    return helperGet(res, result, 200, true);
  } catch (err) {
    console.log(err);
    return helperPost(res, err.message, 404, false);
  }
};

module.exports = getGroupTransactionsController;
