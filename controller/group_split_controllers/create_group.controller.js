const { groupDebtBalanceModel } = require("../../model/groupDebts.model");
const { userDetailsModel } = require("../../model/userDetails.model");
const {helperPost} = require("../../utils/helper");

const createNewGroupController = async (req, res) => {
  try {
    let { userId, groupName, users } = req.body;
    users = JSON.parse(users);

    // console.log(req.body);

    const userDetails = await userDetailsModel.findOne({ userId });

    users.push({ userId: userId, userName: userDetails.name });

    const balanceSheet = new Map();

    // for (const user of users){
    //   balanceSheet.set()
    // }


    // console.log(users);
    const { _id } = await groupDebtBalanceModel.create({
      groupName,
      users,
      balanceSheet
    });
    // console.log(_id);
    // console.log(typeof _id);
    const groupId = _id.toString();
    // console.log(groupId);

    if (!_id)
      return helperPost(res, "Error creating a group. Try again later", 400, false);
    // console.log(groupName);

    for (const user of users) {
      // console.log(user.userId);
      await userDetailsModel.findOneAndUpdate(
        { userId: user.userId },
        { $push: { groupDebtIdList: groupId } },
        { new: true }
      );
    }

    return helperPost(res, "Success", 200, true);
  } catch (err) {
    console.log(err);
    return helperPost(res, err.message, 404, false);
  }
};

module.exports = createNewGroupController;
