import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  schoolId: { type: Number, required: true, index: true },
  url: String
});

export default mongoose.model("Gallery", gallerySchema);





















