// models/expenseModel.js
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // required for multi-user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
