import express from "express";
import { getContact, updateContact } from "../controllers/admincontactController.js";

const router = express.Router();

router.get("/contact", getContact);
router.post("/contact/update", updateContact);

export default router;
