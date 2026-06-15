import express from "express";
import { getExtraCurricular } from "../controllers/extraCurricularController.js";

const router = express.Router();
router.get("/", getExtraCurricular);
export default router;
















