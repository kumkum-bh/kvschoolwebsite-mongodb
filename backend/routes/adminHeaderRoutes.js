import express from "express";
import { 
  getHeaderContent,
  updateHeaderContent
} from "../controllers/adminheader-contentController.js";

import { 
  getMenu,
  addMenu,
  updateMenu,
  deleteMenu
} from "../controllers/adminheader-menuController.js";

const router = express.Router();

// Header Content
router.get("/content", getHeaderContent);
router.put("/content/update", updateHeaderContent);

// Menu
router.get("/menu", getMenu);
router.post("/menu/add", addMenu);
router.put("/menu/update/:id", updateMenu);
router.delete("/menu/delete/:id", deleteMenu);

export default router;





























































