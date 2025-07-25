const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  });
};


const registerUser = async (req, res) => {
  try {
    const { name, email, password, dob } = req.body; // added dob
    console.log("Incoming request body:", req.body);

    if (!name || !email || !password || !dob) { // validate dob
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8 || password.length > 12) {
      return res
        .status(400)
        .json({ message: "Password must be between 8 and 12 characters" });
    }

    // Optional: Validate dob to be a valid date and not in the future
    const parsedDob = new Date(dob);
    if (isNaN(parsedDob.getTime()) || parsedDob > new Date()) {
      return res.status(400).json({ message: "Invalid date of birth" });
    }

    const userExist = await User.findOne({ email });
    console.log("Existing user check result:", userExist);

    if (userExist) {
      return res
        .status(400)
        .json({ message: "User already exists. Please log in." });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      dob: parsedDob, 
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 86400000),
      sameSite: "none",
      secure: true,
    });

    console.log("User registered successfully:", newUser.email);

    res.status(201).json({
      message: `Registration Successful! A verification email has been sent.`,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        dob: newUser.dob, // return dob in response
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    console.log(user)

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User Not Found!" });
    }
    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // Expires in 24 hours
      sameSite: "none",
      secure: true,
    });

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        
      },
      token: token,
    });

    console.log(user);
  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req,res) =>{
  try {
    // authMiddleware sets req.userId from token
    const user = await User.findById(req.userId).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      dob: user.dob,
      zodiacSign: user.zodiacSign,
      avatar: user.avatar,
      _id: user._id,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }

};



module.exports = { registerUser, loginUser, getUser };
