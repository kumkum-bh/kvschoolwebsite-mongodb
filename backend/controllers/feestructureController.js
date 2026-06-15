import FeeStructure from "../models/FeeStructure.js";

export const createFeeStructure = async (req, res) => {
  try {
    const data = req.body; // JSON body
    const fee = await FeeStructure.create(data);
    res.status(201).json({ success: true, fee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};






