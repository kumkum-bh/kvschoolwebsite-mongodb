import MainHeader from "../models/HeaderSecond.js";

export const getHeader = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId);
    const header = await MainHeader.findOne({ schoolId });

    res.json({ success: true, data: header || {} });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateHeader = async (req, res) => {
  try {
    const schoolId = Number(req.body.schoolId);

    const updatedHeader = await MainHeader.findOneAndUpdate(
      { schoolId },
      req.body,
      { new: true, upsert: true }
    );

    res.json({ success: true, data: updatedHeader });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update Failed" });
  }
};











































