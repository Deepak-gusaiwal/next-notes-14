import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ["high", "medium", "low"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lastEdit: {
    type: Date,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const noteModel =
  mongoose.models.notes || mongoose.model("notes", noteSchema);
