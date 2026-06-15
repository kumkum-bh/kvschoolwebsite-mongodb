import Home from "../models/Home.js";

export const getHome = async (req, res) => {
  try {
    const schoolId = Number(req.params.schoolId);

    const home = await Home.findOne({ schoolId });

    if (!home) {
      return res.json({
        success: true,
        data: {
          schoolId,
          welcomeText: "",
          bannerVideos: [],
          activities: [],
          threeColumnSection: {},
          testimonialVideos: []
        }
      });
    }

    res.json({ success: true, data: home });
  } catch (err) {
    console.log("GET HOME ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateHome = async (req, res) => {
  try {
    const schoolId = Number(req.params.schoolId);
    const updates = req.body;

    // ---- FIX: Ensure safe values ----
    updates.welcomeText = updates.welcomeText || "";

    updates.activities = Array.isArray(updates.activities)
      ? updates.activities
      : [];

    updates.bannerVideos = Array.isArray(updates.bannerVideos)
      ? updates.bannerVideos
      : [];

    updates.testimonialVideos = Array.isArray(updates.testimonialVideos)
      ? updates.testimonialVideos
      : [];

    updates.threeColumnSection = updates.threeColumnSection || {
      latestNewsHeading: "",
      latestNewsParagraph: "",
      video: "",
      activityCalendar: ""
    };

    let home = await Home.findOne({ schoolId });

    if (!home) {
      home = new Home({ schoolId, ...updates });
    } else {
      Object.assign(home, updates);
    }

    await home.save();

    res.json({
      success: true,
      message: "Home page updated",
      data: home
    });
  } catch (err) {
    console.log("UPDATE HOME ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};








