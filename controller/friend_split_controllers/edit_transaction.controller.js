const { friendDebtBalanceModel } = require("../../model/friendDebts.model");

const {helperPost} = require("../../utils/helper");

const friendTransacationModel = require("../../model/friendTransaction.model");

const editFriendSplitTransactionController = async (req, res) => {
  try {
    var newTransactionDetails = req.body;

    // console.log(newTransactionDetails);
    //has, id. amount, paidByUser, userShare, friendShare,date,friendDebtId,description
    //fetch old transaction
    const oldTransactionDetails = await friendTransacationModel.findById(
      newTransactionDetails.id
    );

    // console.log(oldTransactionDetails); //contains: paidByUSerId, friendDebtid,paidByshare,otherusershare,paidbyusername,amount,descr,date

    if (!oldTransactionDetails) {
      return helperPost(res, "Transaction not found", 404, false);
    }
    let friendDebtId = newTransactionDetails.friendDebtId;

    const r = await friendDebtBalanceModel.findOne({ friendDebtId });
    if (!r) {
      return helperPost(res, "Friend debt not found", 404, false);
    }

    //update new transaction

    var updateData = {
      paidByUserId: null,
      paidByUserName: null,
      friendDebtId,
      paidByShare: null,
      otherUserShare: null,
      amount: newTransactionDetails.amount,
      description: newTransactionDetails.description,
      date: newTransactionDetails.date,
    };

    if (newTransactionDetails.paidByUser == "You") {
      updateData.paidByUserId = newTransactionDetails.userId;
      updateData.paidByUserName =
        newTransactionDetails.userId == r.user1Id ? r.user1Name : r.user2Name;
      updateData.paidByShare = newTransactionDetails.userShare;
      updateData.otherUserShare = newTransactionDetails.friendShare;
    } else {
      updateData.paidByUserId =
        newTransactionDetails.userId == r.user1Id ? r.user2Id : r.user1Id;
      updateData.paidByUserName =
        newTransactionDetails.userId == r.user1Id ? r.user2Name : r.user1Name;
      updateData.paidByShare = newTransactionDetails.friendShare;
      updateData.otherUserShare = newTransactionDetails.userShare;
    }

    let newOtherUserId =
      updateData.paidByUserId == r.user1Id ? r.user2Id : r.user1Id;

    // console.log(updateData);

    const result = await friendTransacationModel.findByIdAndUpdate(
      newTransactionDetails.id,
      updateData,
      { new: true }
    );

    oldTransactionDetails.otherUserId =
      oldTransactionDetails.paidByUserId == r.user1Id ? r.user2Id : r.user1Id;

    if (!result) {
      return helperPost(res, "Failed to update transaction. Try again", 400, false);
    }
    //revert debt values to without the transaction
    let currentBalance = r.amount;
    let giverId = r.giverId;
    currentBalance = parseFloat(currentBalance);
    // console.log("currBalance before " + currentBalance);
    // console.log("giverId: " + giverId);

    if (giverId == null && currentBalance == 0) {
      // console.log("giverId is null");
      currentBalance = parseFloat(oldTransactionDetails.otherUserShare);
      giverId = oldTransactionDetails.otherUserId;
    } else if (giverId == oldTransactionDetails.paidByUserId) {
      // console.log("giverID = paidByuser");
      currentBalance -= parseFloat(oldTransactionDetails.otherUserShare);
      if (currentBalance == 0) {
        giverId == null;
      } else if (currentBalance < 0) {
        giverId = oldTransactionDetails.otherUserId;
        currentBalance = -currentBalance;
      }
    } else {
      // console.log("giverId is otheruser");
      currentBalance += parseFloat(oldTransactionDetails.otherUserShare);
    }

    // console.log("currBalance reverted " + currentBalance);
    // console.log("giverId: " + giverId);

    //add changes due to new transaction to debt values

    if (giverId == null && currentBalance == 0) {
      // console.log(1);
      giverId = updateData.paidByUserId;
      currentBalance = updateData.otherUserShare;
    } else if (giverId == updateData.paidByUserId) {
      // console.log(2);
      currentBalance += parseFloat(updateData.otherUserShare);
    } else {
      // console.log(3);
      currentBalance -= parseFloat(updateData.otherUserShare);
      if (currentBalance == 0) {
        giverId = null;
      } else if (currentBalance < 0) {
        currentBalance = -currentBalance;
        giverId = updateData.paidByUserId;
      }
    }
    // console.log("currBalance At last: " + currentBalance);
    // console.log("giverID: " + giverId);
    await friendDebtBalanceModel.findOneAndUpdate(
      { friendDebtId },
      { amount: currentBalance, giverId }
    );

    return helperPost(res, "Successfully updated", 200, true);
  } catch (err) {
    console.log(err);
    return helperPost(res, err.message, 400, false);
  }
};

module.exports = editFriendSplitTransactionController;
