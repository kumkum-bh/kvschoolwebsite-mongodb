import express from "express";
import { getHome, updateHome } from "../controllers/adminhomeController.js";

const router = express.Router();

// Get home page data (For admin editor)
router.get("/home/:schoolId", getHome);

// ADMIN update home page
router.post("/admin/home/update/:schoolId", updateHome);

export default router;
















