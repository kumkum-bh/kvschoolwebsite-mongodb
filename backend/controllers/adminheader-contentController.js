import HeaderContent from "../models/HeaderContent.js";

export const getHeaderContent = async (req, res) => {
  try {
    const content = await HeaderContent.findOne();
    res.json({ success: true, content });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateHeaderContent = async (req, res) => {
  try {
    const { schoolName, subHeading, logo, buttons } = req.body;

    if (!schoolName || !subHeading) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    let content = await HeaderContent.findOne();
    if (!content) {
      content = new HeaderContent({ schoolName, subHeading, logo, buttons });
      await content.save();
    } else {
      content = await HeaderContent.findOneAndUpdate({}, { schoolName, subHeading, logo, buttons }, { new: true });
    }

    res.json({ success: true, content, message: "Header updated successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

















































