import express from "express";
import { loginAdmin } from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/auth.js";
const router = express.Router();

router.post("/login", loginAdmin);

// Secure route (ONLY ADMIN CAN ACCESS)
router.get("/secure-data", verifyAdmin, (req, res) => {
  res.json({
    message: "Secure Admin Info",
    admin: req.admin
  });
});

export default router;
