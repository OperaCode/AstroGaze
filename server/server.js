const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

// Import routes
const userRoutes = require("./routes/userRoutes");
const apodRoute = require("./routes/apod");
const horoscopeRoute = require("./routes/horoscope");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());



const allowedOrigins = [
  "http://localhost:5173",
//   "https://squiz-gamma.vercel.app"
];


app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));





// Routes
app.use("/users", userRoutes);
app.use("/apod", apodRoute);
app.use("/horoscope", horoscopeRoute);



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });
