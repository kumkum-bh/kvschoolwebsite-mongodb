import express from "express";
import upload from "../middleware/uploadTeacher.js";
import {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher
} from "../controllers/adminteachersController.js";

const router = express.Router();

// IMAGE UPLOAD ROUTE
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: false, message: "No file uploaded" });

  res.json({
    success: true,
    filePath: `/uploads/teachers/${req.file.filename}`,
  });
});

// Main CRUD
router.get("/", getTeachers);
router.get("/:id", getTeacher);
router.post("/add", createTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;








































