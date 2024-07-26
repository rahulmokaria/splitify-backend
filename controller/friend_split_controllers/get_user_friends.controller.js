const { userDetailsModel } = require("../../model/userDetails.model");

const { friendDebtBalanceModel } = require("../../model/friendDebts.model");

const { helperPost } = require("../../utils/helper");

const getUserFriendsController = async (req, res) => {
  try {
    const { userId } = req.body;
    var userDetails = await userDetailsModel.findOne({ userId });
    if (!userDetails) return helper(res, "User does not exist");
    const { friendDebtIdList } = userDetails;
    var debtListDetails = await friendDebtBalanceModel.find({
      friendDebtId: { $in: friendDebtIdList },
    });
    // console.log(debtListDetails);
    // console.log(debtListDetails);
    var result = [];
    for (i in debtListDetails) {
      var name;
      var friendId;
      const curr = debtListDetails[i];
      if (userId == curr.user1Id) {
        name = curr.user2Name;
        friendId = curr.user2Id;
      } else {
        name = curr.user1Name;
        friendId = curr.user1Id;
      }
      // console.log(name);
      var tempres = {
        friendName: name,
        friendDebtId: curr.friendDebtId,
        friendId: friendId,
        amount: curr.amount,
        giverId: curr.giverId,
      };

      result.push(tempres);

      // result.add(userId:userId);
    }
    // console.log(result);
    result.sort((a, b) => a.friendName.localeCompare(b.friendName));
    // console.log(result);
    return helperPost(res, { userId: userId, friendList: result }, 200, true);
  } catch (err) {
    console.log(err);
    return helperPost(res, err.message, 404, false);
  }
};

module.exports = getUserFriendsController;
