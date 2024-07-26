const { transactionModel } = require("../../model/transaction.model");

const {helperPost} = require("../../utils/helper");

const getCategoricalSpentController = async (req, res) => {
  try {
    var { userId } = req.body;
    // console.log("cat data asked");
    const result = await transactionModel.find({ userId });
    // console.log("cat data aagaya");
    if (!result) return helperPost(res, err.message, 400, false);
    var mapUsed = new Map([
      ["Food", 0],
      ["Shopping", 0],
      ["Medicines", 0],
      ["Transport", 0],
      ["Utilities", 0],
      ["Education", 0],
      ["Entertainment", 0],
      ["Clothing", 0],
      ["Rent", 0],
      ["Others", 0],
    ]);

    var arrayLength = result.length;
    for (let i = 0; i < arrayLength; i++) {
      const temporary = result[i];
      if (
        mapUsed.has(temporary.category) &&
        result[i].transactionType == "Expense"
      ) {
        var amount = mapUsed.get(temporary.category);
        mapUsed.set(temporary.category, amount + result[i].amount);
      }
    }

    let resObject = [];
    mapUsed.forEach(function (value, key) {
      let temp = { key, value };
      resObject.push(temp);
    });
    // console.log("hogaya");
    // console.log(resObject);
    res.json({ message: resObject });
  } catch (err) {
    console.log(err);
    return helperPost(res, err.message, 400, false);
  }
};

module.exports = getCategoricalSpentController;
