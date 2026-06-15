import Contact from "../models/Contact.js";

// GET Contact page data
export const getContact = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId);
    const data = await Contact.findOne({ schoolId });

    if (!data) return res.json({ success: true, data: { content: [] } });

    res.json({ success: true, data }); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// UPDATE / SAVE Contact content
export const updateContact = async (req, res) => {
  try {
    const { schoolId, content } = req.body;

    const updated = await Contact.findOneAndUpdate(
      { schoolId },
      { content },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: updated, message: "Contact updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to update contact" });
  }
};
