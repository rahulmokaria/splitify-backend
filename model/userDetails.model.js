const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userDetailsSchema = new Schema({
  amount: {
    type: Number,
    default: 0,
  },
  userId: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
    default: 0,
  },
  expense: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: "user",
  },
  friendDebtIdList: { type: [String], default: [] },
  groupDebtIdList: { type: [String], default: [] },
});

const userDetailsModel = model("userDetails", userDetailsSchema);
module.exports = { userDetailsModel };
