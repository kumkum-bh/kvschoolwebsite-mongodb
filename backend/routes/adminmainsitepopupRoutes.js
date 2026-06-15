// import express from "express";
// import { updatePopup } from "../controllers/admin-mainsitepopupController.js";

// const router = express.Router();
// router.put("/update/:id", updatePopup);

// export default router;







import express from "express";
import { getPopup, updatePopup } from "../controllers/admin-mainsitepopupController.js";

const router = express.Router();

// ADMIN APIs
router.get("/get/:schoolId", getPopup);
router.put("/update/:id", updatePopup);

export default router;













