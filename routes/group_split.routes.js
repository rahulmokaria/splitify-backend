const express = require("express");
const { verifier } = require("../middlewares/jwtverify");
const createNewGroupController = require("../controller/group_split_controllers/create_group.controller");
const getUserGroupsController = require("../controller/group_split_controllers/get_user_groups.controller");
const getGroupDetailsController = require("../controller/group_split_controllers/get_group_details.controller");
const getGroupTransactionsController = require("../controller/group_split_controllers/get_group_transactions.controller");
// const getGroupTransactionsController = require("../controller/group_split_controllers/get_group_transactions.controller");

const router = express.Router();

router.route("/createGroup").post(verifier, createNewGroupController);

router.route("/getUserGroups").post(verifier, getUserGroupsController);

router.route("/getGroupDetails").post(verifier, getGroupDetailsController);

router
  .route("/getGroupTransactions")
  .post(verifier, getGroupTransactionsController);

module.exports = router;
