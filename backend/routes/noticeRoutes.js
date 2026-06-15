import express from "express";
import { getAllNotices } from "../controllers/noticeController.js";

const router = express.Router();

router.get("/notices", getAllNotices);

export default router;
