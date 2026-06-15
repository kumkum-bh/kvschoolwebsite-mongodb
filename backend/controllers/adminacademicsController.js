import Academics from "../models/Academics.js";

export const getAcademics = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId);
    if (!schoolId) {
      return res.json({ success: false, message: "schoolId missing" });
    }

    const data = await Academics.findOne({ schoolId });

    res.json({
      success: true,
      data: data || {}
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


export const updateAcademics = async (req, res) => {
  try {
    const schoolId = Number(req.params.schoolId);

    const updated = await Academics.findOneAndUpdate(
      { schoolId },
      req.body,
      { new: true, upsert: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: "Update failed" });
  }
};












