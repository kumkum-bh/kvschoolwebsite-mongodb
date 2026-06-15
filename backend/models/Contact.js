import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  schoolId: { type: Number, required: true, index: true },
  content: { type: mongoose.Schema.Types.Mixed, default: [] }
});

export default mongoose.model("Contact", contactSchema);




































