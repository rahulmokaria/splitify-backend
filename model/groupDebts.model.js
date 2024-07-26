const req = require("express/lib/request");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const groupDebtBalanceSchema = new Schema({
  groupName: {
    type: String,
    required: true,
  },
  users: [
    {
      userId: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
    },
  ],
  balanceSheet: {
    type: Map,
    of: {
      type: Map,
      of: Number,
    },
  },
});

const groupDebtBalanceModel = model("groupDebtBalance", groupDebtBalanceSchema);

module.exports = { groupDebtBalanceModel };
