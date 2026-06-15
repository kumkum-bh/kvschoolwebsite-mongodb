// import MainSitePopup from "../models/MainSitePopup.js";

// export const updatePopup = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = req.body;
//     const updated = await MainSitePopup.findByIdAndUpdate(id, data, { new: true });
//     res.json({ success: true, data: updated, message: "Popup updated successfully!" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };







import MainSitePopup from "../models/MainSitePopup.js";

export const getPopup = async (req, res) => {
  try {
    const schoolId = Number(req.params.schoolId);  // FIXED

    const popup = await MainSitePopup.findOne({ schoolId })
      .sort({ createdAt: -1 });

    res.json({ success: true, data: popup || {} });
  } catch (err) {
    console.error("GET POPUP ERROR:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const updatePopup = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const updated = await MainSitePopup.findByIdAndUpdate(id, updates, { new: true });

    res.json({ success: true, message: "Popup updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

















