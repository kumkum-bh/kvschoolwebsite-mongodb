import mongoose from "mongoose";

const HeaderContentSchema = new mongoose.Schema({
  logo: { type: String },
  schoolName: { type: String, required: true },
  subHeading: { type: String, required: true },
  buttons: [
    {
      text: String,
      link: String,
      color: String,
      bgColor: String,
    },
  ]
});

export default mongoose.model("HeaderContent", HeaderContentSchema);


































