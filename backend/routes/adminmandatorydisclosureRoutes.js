import express from "express";
import {
  getMandatoryDisclosure,
  updateMandatoryDisclosure,
} from "../controllers/adminmandatorydisclosureController.js";

const router = express.Router();

// GET disclosure
router.get("/:schoolId", getMandatoryDisclosure);

// UPDATE disclosure
router.post("/update/:schoolId", updateMandatoryDisclosure);

export default router;


























