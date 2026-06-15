import express from "express";
import { getActivities, addActivity, deleteActivity, updateActivity } from "../controllers/activitytableController.js";

const router = express.Router();

router.get("/", getActivities);
router.post("/add", addActivity);
router.delete("/delete/:id", deleteActivity);
router.put("/update/:id", updateActivity);


export default router;


































