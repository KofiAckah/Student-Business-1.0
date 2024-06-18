import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  seller: {
    type: Boolean,
    default: false,
  },
  VerifiedSeller: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Number,
  },
  dob: {
    type: Date,
  },
  bio: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  reset_OTP: {
    type: Number,
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
