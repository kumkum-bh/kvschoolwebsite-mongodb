import React, { useState } from "react";
import "../styles/PayFee.css";
import api, { API, showToast, showAlert } from "../api";

export default function FeePayment() {
  const [admissionNo, setAdmissionNo] = useState("");
  const [student, setStudent] = useState(null);
  const [feeData, setFeeData] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
  const [amount, setAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  // SEARCH FEE
  const fetchFee = async () => {
    try {
      const res = await api.get(API.FEES.GET_BY_ADMISSION + admissionNo);
      setStudent(res.data.student);
      setFeeData(res.data.feeStructure);
      setTotalFee(res.data.totalFee);
      setPaidAmount(res.data.paidAmount);
      setRemainingAmount(res.data.remainingAmount);
      showToast("Student found successfully!");
    } catch (err) {
      showAlert({ icon: "error", title: "Invalid Admission Number", text: "Please enter a valid Admission No", confirmButtonColor: "#d33" });
    }
  };


  // PAY NOW
  const payNow = async () => {
    try {
      const res = await api.post(API.FEES.PAY, { admissionNo, amount: Number(amount) });

      showAlert({
        icon: "success",
        title: "Payment Successful",
        html: `
          Paid: ₹${amount} <br>
          Remaining: ₹${res.data.payment.remainingAmount}
        `,
        showConfirmButton: true
      }).then(() => {
        // ✅ Wait 3 seconds before redirecting
        setTimeout(() => {
          window.location.href = "/";
        }, 3000); // 3000ms = 3 seconds
      });

      // Refresh fee info and clear input
      fetchFee();
      setAmount("");

    } catch (err) {
      showAlert({
        icon: "error",
        title: "Payment Failed",
        text: err.response?.data?.message || "Something went wrong"
      });
    }
  };





  return (
    <div className="fee-container">
      <h1>Online Fee Payment</h1>

      <div className="box">
        <input
          type="text"
          placeholder="Enter Admission Number"
          value={admissionNo}
          onChange={(e) => setAdmissionNo(e.target.value)}
        />
        <button onClick={fetchFee}>Search</button>
      </div>

      {student && (
        <div className="details-box">
          <h2>{student.studentName}</h2>
          <p>Class: {student.classApplied}</p>

          <table>
            <thead>
              <tr>
                <th>Fee Item</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {feeData.map((f, i) => (
                <tr key={i}>
                  <td>{f.item}</td>
                  <td>{f.amount}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td>Total</td>
                <td>₹{totalFee}</td>
              </tr>
              <tr>
                <td>Paid</td>
                <td>₹{paidAmount}</td>
              </tr>
              <tr>
                <td>Remaining</td>
                <td>₹{remainingAmount}</td>
              </tr>

            </tbody>
          </table>

          <div className="payment-box">
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={payNow}>Pay Now</button>
          </div>
        </div>
      )}
    </div>
  );
}













































