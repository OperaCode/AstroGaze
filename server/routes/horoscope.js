const express = require("express");
const router = express.Router();
const axios = require("axios");

// Uses aztro API (no API key needed, uses POST request)
router.get("/", async (req, res) => {
  const { sign, day } = req.query;
  try {
    const response = await axios.post(
      `${process.env.HOROSCOPE_API_URL}?sign=${sign}&day=${day}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching horoscope:", error.message);
    res.status(500).json({ message: "Failed to fetch horoscope" });
  }
});

module.exports = router;
