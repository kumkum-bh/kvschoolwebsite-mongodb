import express from "express";
import { createAdmission } from "../controllers/registrationformController.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/"); // uploads folder create karo project root me
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  }
});

const upload = multer({ storage });

router.post(
  "/create",
  upload.fields([
    { name: "studentPhoto", maxCount: 1 },
    { name: "fatherPhoto", maxCount: 1 },
    { name: "motherPhoto", maxCount: 1 }
  ]),
  createAdmission
);


export default router;









