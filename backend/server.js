const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// -------------------- MIDDLEWARE -------------------- //
app.use(express.json());

// Allowed origins
const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://expense-tracker-gamma-silk.vercel.app" // deployed frontend
];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow tools like Postman/Insomnia
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Handle preflight requests (fixes Express v5 issue)
app.options(/^\/api\/.*/, cors());

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
