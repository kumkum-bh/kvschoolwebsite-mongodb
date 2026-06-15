import Academics from "../models/Academics.js";

export const getAcademics = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId);
    if (!schoolId) return res.status(400).json({ error: "schoolId missing" });

    const data = await Academics.findOne({ schoolId });
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

