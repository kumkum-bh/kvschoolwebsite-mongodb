import mongoose from "mongoose";

const admissionsSchema = new mongoose.Schema({
  schoolId: { type: Number, required: true, index: true },
  formContent: String,
  onlineContent: String,
  feeStructure: String
});

export default mongoose.model("AdmissionsPage", admissionsSchema);












