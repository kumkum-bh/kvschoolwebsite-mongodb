import Mandatory from "../models/MandatoryDisclosure.js";

export const getMandatoryDisclosure = async (req, res) => {
  try {
    const schoolId = Number(req.query.schoolId);
    console.log("Fetching disclosure for schoolId:", schoolId);
    const data = await Mandatory.findOne({ schoolId });
    console.log("Fetching disclosure for schoolId:", schoolId);

    res.json({ success: true, data: data || {} });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

















