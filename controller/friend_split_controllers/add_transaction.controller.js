const { friendDebtBalanceModel } = require("../../model/friendDebts.model");

const {helperPost} = require("../../utils/helper");

const friendTransacationModel = require("../../model/friendTransaction.model");

const addNewFriendSplitTransactionController = async (req, res) => {
  try {
    var {
      userId,
      amount,
      paidByUser,
      userShare,
      friendShare,
      date,
      friendDebtId,
      description,
    } = req.body;
    // console.log("new transaction");
    // console.log(req.body);

    var paidByUserId,
      paidByUserName,
      otherUserId,
      friendDebtId,
      paidByShare,
      otherUserShare;
    const r = await friendDebtBalanceModel.findOne({ friendDebtId });
    if (paidByUser == "You") {
      paidByUserId = userId;
      paidByUserName = r.user1Id == userId ? r.user1Name : r.user2Name;
      paidByShare = userShare;
      otherUserShare = friendShare;
      otherUserId = r.user1Id == userId ? r.user2Id : r.user1Id;
    } else {
      paidByUserId = r.user1Id == userId ? r.user2Id : r.user1Id;
      paidByUserName = r.user1Id == userId ? r.user2Name : r.user1Name;
      paidByShare = friendShare;
      otherUserShare = userShare;
      otherUserId = userId;
    }
    paidByShare = parseFloat(paidByShare);
    otherUserShare = parseFloat(otherUserShare);

    let updateData = {
      paidByUserId,
      paidByUserName,
      friendDebtId,
      paidByShare,
      otherUserShare,
      amount,
      description,
      date,
    };
    // console.log(updateData);
    const result = await friendTransacationModel.create(updateData);

    amt = amount;

    // console.log(result);
    if (result) {
      var { amount, giverId } = await friendDebtBalanceModel.findOne({
        friendDebtId,
      });
      // console.log(amount);
      amount = parseFloat(amount);
      if (giverId == null && amount == 0) {
        // console.log(1);
        giverId = paidByUserId;
        amount = otherUserShare;
      } else if (giverId == paidByUserId) {
        // console.log(2);
        amount += parseFloat(otherUserShare);
      } else {
        // console.log(3);
        amount = amount - parseFloat(otherUserShare);
        if (amount == 0) {
          giverId = null;
        } else if (amount < 0) {
          // console.log("neg amount");
          amount = -amount;
          // console.log("before giverid: " + giverId);
          giverId = paidByUserId;
          // console.log("after giverid: " + giverId);
        }
      }
      // console.log(giverId);
      await friendDebtBalanceModel.findOneAndUpdate(
        { friendDebtId },
        { amount, giverId }
      );
      // console.log("hogfaya");
      return helperPost(res, "Successfully added", 200, true);
    } else {
      return helperPost(res, " Failed to add. Try again", 400, false);
    }
  } catch (err) {
    console.log(err);
    return helperPost(res, err.message, 400, false);
  }
};

module.exports = addNewFriendSplitTransactionController;
