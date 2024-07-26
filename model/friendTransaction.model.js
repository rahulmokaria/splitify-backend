const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const friendTransactionSchema = new Schema({
  paidByUserId: {
    type: String,
    required: true,
  },
  friendDebtId: {
    type: String,
    required: true,
  },
  paidByShare: {
    type: Number,
    required: true,
  },
  otherUserShare: {
    type: Number,
    required: true,
  },
  paidByUserName: { type: String, required: true },
  amount: { type: Number, required: true }, // this is the amount that has to be repaid to the paper by other user in the transaction
  description: { type: String, required: true },
  date: { type: String, required: true },
});

const friendTransacationModel = mongoose.model(
  "friendTransaction",
  friendTransactionSchema
);
module.exports = friendTransacationModel;
