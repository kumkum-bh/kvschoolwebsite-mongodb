import express from "express";
import { getMandatoryDisclosure } from "../controllers/mandatoryDisclosureController.js";

const router = express.Router();
router.get("/", getMandatoryDisclosure);
export default router;










