import express from "express";
import { getAdmissionsPage, updateAdmissionsPage } from "../controllers/adminadmissionController.js";

const router = express.Router();

router.get("/admissions-page", getAdmissionsPage);
router.put("/admin/admissions/update/:schoolId", updateAdmissionsPage);

export default router;
