import express from "express";
import { getAcademics, updateAcademics } from "../controllers/adminacademicsController.js";

const router = express.Router();

router.get("/academics", getAcademics);
router.post("/update/:schoolId", updateAcademics);


export default router;











