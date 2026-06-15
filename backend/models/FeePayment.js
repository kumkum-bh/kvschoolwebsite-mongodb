import mongoose from "mongoose";

const FeePaymentSchema = new mongoose.Schema({
  parentEmail: { type: String, required: true },
  admissionNo: { type: String, required: true },  
  studentName: { type: String, required: true },
  classApplied: { type: String, required: true },

  totalFee: Number,
  paidAmount: Number,
  remainingAmount: Number,

  paymentStatus: {
    type: String,
    enum: ["UNPAID", "PARTIAL", "PAID"],
    default: "UNPAID"
  },

  paymentDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model("FeePayment", FeePaymentSchema);









