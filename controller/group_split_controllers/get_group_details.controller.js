const { groupDebtBalanceModel } = require("../../model/groupDebts.model");
const { userDetailsModel } = require("../../model/userDetails.model");

const { helperGet, helperPost } = require("../../utils/helper");

const getGroupDetailsController = async (req, res) => {
  try {
    const { userId, groupId } = req.body;
    const groupFromDb = await groupDebtBalanceModel.findOne({ _id: groupId });

    if (!groupFromDb)
      return helperPost(res, "Group does not exist", 400, false);
    var groupResult = {};
    groupResult.groupId = groupId;
    groupResult.groupName = groupFromDb.groupName;
    let balances = [];
    if (groupFromDb.balanceSheet.has(userId)) {
      let debts = groupFromDb.balanceSheet.get(userId);
      debts.forEach(async (amount, friendId) => {
        console.log(`Friend ID: ${friendId}, Amount: ${amount}`);
        const { name } = await userDetailsModel.findOne({ userId: friendId });
        balances.push({
          friendId: friendId,
          amount: amount,
          friendName: name,
        });
      });
      balances.push({
        friendId: groupbalanceSheet.get(userId).get(),
      });
    }

    // groupResult.borrowings = balances;
    groupResult.members = groupFromDb.users.map((user) => {
      return {
        userId: user.userId,
        userName: user.userName,
      };
    });

    groupResult.borrowings = balances;
    const { name } = await userDetailsModel.findOne({ userId });
    var result = {};
    result.flag = true;
    result.userName = name;
    result.message = "Success";
    result.groupDetails = groupResult;
    console.log(groupFromDb);

    return helperGet(res, result, 200, true);
  } catch (err) {
    console.log(err);
    return helperPost(res, err.message, 404, false);
  }
};

module.exports = getGroupDetailsController;
