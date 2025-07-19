const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const nasaRes = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
    );
    res.json(nasaRes.data);
  } catch (error) {
    console.error("Error fetching APOD:", error.message);
    res.status(500).json({ message: "Failed to fetch APOD" });
  }
});

module.exports = router;
