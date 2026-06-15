import express from "express";
import { createFeeStructure } from "../controllers/feestructureController.js";

const router = express.Router();

// Create fee structure
router.post("/create-fee", createFeeStructure);

// Optional: get all fee structures
router.get("/all", async (req, res) => {
  try {
    const FeeStructure = (await import("../models/FeeStructure.js")).default;
    const data = await FeeStructure.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;




