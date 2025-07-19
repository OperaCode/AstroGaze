const express = require("express");
const cors = require("cors");
require("dotenv").config();

const apodRoute = require("./routes/apod");
const horoscopeRoute = require("./routes/horoscope");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/apod", apodRoute);
app.use("/api/horoscope", horoscopeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
