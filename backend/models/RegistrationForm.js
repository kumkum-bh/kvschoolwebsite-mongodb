import mongoose from "mongoose";
import shortid from "shortid";

const RegistrationSchema = new mongoose.Schema({
  admissionNo: {
    type: String,
    default: () => "KV-" + shortid.generate().toUpperCase(),
    unique: true,
  },

  schoolId: Number,
  academicYear: String,
  classApplied: String,

  studentName: String,

  // Parents
  fatherName: String,
  motherName: String,

  fatherMobile: String,
  motherMobile: String,
  fatherEmail: String,
  motherEmail: String,

  // Guardians
  guardianName: String,
  guardianRelation: String,
  guardianMobile: String,
  guardianEmail: String,
  guardianAddress: String,

  // Final contact priority: father → mother → guardian
  phone: String,
  email: String,

  address: String,
  dob: Date,

}, { timestamps: true });

export default mongoose.model("Registration", RegistrationSchema);
