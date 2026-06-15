import mongoose from "mongoose";

const HeaderMenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  order: { type: Number, required: true }
});

export default mongoose.model("HeaderMenu", HeaderMenuSchema);











































