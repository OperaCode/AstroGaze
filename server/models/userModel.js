import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  zodiacSign: { type: String },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
