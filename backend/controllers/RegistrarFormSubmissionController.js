import RegistrarForm from "../models/RegistrarFormSubmission.js";

export const submitRegistrarForm = async (req, res) => {
  try {
    const data = req.body;
    const submission = new RegistrarForm(data);
    await submission.save();
    res.json({ success: true, message: "Registrar will reply soon!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};






export const getAllRegistrarForms = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId);

    const forms = await RegistrarForm.find({ schoolId }).sort({ submittedAt: -1 });

    res.json({
      success: true,
      data: forms
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};






























