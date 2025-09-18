const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// -------------------- MIDDLEWARE -------------------- //
// Parse JSON requests
app.use(express.json());

// CORS configuration
// Replace with your frontend URL on Render
const FRONTEND_URL = process.env.FRONTEND_URL || "https://expense-tracker-5dui.onrender.com";
app.use(cors({
  origin: expense-tracker-gamma-silk.vercel.app,
  credentials: true,
}));

// -------------------- ROUTES -------------------- //
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// -------------------- DEPLOYMENT -------------------- //
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../frontend/build")));

  // Catch-all handler for React Router (Express 5 fix: no "*")
  app.use((req, res) =>
    res.sendFile(path.resolve(__dirname1, "../frontend/build","index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// -------------------- ERROR HANDLING -------------------- //
// Catch all errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Server Error" });
});

// -------------------- START SERVER -------------------- //
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
