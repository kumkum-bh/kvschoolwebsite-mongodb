import express from "express";
import { getPopup } from "../controllers/mainsitepopupController.js";

const router = express.Router();
router.get("/", getPopup);
export default router;























