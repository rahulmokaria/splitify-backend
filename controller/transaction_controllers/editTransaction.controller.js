const { userDetailsModel } = require("../../model/userDetails.model");
const { transactionModel } = require("../../model/transaction.model");

const {helperPost} = require("../../utils/helper");

const editTransactionController = async (req, res) => {
  try {
    // console.log("req for edit a transaction");
    // console.log(req.body);
    var { userId, id, addAmount, description, category, date } = req.body;
    const result = await transactionModel.findById(id);
    if (!result)
      return helperPost(res, "No transaction exist with this id", 400, false);
    var { amount, income, expense, _id } = await userDetailsModel.findOne({
      userId,
    });
    addAmount = parseFloat(addAmount);
    addAmount = addAmount < 0 ? addAmount * -1 : addAmount;
    if (result.transactionType == "Income") {
      amount = amount - result.amount + addAmount;
      income = income - result.amount + addAmount;
    } else {
      amount = amount + result.amount - addAmount;
      expense = expense - result.amount + addAmount;
    }
    const rest = await userDetailsModel.findByIdAndUpdate(
      { _id },
      { amount, expense, income }
    );
    await transactionModel.findByIdAndDelete(id);
    const edited = await transactionModel.create({
      userId,
      amount: addAmount,
      description,
      date,
      category,
      transactionType: result.transactionType,
    });
    // console.log("transaction edited successfully");
    return helperPost(res, "Successfully Edited.", 200, true);
  } catch (err) {
    console.log(err);
    return helperPost(res, err.message, 400, false);
  }
};
module.exports = editTransactionController;
