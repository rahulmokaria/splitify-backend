const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
  transactionType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
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
  userId: {
    type: String,
    required: true,
  },
});

const transactionModel = model("transactions", transactionSchema);
module.exports = { transactionModel };
