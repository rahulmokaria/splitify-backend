const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const groupTransactionSchema = new Schema({
  groupDebtId: {
    type: String,
    required: true,
  },
  paidByUserName: { type: String, required: true },
  paidByUserId: {
    type: String,
    required: true,
  },
  shares: {
    type: Map,
    of: {
      type: Map,
      of: Number,
    },
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const groupTransacationModel = mongoose.model(
  "groupTransactions",
  groupTransactionSchema
);
module.exports = groupTransacationModel;
