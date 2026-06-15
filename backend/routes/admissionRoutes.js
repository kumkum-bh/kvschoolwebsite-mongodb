import express from "express";
import { getAdmissionsPage } from "../controllers/admissionController.js";

const router = express.Router();
router.get("/admissions-page", getAdmissionsPage);
export default router;













