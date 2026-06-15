import AdmissionsPage from "../models/Admission.js";

export const getAdmissionsPage = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId);

    const data = await AdmissionsPage.findOne({ schoolId });

    res.json({ success: true, data: data || {} });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};














