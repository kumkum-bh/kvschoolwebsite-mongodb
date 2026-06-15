import express from "express";
import { getHeader, updateHeader } from "../controllers/headersecondController.js";

const router = express.Router();

router.get("/get-header", getHeader);
router.post("/update-header", updateHeader);

export default router;


































