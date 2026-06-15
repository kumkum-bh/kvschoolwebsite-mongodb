import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    className: { type: String, required: true },   // "Nursery", "LKG", etc.
    date: { type: String, required: true },        // "12 Feb 2026", "Full Year", etc.
    activity: { type: String, required: true },    // Activity description
  },
  { timestamps: true }
);

export default mongoose.model("ActivityTable", ActivitySchema);




























