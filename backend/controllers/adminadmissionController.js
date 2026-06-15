import AdmissionsPage from "../models/Admission.js";

export const getAdmissionsPage = async (req, res) => {
  try {
    if (!req.query.schoolId)
      return res.status(400).json({ success: false, message: "schoolId is required" });

    const schoolId = Number(req.query.schoolId);
    const data = await AdmissionsPage.findOne({ schoolId });

    res.json({ success: true, data: data || {} });
  } catch (error) {
    console.error("Admissions controller GET error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const updateAdmissionsPage = async (req, res) => {
  try {
    if (!req.params.schoolId)
      return res.status(400).json({ success: false, message: "schoolId is required" });

    const schoolId = Number(req.params.schoolId);
    const updates = req.body;

    let page = await AdmissionsPage.findOne({ schoolId });

    if (!page) {
      page = new AdmissionsPage({ schoolId, ...updates });
    } else {
      Object.assign(page, updates);
    }

    await page.save();

    res.json({ success: true, message: "Admissions updated", data: page });
  } catch (error) {
    console.error("Admissions controller UPDATE error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
