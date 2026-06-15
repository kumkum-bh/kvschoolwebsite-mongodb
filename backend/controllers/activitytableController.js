import Activity from "../models/ActivityTable.js";

// Get all activities
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({}).sort({ className: 1 });
    res.json({ success: true, data: activities });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Add new activity
export const addActivity = async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    const savedActivity = await newActivity.save();
    res.json({ success: true, data: savedActivity });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Add Failed" });
  }
};

// Delete activity
export const deleteActivity = async (req, res) => {
  try {
    const deleted = await Activity.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Delete Failed" });
  }
};




export const updateActivity = async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update Failed" });
  }
};






























