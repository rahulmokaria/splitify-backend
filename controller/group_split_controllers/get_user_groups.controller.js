const { groupDebtBalanceModel } = require("../../model/groupDebts.model");
const { userDetailsModel } = require("../../model/userDetails.model");

const { helperPost, helperGet } = require("../../utils/helper");

const getUserGroupsController = async (req, res) => {
  try {
    let { userId } = req.body;

    var userDetails = await userDetailsModel.findOne({ userId });
    if (!userDetails) return helperPost(res, "User does not exist", 400, false);

    const { groupDebtIdList } = userDetails;

    var groupDebtListDetails = await groupDebtBalanceModel.find({
      _id: { $in: groupDebtIdList },
    });
    console.log(groupDebtListDetails);
    // res.groupDebtListDetails = groupDebtListDetails;

    var result = {};
    var retGroupResults = [];

    for (group of groupDebtListDetails) {
      let borrowings = [];
      // console.log(typeof group.balanceSheet);
      // console.log("balamces:" + group.balanceSheet.size);
      // for (entry of group.balanceSheet) {
      //   console.log("balances: " + entry);
      //     if(group.balanceSheet.)
      // }
      let balances = [];
      if (group.balanceSheet.has(userId)) {
        let debts = group.balanceSheet.get(userId);
        debts.forEach(async (amount, friendId) => {
          // console.log(`Friend ID: ${friendId}, Amount: ${amount}`);
          const { name } = await userDetailsModel.findOne({ userId: friendId });
          balances.push({
            friendId: friendId,
            amount: amount,
            friendName: name,
          });
        });
        // balances.push({
        //   friendId:groupbalanceSheet.get(userId).get();
        // });
      }

      retGroupResults.push({
        groupId: group._id.toString(),
        groupName: group.groupName,
        borrowings: balances,
        members: group.users.map((user) => {
          return {
            userId: user.userId,
            userName: user.userName,
          };
        }),
      });
    }
    result.groupDebtListDetails = groupDebtIdList;
    result.message = "Success";
    result.flag = true;
    result.groupListDetails = retGroupResults;
    // console.log(res);
    return helperGet(res, result, 200, true);
  } catch (err) {
    console.log(err);
    return helperPost(res, err.message, 404, false);
  }
};

module.exports = getUserGroupsController;
