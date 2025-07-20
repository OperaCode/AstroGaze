const express = require("express");
const router = express.Router();
const {protectUser} = require("../middleware/authMiddleware"); 
const { registerUser, loginUser, getUser} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protectUser, getUser)
  

module.exports = router;
