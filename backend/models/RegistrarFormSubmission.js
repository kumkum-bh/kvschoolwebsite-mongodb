import mongoose from "mongoose";

const registrarFormSchema = new mongoose.Schema({
  schoolId: { type: Number, required: true, index: true },
  name: String,
  email: String,
  phone: String,
  message: String,
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("RegistrarFormSubmission", registrarFormSchema);
















