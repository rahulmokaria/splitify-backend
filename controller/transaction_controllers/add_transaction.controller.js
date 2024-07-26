const { userDetailsModel } = require("../../model/userDetails.model");
const { transactionModel } = require("../../model/transaction.model");

const {helperPost} = require("../../utils/helper");

const addTransactionController = async (req, res) => {
  try {
    // console.log(req.body);
    var { transactionType, description, addAmount, category, date, userId } =
      req.body;
    addAmount = parseFloat(addAmount);

    const result = await transactionModel.create({
      transactionType,
      description,
      amount: addAmount,
      category,
      date,
      userId,
    });
    // console.log("result= " + result);
    if (result) {
      var { amount, expense, income } = await userDetailsModel.findOne({
        userId,
      });
      if (transactionType == "Expense") {
        amount = amount - addAmount;
        expense = expense + addAmount;
        await userDetailsModel.findOneAndUpdate(
          { userId },
          { amount, expense }
        );
      } else {
        amount = amount + addAmount;
        income = income + addAmount;
        await userDetailsModel.findOneAndUpdate({ userId }, { amount, income });
      }
      return helperPost(res, "Successfully added", 200, true);
    } else {
      return helperPost(res, " Failed to add. Try again", 400, false);
    }
  } catch (err) {
    console.log(err);
    return helperPost(res, err.message, 400, false);
  }
};

module.exports = addTransactionController;
