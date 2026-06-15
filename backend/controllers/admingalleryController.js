import Gallery from "../models/Gallery.js";

// GET ALL IMAGES (with schoolId)
export const getGallery = async (req, res) => {
  try {
    console.log("REQ QUERY =", req.query);    // must show schoolId
    const schoolId = req.query.schoolId;
    const data = await Gallery.find({ schoolId });
    console.log("Fetched Data:", data.length);
    return res.json({ success: true, data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false });
  }
};



// ADD IMAGE
export const addGalleryImage = async (req, res) => {
  try {
    const { schoolId, url } = req.body;

    const img = await Gallery.create({ schoolId, url });

    return res.json({
      success: true,
      message: "Image added",
      data: img,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to add image",
    });
  }
};


// DELETE IMAGE
export const deleteGalleryImage = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: "Image deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete image",
    });
  }
};
























