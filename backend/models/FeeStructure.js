// models/FeeStructure.js
import mongoose from "mongoose";

const feeItemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  amount: { type: Number, required: true },
});

const feeStructureSchema = new mongoose.Schema({
  className: { type: String, required: true }, // "1-5", "6-9&11", "10&12"
  fees: [feeItemSchema],
}, { timestamps: true });

export default mongoose.model("FeeStructure", feeStructureSchema);

