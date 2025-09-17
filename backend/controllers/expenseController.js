const Expense = require("../models/expenseModel");

// Get all expenses of logged-in user
const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id }); // only fetch this user's expenses
  res.json(expenses);
};

// Add new expense for logged-in user
const addExpense = async (req, res) => {
  const { title, amount, category } = req.body;
  const expense = await Expense.create({
    title,
    amount,
    category,
    user: req.user._id, // associate expense with logged-in user
  });
  res.json(expense);
};

// Update expense (only if belongs to logged-in user)
const updateExpense = async (req, res) => {
  const { amount } = req.body;
  const expense = await Expense.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { amount },
    { new: true }
  );
  if (!expense) return res.status(404).json({ message: "Expense not found" });
  res.json(expense);
};

// Delete expense (only if belongs to logged-in user)
const deleteExpense = async (req, res) => {
  const expense = await Expense.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!expense) return res.status(404).json({ message: "Expense not found" });
  res.json({ message: "Expense deleted" });
};

module.exports = { getExpenses, addExpense, updateExpense, deleteExpense };
