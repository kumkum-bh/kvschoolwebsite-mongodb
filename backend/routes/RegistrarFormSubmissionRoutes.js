import express from "express";
import { submitRegistrarForm, getAllRegistrarForms } from "../controllers/RegistrarFormSubmissionController.js";

const router = express.Router();
router.post("/", submitRegistrarForm);
router.get("/", getAllRegistrarForms); 
export default router;



























