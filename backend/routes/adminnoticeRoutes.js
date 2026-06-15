import express from "express";
import multer from "multer";
import {
  addNotice,
  updateNotice,
  deleteNotice,
  getAllNoticesAdmin
} from "../controllers/adminnoticeController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "notices");       // backend/notices folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/add", upload.single("file"), addNotice);
router.put("/update/:id", upload.single("file"), updateNotice);
router.delete("/delete/:id", deleteNotice);
router.get("/all", getAllNoticesAdmin);

export default router;









































