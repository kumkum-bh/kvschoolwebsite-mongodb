import FeeStructure from "../models/FeeStructure.js";
import AdminFeeStructure from "../models/AdminFeeStructure.js";

// Helper: check if class is inside stored range
function classInRange(className, studentClass) {
  className = className.replace(/\s/g, "");
  studentClass = Number(studentClass);

  // CASE 1: Class is range (1-5)
  if (className.includes("-")) {
    let [min, max] = className.split("-").map(Number);
    return studentClass >= min && studentClass <= max;
  }

  // CASE 2: Multiple classes using &
  if (className.includes("&")) {
    let parts = className.split("&").map(c => c.trim());
    return parts.includes(String(studentClass));
  }

  // CASE 3: Direct match
  return className === String(studentClass);
}

// GET all classes
export const getAllClasses = async (req, res) => {
  try {
    const classes = await FeeStructure.find({}, "className");
    res.json({ success: true, classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET fee structure (WITH RANGE MATCHING)
export const getFeeStructure = async (req, res) => {
  try {
    const className = req.params.className;

    const fee = await FeeStructure.findOne({ className });

    if (!fee) {
      return res.json({
        success: true,
        feeStructure: { className, items: [], total: 0 }
      });
    }

    // Convert MongoDB 'fees' array → frontend 'items' format
    const items = fee.fees.map((f) => ({
      itemName: f.item,
      amount: f.amount
    }));

    const total = items.reduce((sum, i) => sum + i.amount, 0);

    return res.json({
      success: true,
      feeStructure: {
        className: fee.className,
        items,
        total
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE fee structure
export const updateFeeStructure = async (req, res) => {
  try {
    const { className } = req.params;
    const { items } = req.body; // Frontend se items

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ success: false, message: "Invalid items array" });
    }

    // Map frontend format → DB format
    const feesToSave = items.map(i => ({ item: i.itemName, amount: Number(i.amount) }));

    // Find existing doc, ya create new
    let feeDoc = await AdminFeeStructure.findOne({ className });
    if (!feeDoc) {
      feeDoc = new AdminFeeStructure({ className, fees: feesToSave });
    } else {
      feeDoc.fees = feesToSave; // overwrite
    }

    await feeDoc.save(); // ✅ Persist in DB

    res.json({ success: true, message: "Fee structure updated permanently", feeStructure: feeDoc });

  } catch (error) {
    console.error("Error updating fee:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET fee structure with admin updates
export const getAdminFeeStructure = async (req, res) => {
  try {
    const { className } = req.params;

    const feeDoc = await AdminFeeStructure.findOne({ className });

    if (!feeDoc) {
      return res.json({
        success: true,
        feeStructure: { className, items: [], total: 0 }
      });
    }

    const items = feeDoc.fees.map(f => ({ itemName: f.item, amount: f.amount }));
    const total = items.reduce((sum, i) => sum + i.amount, 0);

    res.json({
      success: true,
      feeStructure: { className, items, total }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};








