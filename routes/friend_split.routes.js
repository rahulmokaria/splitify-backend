const express = require("express");
const { verifier } = require("../middlewares/jwtverify");
const router = express.Router();

const addNewFriendController = require("../controller/friend_split_controllers/add_friend.controller");
const getUserFriendsController = require("../controller/friend_split_controllers/get_user_friends.controller");
const addNewFriendSplitTransactionController = require("../controller/friend_split_controllers/add_transaction.controller");
const getFriendSplitTransactionsController = require("../controller/friend_split_controllers/get_transactions.controller");
const editFriendSplitTransactionController = require("../controller/friend_split_controllers/edit_transaction.controller");

router.route("/addNewFriend").post(verifier, addNewFriendController);

router.route("/getUserFriends").post(verifier, getUserFriendsController);

router
  .route("/addNewFriendSplitTransaction")
  .post(verifier, addNewFriendSplitTransactionController);

router
  .route("/getFriendSplitTransactions")
  .post(verifier, getFriendSplitTransactionsController);

router
  .route("/editFriendSplitTransaction")
  .post(verifier, editFriendSplitTransactionController);

module.exports = router;
