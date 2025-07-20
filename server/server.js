// server.js

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://squiz-gamma.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || "defaultsessionsecret",
  resave: false,
  saveUninitialized: true,
}));

// Passport setup
require("./config/passportConfig");
app.use(passport.initialize());
app.use(passport.session());

// Routes
// app.use("/auth", require("./routes/authRoutes"));
app.use("/user", require("./routes/userRoutes"));
// app.use("/score", require("./routes/scoreRoutes"));

// Start server only after DB connection is successful
const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
