import Registration from "../models/RegistrationForm.js";

// ------------------------
// GET ALL ADMISSIONS LIST
// ------------------------
export const getAllAdmissions = async (req, res) => {
  try {
    const data = await Registration.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ------------------------
// GET SINGLE ADMISSION DETAIL
// ------------------------
export const getAdmissionById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Registration.findById(id);
    if (!data) return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



