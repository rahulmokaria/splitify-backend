const express = require("express");
const { verifier } = require("../middlewares/jwtverify");
const router = express.Router();

const userDetailsController = require("../controller/user_controllers/user_details.controller");
const getCategoricalSpentController = require("../controller/user_controllers/categorical_spent.controller");
const getCompleteUserDetailsController = require("../controller/user_controllers/complete_user_details.controller");
const changeUserNameController = require("../controller/user_controllers/change_username.controller");

router.route("/userDetails").post(verifier, userDetailsController);
router.route("/getPieChart").post(verifier, getCategoricalSpentController);
router
  .route("/getUserCompleteDetails")
  .post(verifier, getCompleteUserDetailsController);
router.route("/changeUserName").post(verifier, changeUserNameController);

module.exports = router;
