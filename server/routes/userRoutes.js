const express = require("express");
const User = require("../models/userModel");


const router = express.Router();

// Create or Get User by Name
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  try {
    let user = await User.findOne({ name });
    if (!user) user = await User.create({ name });
    res.json(user);
  } catch (error) {
    console.error("User route error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update User Zodiac
router.put("/:id/zodiac", async (req, res) => {
  const { id } = req.params;
  const { zodiacSign } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { zodiacSign }, { new: true });
    res.json(user);
  } catch (error) {
    console.error("Error updating zodiac:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

