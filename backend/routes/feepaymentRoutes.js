import express from "express";
import { getStudentFee, payFee } from "../controllers/feepaymentController.js";

const router = express.Router();

router.get("/:admissionNo", getStudentFee);
router.post("/pay", payFee);

export default router;




















