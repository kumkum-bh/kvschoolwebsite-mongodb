import Extra from "../models/ExtraCurricular.js";

// GET Extra sections
export const getExtraCurricular = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId);

    const rows = await Extra.find({ schoolId });

    const sections = {};
    rows.forEach(item => {
      sections[item.sectionKey] = {
        title: item.title,
        content: item.content,
      };
    });

    res.json({ success: true, data: { sections } });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};


// UPDATE Extra section
export const updateExtraCurricular = async (req, res) => {
  try {
    const schoolId = Number(req.body.schoolId); // ya req.params.schoolId agar use kar rahe ho
    const sections = req.body.sections; // front-end se sections ka object

    // Loop through each section and upsert
    for (let key in sections) {
      await Extra.findOneAndUpdate(
        { schoolId, sectionKey: key },
        { title: sections[key].title, content: sections[key].content },
        { new: true, upsert: true }
      );
    }

    res.json({ success: true, message: "Extra Curricular updated!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Update failed" });
  }
};
