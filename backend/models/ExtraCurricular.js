import mongoose from "mongoose";

const extraSchema = new mongoose.Schema({
  schoolId: { type: Number, required: true, index: true },
  sectionKey: String,
  title: String,
  content: String
});

export default mongoose.model("ExtraCurricular", extraSchema);














