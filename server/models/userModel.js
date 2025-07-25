const mongoose = require("mongoose");
  const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, },
  password: { type: String }, 
  googleId: String,
  avatar: String,
  dob: { type: Date },
  horoscopes: [
    {
      sign: String,
      reading: Object,
      savedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // hashing of password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
