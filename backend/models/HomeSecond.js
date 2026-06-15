import mongoose from "mongoose";

// ------------------ Section-1: Welcome ------------------
const classItemSchema = new mongoose.Schema({
  id: Number,
  classKey: String,
  className: String,
  heading: String,
  subheading: String,
  date: String,
  description: String,
});

const WelcomeSectionSchema = new mongoose.Schema({
  left: {
    bgImage: String,
    heading: String,
    paragraph: String
  },
  right: {
    title: String,
    classes: [classItemSchema],
    buttonLink: String
  }
});

// ------------------ Section-2: Activity ------------------
const ActivityItemSchema = new mongoose.Schema({
  icon: String,
  title: String,
  description: String
});

const ActivitySectionSchema = new mongoose.Schema({
  activities: [ActivityItemSchema]
});

// ------------------ Section-3: Special Moments ------------------
const MomentSchema = new mongoose.Schema({
  image: String,
  description: String
});

const SpecialMomentsSectionSchema = new mongoose.Schema({
  moments: [MomentSchema]
});

// ------------------ Section-4: Principal Message ------------------
const PrincipalMessageSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String
});

const PrincipalMessageSectionSchema = new mongoose.Schema({
  messages: [PrincipalMessageSchema]
});

// ------------------ Section-5: Vice Principal Message ------------------
const VicePrincipalSchema = new mongoose.Schema({
  image: String,
  subheading: String,
  description: String
});

const VicePrincipalSectionSchema = new mongoose.Schema({
  vicePrincipals: [VicePrincipalSchema]
});

// ------------------ Main HomeSecond Schema ------------------
const homeSecondSchema = new mongoose.Schema({
  schoolId: { type: Number, required: true },
  welcomeSection: WelcomeSectionSchema,
  activitySection: ActivitySectionSchema,
  specialMomentsSection: SpecialMomentsSectionSchema,
  principalMessageSection: PrincipalMessageSectionSchema,
  vicePrincipalMessageSection: VicePrincipalSectionSchema
}, { timestamps: true });

export default mongoose.model("homesecond", homeSecondSchema);






























