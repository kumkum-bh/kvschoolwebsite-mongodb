import Registration from "../models/RegistrationForm.js";
import FeeStructure from "../models/FeeStructure.js";
import FeePayment from "../models/FeePayment.js";
import axios from "axios";


// 1️ Get Student + Fee Structure by Admission No
export const getStudentFee = async (req, res) => {
  try {
    const { admissionNo } = req.params;

    const student = await Registration.findOne({ admissionNo });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const studentClass = student.classApplied.toString();

    let feeData;
    if (["1","2","3","4","5"].includes(studentClass)) feeData = await FeeStructure.findOne({ className: "1-5" });
    else if (["6","7","8","9","11"].includes(studentClass)) feeData = await FeeStructure.findOne({ className: "6-9 & 11" });
    else if (["10","12"].includes(studentClass)) feeData = await FeeStructure.findOne({ className: "10 & 12" });
    else return res.status(404).json({ message: "Invalid class for fee structure" });

    if (!feeData) return res.status(404).json({ message: "Fee structure not found" });

    const totalFee = feeData.fees.reduce((sum, i) => sum + i.amount, 0);

    // Check existing payment
    const payment = await FeePayment.findOne({ admissionNo });
    const paidAmount = payment?.paidAmount || 0;
    const remainingAmount = payment ? payment.remainingAmount : totalFee;

    res.json({
      student,
      feeStructure: feeData.fees,
      totalFee,
      paidAmount,
      remainingAmount
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 2️⃣ Student Fee Payment

// export const payFee = async (req, res) => {
//   try {
//     const { admissionNo, amount } = req.body;

//     const student = await Registration.findOne({ admissionNo });
//     if (!student) return res.status(404).json({ message: "Student not found" });

//     const parentEmail = student.email;
//     if (!parentEmail) {
//       return res.status(400).json({ message: "Parent email not found" });
//     }

//     const studentClass = student.classApplied.toString();
//     let feeData;

//     if (["1","2","3","4","5"].includes(studentClass)) {
//       feeData = await FeeStructure.findOne({ className: "1-5" });
//     } 
//     else if (["6","7","8","9","11"].includes(studentClass)) {
//       feeData = await FeeStructure.findOne({ className: "6-9 & 11" });
//     } 
//     else if (["10","12"].includes(studentClass)) {
//       feeData = await FeeStructure.findOne({ className: "10 & 12" });
//     } 
//     else {
//       return res.status(404).json({ message: "Invalid class for fee structure" });
//     }

//     if (!feeData) return res.status(404).json({ message: "Fee structure not found" });

//     const totalFee = feeData.fees.reduce((sum, i) => sum + i.amount, 0);

//     // Check existing payment
//     let payment = await FeePayment.findOne({ admissionNo });

//     if (!payment) {
//       payment = new FeePayment({
//         admissionNo,
//         studentName: student.studentName,
//         classApplied: student.classApplied,
//         parentEmail,
//         totalFee,
//         paidAmount: 0,
//         remainingAmount: totalFee
//       });
//     }

//     payment.paidAmount += Number(amount);
//     payment.remainingAmount = payment.totalFee - payment.paidAmount;

//     if (payment.remainingAmount <= 0) payment.paymentStatus = "PAID";
//     else payment.paymentStatus = "PARTIAL";

//     await payment.save();

//     await axios.post("http://localhost:5678/webhook/fee-payment", {
//       admissionNo: payment.admissionNo,
//       studentName: payment.studentName,
//       classApplied: payment.classApplied,
//       totalFee: payment.totalFee,
//       paidAmount: Number(amount),
//       remainingAmount: payment.remainingAmount,
//       paymentStatus: payment.paymentStatus,
//       paymentDate: new Date(),
//       schoolEmail: "school@example.com", // ya env
//       parentEmail: payment.parentEmail
//     });

//     res.json({ success: true, payment });

//   } catch (err) {
//     console.error("PAY FEE ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };


export const payFee = async (req, res) => {
  try {
    const { admissionNo, amount } = req.body;

    const student = await Registration.findOne({ admissionNo });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const parentEmail = student.email;
    if (!parentEmail) {
      return res.status(400).json({ message: "Parent email not found" });
    }

    const studentClass = student.classApplied.toString();
    let feeData;

    if (["1","2","3","4","5"].includes(studentClass)) {
      feeData = await FeeStructure.findOne({ className: "1-5" });
    } 
    else if (["6","7","8","9","11"].includes(studentClass)) {
      feeData = await FeeStructure.findOne({ className: "6-9 & 11" });
    } 
    else if (["10","12"].includes(studentClass)) {
      feeData = await FeeStructure.findOne({ className: "10 & 12" });
    } 
    else {
      return res.status(404).json({ message: "Invalid class for fee structure" });
    }

    if (!feeData) return res.status(404).json({ message: "Fee structure not found" });

    const totalFee = feeData.fees.reduce((sum, i) => sum + i.amount, 0);

    let payment = await FeePayment.findOne({ admissionNo });

    if (!payment) {
      payment = new FeePayment({
        admissionNo,
        studentName: student.studentName,
        classApplied: student.classApplied,
        parentEmail,
        totalFee,
        paidAmount: 0,
        remainingAmount: totalFee
      });
    }

    payment.paidAmount += Number(amount);
    payment.remainingAmount = payment.totalFee - payment.paidAmount;
    payment.paymentStatus = payment.remainingAmount <= 0 ? "PAID" : "PARTIAL";

    await payment.save();

    // n8n webhook (NON-BLOCKING)
    try {
      await axios.post("http://localhost:5678/webhook/fee-payment", {
      // await axios.post("http://host.docker.internal:5678/webhook/fee-payment", {
        admissionNo: payment.admissionNo,
        studentName: payment.studentName,
        classApplied: payment.classApplied,
        totalFee: payment.totalFee,
        paidAmount: Number(amount),
        remainingAmount: payment.remainingAmount,
        paymentStatus: payment.paymentStatus,
        paymentDate: new Date(),
        parentEmail: payment.parentEmail
      });
    } catch (webhookError) {
      console.log("n8n webhook failed:", webhookError.message);
      // DO NOT throw error
    }

    // PAYMENT SUCCESS RESPONSE ALWAYS
    res.json({ success: true, payment });

  } catch (err) {
    console.error("PAY FEE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};










