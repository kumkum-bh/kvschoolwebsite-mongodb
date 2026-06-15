import mongoose from "mongoose";

const mandatorySchema = new mongoose.Schema({
  schoolId: { type: Number, required: true, index: true },
  data: Object
});

export default mongoose.model("MandatoryDisclosure", mandatorySchema);


















