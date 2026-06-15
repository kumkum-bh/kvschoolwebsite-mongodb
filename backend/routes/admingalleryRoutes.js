import express from "express";
import {
  getGallery,
  addGalleryImage,
  deleteGalleryImage,
} from "../controllers/admingalleryController.js";

const router = express.Router();
console.log("Gallery routes loaded");

router.get("/gallery", getGallery);
console.log("GET /api/gallery HIT");
router.post("/gallery/add", addGalleryImage);
router.delete("/gallery/delete/:id", deleteGalleryImage);

export default router;


























