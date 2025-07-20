const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();
const JWT_SECRET =process.env.JWT_SECRET

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Get horoscope from Aztro
router.post("/get", auth, async (req, res) => {
  const { sign, day } = req.body;
  try {
    const response = await axios.post(
      `https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "API error" });
  }
});

// Save reading to user
router.post("/save", auth, async (req, res) => {
  const { sign, reading } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    user.horoscopes.push({ sign, reading });
    await user.save();
    res.json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Save failed" });
  }
});

// Get saved readings
router.get("/saved", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user.horoscopes);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

module.exports = router;
