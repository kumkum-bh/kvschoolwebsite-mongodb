import express from "express";
import { getAllAdmissions, getAdmissionById } from "../controllers/adminregistrationController.js";

const router = express.Router();

// All admissions list
router.get("/all", getAllAdmissions);

// View Single Admission
router.get("/view/:id", getAdmissionById);

export default router;



