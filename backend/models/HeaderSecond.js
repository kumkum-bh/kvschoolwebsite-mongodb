import mongoose from "mongoose";

const HeaderSchema = new mongoose.Schema(
  {
    schoolId: {
      type: Number,
      required: true,
      unique: true
    },

    logo: {
      type: String,
      required: true
    },

    menuItems: [
      {
        name: { type: String, required: true },
        link: { type: String, required: true }
      }
    ],

    adminButton: {
      text: { type: String, default: "Admin Login" },
      link: { type: String, default: "/admin/login" }
    },

    backgroundVideo: {
      type: String,
      default: "/assets2/header.mp4"
    }
  },
  { timestamps: true }
);

export default mongoose.model("HeaderSecond", HeaderSchema);















