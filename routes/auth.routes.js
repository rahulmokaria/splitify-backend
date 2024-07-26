const express = require("express");
const { verifier } = require("../middlewares/jwtverify");
const router = express.Router();

const {
  changePasswordController,
} = require("../controller/auth_controllers/change_password.controller");
const {
  loginController,
} = require("../controller/auth_controllers/login.controller");
const {
  registerController,
} = require("../controller/auth_controllers/register.controller");

router.route("/changePassword").post(verifier, changePasswordController);
router.route("/login").post(loginController);
router.route("/register").post(registerController);

module.exports = router;