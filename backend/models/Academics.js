import mongoose from "mongoose";

const academicsSchema = new mongoose.Schema({
  schoolId: { type: Number, required: true, index: true },
  pedagogy: String,
  annualCalendar: String,
  result: String,
  curriculum: String,
  subjects: String,
  faculty: String,
  examination: String,
  examinationResult: String
});

export default mongoose.model("Academics", academicsSchema);



