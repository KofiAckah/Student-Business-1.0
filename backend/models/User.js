import mongoose from "mongoose";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailPattern,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
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
    verified: {
      type: Boolean,
      default: false,
    },
    reset_OTP: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
