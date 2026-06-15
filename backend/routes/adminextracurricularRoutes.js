import express from "express";
import { getExtraCurricular, updateExtraCurricular } from "../controllers/adminextracurricularController.js";

const router = express.Router();

router.get("/", getExtraCurricular);
router.post("/update", updateExtraCurricular);

export default router;
