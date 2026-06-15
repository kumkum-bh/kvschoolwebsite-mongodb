import HomeSecond from "../models/HomeSecond.js";

export const getHomeSecond = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId);
    if (!schoolId) {
        return res.status(400).json({
            success: false,
            message: "Invalid schoolId",
        });
    }

    // if (!schoolId) {
    //   return res.status(400).json({ success: false, message: "schoolId missing" });
    // }

    const data = await HomeSecond.findOne({ schoolId });

    if (!data) {
      return res.json({ success: true, data: {} });
    }

    res.json({ success: true, data });
  } catch (err) {
    console.error("Error fetching HomeSecond:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateHomeSecond = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId);
    const updateData = req.body;

    const updated = await HomeSecond.findOneAndUpdate(
      { schoolId },
      updateData,
      { new: true, upsert: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
































