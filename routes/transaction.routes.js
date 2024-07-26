const express = require("express");
const { verifier } = require("../middlewares/jwtverify");
const router = express.Router();

const addTransactionController = require("../controller/transaction_controllers/add_transaction.controller");
const deleteTransactionController = require("../controller/transaction_controllers/delete_transaction.controller");
const editTransactionController = require("../controller/transaction_controllers/editTransaction.controller");
const getTransactionsController = require("../controller/transaction_controllers/get_transactions.controller");

router.route("/addTransaction").post(verifier, addTransactionController);
router.route("/deleteTransaction").post(verifier, deleteTransactionController);
router.route("/editTransaction").post(verifier, editTransactionController);
router.route("/getTransactions").post(verifier, getTransactionsController);

module.exports = router;