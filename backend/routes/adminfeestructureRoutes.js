import express from "express";
import {
  getAllClasses,
  getFeeStructure,
  updateFeeStructure,
  getAdminFeeStructure,
} from "../controllers/adminfeestructureController.js";

const router = express.Router();

// GET all classes
router.get("/admin-classlist/classes", getAllClasses);

// GET fee structure using smart range matching
router.get("/admin-classdetail/fees/:className", getFeeStructure);

// UPDATE fee structure
router.post("/admin-classdetail/fees/update/:className", updateFeeStructure);


// GET fee + admin updates
router.get("/admin-classdetail/fees/admin/:className", getAdminFeeStructure);

export default router;













