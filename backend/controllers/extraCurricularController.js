import Extra from "../models/ExtraCurricular.js";

export const getExtraCurricular = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId);

    const rows = await Extra.find({ schoolId });

    const sections = {};
    rows.forEach(item => {
      sections[item.sectionKey] = {
        title: item.title,
        content: item.content
      };
    });

    res.json({ success: true, data: { sections } });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};





























