const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// -------------------- CORS CONFIG -------------------- //
const corsOptions = {
  origin: [
    "https://expense-tracker-gamma-silk.vercel.app", // your Vercel frontend
    "https://expense-tracker-5.onrender.com",        // your Render frontend (if deployed there)
    "http://localhost:3000"                          // local dev
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// -------------------- MIDDLEWARE -------------------- //
app.use(express.json());

// -------------------- ROUTES -------------------- //
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// -------------------- ROOT CHECK -------------------- //
app.get("/", (req, res) => {
  res.send("API is running...");
});

// -------------------- ERROR HANDLING -------------------- //
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Server Error" });
});

// -------------------- START SERVER -------------------- //
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
