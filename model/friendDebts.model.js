const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const friendDebtBalanceSchema = new Schema({
  friendDebtId: {
    type: String,
    required: true,
  },
  user1Id: {
    type: String,
    required: true,
    // default: null,
  },
  user1Name: {
    type: String,
    required: true,
    // default: null,
  },
  user2Id: {
    type: String,
    required: true,
    // default: null,
  },
  user2Name: {
    type: String,
    required: true,
    // default: null,
  },
  giverId: {
    type: String,
    default: null,
  },
  amount: {
    type: Number,
    // required: true,
    default: 0,
  },
});

const friendDebtBalanceModel = model(
  "friendDebtBalance",
  friendDebtBalanceSchema
);
module.exports = { friendDebtBalanceModel };

//giver is who paid
