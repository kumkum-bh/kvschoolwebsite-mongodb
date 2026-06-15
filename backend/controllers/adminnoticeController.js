import Notice from "../models/Notices.js";

export const addNotice = async (req, res) => {
  try {
    const fileUrl = req.file ? `/notices/${req.file.filename}` : null;

    const newNotice = new Notice({
      title: req.body.title,
      description: req.body.description,
      fileUrl,
      fileName: req.file ? req.file.originalname : null,
    });

    await newNotice.save();
    res.json({ message: "Notice added successfully", notice: newNotice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateNotice = async (req, res) => {
  try {
    let updateData = {
      title: req.body.title,
      description: req.body.description,
    };

    if (req.file) {
      updateData.fileUrl = `/notices/${req.file.filename}`;
      updateData.fileName = req.file.originalname;
    }

    const updated = await Notice.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ message: "Notice updated", notice: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Notice deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllNoticesAdmin = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};













































