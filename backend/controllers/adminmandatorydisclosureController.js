import MandatoryDisclosure from "../models/MandatoryDisclosure.js";

// GET by schoolId
export const getMandatoryDisclosure = async (req, res) => {
  try {
    const schoolId = Number(req.params.schoolId);
    const disclosure = await MandatoryDisclosure.findOne({ schoolId });

    if (!disclosure) return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: disclosure.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// UPDATE by schoolId
export const updateMandatoryDisclosure = async (req, res) => {
  try {
    const schoolId = Number(req.params.schoolId);
    const data = req.body; // frontend is sending the full section object

    // findOneAndUpdate with upsert: true
    const updated = await MandatoryDisclosure.findOneAndUpdate(
      { schoolId },
      { data },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: updated.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

