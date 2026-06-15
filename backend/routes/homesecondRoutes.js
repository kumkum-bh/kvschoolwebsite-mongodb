import express from "express";
import { getHomeSecond, updateHomeSecond } from "../controllers/homesecondController.js";

const router = express.Router();

router.get("/get-home-seconds", getHomeSecond);
router.put("/update", updateHomeSecond);


export default router;





































