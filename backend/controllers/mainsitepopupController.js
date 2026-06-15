import MainSitePopup from "../models/MainSitePopup.js";

export const getPopup = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId);
    const popup = await MainSitePopup.findOne({ schoolId, status: true }).sort({ createdAt: -1 });
    if (!popup) return res.status(404).json({ success: false, message: "No active popup found" });
    res.json({ success: true, data: popup });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


































