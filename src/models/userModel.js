import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
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
    select: false,
    minLength: [6, "password too short"],
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "notes", 
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export const userModel =
  mongoose.models.users || mongoose.model("users", userSchema);
