import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  schoolId: { type: Number, required: true, index: true },
  name: { type: String, required: true },
  fatherName: String,
  motherName: String,
  gender: String,
  phone: String,
  email: String,
  address: String,
  classCategory: String,       // "1-5", "6-9&11", "10&12"
  subjects: [String],
  qualification: String,
  experience: Number,
  imageUrl: String,            // e.g. /uploads/teachers/abcd.jpg
  status: { type: String, default: "active" },
}, { timestamps: true });

export default mongoose.model("Teacher", TeacherSchema);
