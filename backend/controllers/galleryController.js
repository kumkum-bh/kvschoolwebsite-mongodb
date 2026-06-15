import Gallery from "../models/Gallery.js";

export const getGallery = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId);

    const rows = await Gallery.find({ schoolId });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};




















