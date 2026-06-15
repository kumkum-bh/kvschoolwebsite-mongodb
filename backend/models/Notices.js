import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  fileUrl: String,       // e.g. /notices/17091234-file.pdf
  fileName: String,      // original filename
}, { timestamps: true });

export default mongoose.model("Notice", noticeSchema);
