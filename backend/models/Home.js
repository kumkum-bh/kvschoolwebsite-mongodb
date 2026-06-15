import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  schoolId: { type: Number, required: true, index: true },

  welcomeText: String,
  bannerVideos: [String],
  activities: [String],
  threeColumnSection: Object,
  testimonialVideos: [String]
});

export default mongoose.model("Home", homeSchema);

