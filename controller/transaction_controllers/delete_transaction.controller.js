const { userDetailsModel } = require("../../model/userDetails.model");
const { transactionModel } = require("../../model/transaction.model");

const {helperPost} = require("../../utils/helper");

const deleteTransactionController = async (req, res) => {
  try {
    const { id, userId } = req.body;
    console.log("delete karneka request aaya rhega");
    var result = await transactionModel.findById(id);
    if (!result)
      return helperPost(res, "No transaction exist with this id", 400, false);
    var { amount, income, expense, _id } = await userDetailsModel.findOne({
      userId,
    });
    var addAmount = result.amount;
    addAmount = parseFloat(addAmount);
    // console.log(addAmount);
    addAmount = addAmount < 0 ? addAmount * -1 : addAmount;
    if (result.transactionType == "Income") {
      amount = amount - addAmount;
      income = income - addAmount;
    } else {
      amount = amount + addAmount;
      expense = expense - addAmount;
    }
    // console.log(amount, expense, income);
    const rest = await userDetailsModel.findByIdAndUpdate(
      { _id },
      { amount, expense, income }
    );
    var k = await transactionModel.findByIdAndDelete(id);
    // console.log("Transaction deleted " + k);
    return helperPost(res, "Transaction deleted", 200, true);
  } catch (err) {
    console.log(err);
    return helperPost(res, err.message, 400, false);
  }
};

module.exports = deleteTransactionController;
