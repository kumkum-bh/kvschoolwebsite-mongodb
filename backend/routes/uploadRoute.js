import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Storage location (backend/assets2 folder)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const filePath = "/assets/" + req.file.filename;
  res.json({ success: true, filePath });
});

export default router;
