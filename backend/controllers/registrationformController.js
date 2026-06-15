import Registration from "../models/RegistrationForm.js";

export const createAdmission = async (req, res) => {
  try {
    const b = req.body;

    const studentName =
      `${b.studentFirstName} ${b.studentMiddleName || ""} ${b.studentLastName}`.trim();

    const fatherName =
      `${b.fatherFirstName} ${b.fatherMiddleName || ""} ${b.fatherLastName}`.trim();

    const motherName =
      `${b.motherFirstName} ${b.motherMiddleName || ""} ${b.motherLastName}`.trim();

    const guardianName =
      `${b.guardianFirstName || ""} ${b.guardianMiddleName || ""} ${b.guardianLastName || ""}`.trim();

    const newData = {
      schoolId: b.schoolId,
      academicYear: b.academicYear,
      classApplied: b.classApplied,

      studentName,
      fatherName,
      motherName,

      fatherMobile: b.fatherMobile,
      motherMobile: b.motherMobile,
      fatherEmail: b.fatherEmail,
      motherEmail: b.motherEmail,

      // guardian fields
      guardianName: guardianName || "",
      guardianRelation: b.guardianRelation || "",
      guardianMobile: b.guardianMobile || "",
      guardianEmail: b.guardianEmail || "",
      guardianAddress: b.guardianAddress,

      // priority: father > mother > guardian
      phone: b.fatherMobile || b.motherMobile || b.guardianMobile || "",
      email: b.fatherEmail || b.motherEmail || b.guardianEmail || "",

      address: b.correspondingAddress,
      dob: b.dob,
    };

    const admission = await Registration.create(newData);

    res.status(200).json({ success: true, admission });

  } catch (err) {
    console.log("ERROR createAdmission:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
