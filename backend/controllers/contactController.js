import Contact from "../models/Contact.js";

// GET Contact page data
export const getContact = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId);
    const data = await Contact.findOne({ schoolId });

    if (!data) return res.json({ success: true, data: { content: [] } });

    res.json({ success: true, data: data }); // data.content should be array
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};







































