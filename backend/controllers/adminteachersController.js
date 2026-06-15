import Teacher from "../models/Teachers.js";

// GET all (with optional schoolId)
export const getTeachers = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId) || undefined;
    const filter = schoolId ? { schoolId } : {};
    const teachers = await Teacher.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: teachers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET single
export const getTeacher = async (req, res) => {
  try {
    const t = await Teacher.findById(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: t });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE
export const createTeacher = async (req, res) => {
  try {
    const data = req.body;
    const teacher = new Teacher(data);
    await teacher.save();
    res.json({ success: true, data: teacher });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE
export const updateTeacher = async (req, res) => {
  try {
    const data = req.body;
    const t = await Teacher.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ success: true, data: t });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE
export const deleteTeacher = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};






































