const router = require("express").Router();
const rateLimit = require("express-rate-limit");

// Limit DELETE requests to 10 per 15 minutes per IP
const deleteExpenseLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many delete requests from this IP, please try again after 15 minutes",
});

const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getExpenses);
router.post("/", protect, addExpense);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpenseLimiter, deleteExpense);

module.exports = router;
