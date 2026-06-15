

import mongoose from "mongoose";

const mainSitePopupSchema = new mongoose.Schema(
  {
    schoolId: { type: Number, required: true },
    heading: String,
    description: String,
    image: String,
    status: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("MainSitePopup", mainSitePopupSchema);

























