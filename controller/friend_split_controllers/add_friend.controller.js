const { userAuthModel } = require("../../model/user.model");
const { userDetailsModel } = require("../../model/userDetails.model");

const { friendDebtBalanceModel } = require("../../model/friendDebts.model");

const { helperPost } = require("../../utils/helper");

const addNewFriendController = async (req, res) => {
  try {
    // throw "kuchbhi";
    const { userId, contactNo } = req.body;
    const result = await userAuthModel.findOne({ contactNo });
    if (!result) return helperPost(res, "User does not exist.", 200, true);
    const { _id } = result;
    const friendUserName = result.name;
    if (userId == _id) {
      throw new Error("You cannot send a request to yourself");
    }
    let user1, user2;
    const { name } = await userDetailsModel.findOne({ userId });
    let sortedIds = [_id, userId].sort((a, b) => a.localeCompare(b));
    if (sortedIds[0] == _id) {
      user1 = friendUserName;
      user2 = name;
    } else {
      user2 = friendUserName;
      user1 = name;
    }
    let friendDebtId = sortedIds[0] + sortedIds[1];
    // console.log(user1);
    // console.log(user2);

    await friendDebtBalanceModel.create({
      friendDebtId: friendDebtId,
      user1Id: sortedIds[0],
      user1Name: user1,
      user2Id: sortedIds[1],
      user2Name: user2,
    });

    await userDetailsModel.findOneAndUpdate(
      { userId: userId },
      { $push: { friendDebtIdList: friendDebtId } },
      { new: true } // Return the updated document
    );
    await userDetailsModel.findOneAndUpdate(
      { userId: _id },
      { $push: { friendDebtIdList: friendDebtId } },
      { new: true } // Return the updated document
    );
    return helperPost(res, "Success", 200, true);
  } catch (err) {
    console.log(err);
    return helperPost(res, err.message, 404, false);
  }
};

module.exports = addNewFriendController;
