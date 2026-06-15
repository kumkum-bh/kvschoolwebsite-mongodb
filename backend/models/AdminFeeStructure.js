import mongoose from "mongoose";

const FeeItemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  amount: { type: Number, required: true },
});

const AdminFeeStructureSchema = new mongoose.Schema({
  className: { type: String, required: true, unique: true },
  fees: [FeeItemSchema],
});

export default mongoose.model(
  "AdminFeeStructure",
  AdminFeeStructureSchema,
  "adminfeestructure"
);













