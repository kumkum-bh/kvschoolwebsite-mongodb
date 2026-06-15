import Home from "../models/Home.js";

export const getHome = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId);
    const data = await Home.findOne({ schoolId });

    res.json(data || {});
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

