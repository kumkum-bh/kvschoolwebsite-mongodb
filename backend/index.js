import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Load .env first
dotenv.config();

// IMPORT DATABASE CONFIG
import connectDB from "./config/db.js";

// IMPORT ROUTES
import homeRoutes from "./routes/homeRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import academicsRoutes from "./routes/academicsRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import extraCurricularRoutes from "./routes/extraCurricularRoutes.js";
import mandatoryDisclosureRoutes from "./routes/mandatoryDisclosureRoutes.js";
import RegistrarFormSubmissionRoutes from "./routes/RegistrarFormSubmissionRoutes.js";
import mainsitepopupRoutes from "./routes/mainsitepopupRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import registrationformRoutes from "./routes/registrationformRoutes.js"
import adminregistrationRoutes from "./routes/adminregistrationRoutes.js";
import feestructureRoutes from "./routes/feestructureRoutes.js"
import feepaymentRoutes from "./routes/feepaymentRoutes.js";
import adminfeestructureRoutes from "./routes/adminfeestructureRoutes.js";
import adminhomeRoutes from "./routes/adminhomeRoutes.js";
import adminadmissionRoutes from "./routes/adminadmissionRoutes.js";
import adminacademicsRoutes from "./routes/adminacademicsRoutes.js";
import adminextracurricularRoutes from "./routes/adminextracurricularRoutes.js";
import adminmandatorydisclosureRoutes from "./routes/adminmandatorydisclosureRoutes.js";
import admingalleryRoutes from "./routes/admingalleryRoutes.js";
import admincontactRoutes from "./routes/admincontactRoutes.js";
import adminnoticeRoutes from "./routes/adminnoticeRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import adminHeaderRoutes from "./routes/adminHeaderRoutes.js";
import adminmainsitepopupRoutes from "./routes/adminmainsitepopupRoutes.js";
import adminteachersRoutes from "./routes/adminteachersRoutes.js";
import homesecondRoutes from "./routes/homesecondRoutes.js";
import headersecondRoutes from "./routes/headersecondRoutes.js";
import uploadRoute from "./routes/uploadRoute.js";
import activitytableRoutes from "./routes/activitytableRoutes.js";

// Create Express App
const app = express();

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//   origin: ["http://localhost:3000", "http://localhost:3001"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://kvschoolwebsite-mongodb.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use(cookieParser());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});


// Static path for image uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/assets', express.static(path.join(__dirname, 'assets'), {
  maxAge: '0',        // caching disable
  etag: false
}));


app.use("/notices", express.static("notices"));



app.use("/uploads", express.static(path.join(__dirname, "uploads")));




// -------------------------------
// ✔ CONNECT DATABASE
// -------------------------------
connectDB();

// -------------------------------
// ✔ USE ROUTES
// -------------------------------
app.get("/api/gallery/test", (req, res) => {
  console.log("TEST ROUTE HIT");
  res.send("WORKING");
});


app.use("/api/home", homeRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/academics", academicsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/extracurricular", extraCurricularRoutes);
app.use("/api/mandatory-disclosure", mandatoryDisclosureRoutes);
app.use("/api/registrar-form", RegistrarFormSubmissionRoutes);
app.use("/api/main-site-popup", mainsitepopupRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/registrations", registrationformRoutes); 
app.use("/api/adminregistrations", adminregistrationRoutes);
app.use("/api/fees/", feepaymentRoutes);   // payment FIRST!
app.use("/api/fees/", feestructureRoutes); // structure SECOND
app.use("/api", adminfeestructureRoutes);
app.use("/api", adminhomeRoutes);
app.use("/api", adminadmissionRoutes);
app.use("/api/academics", adminacademicsRoutes);
app.use("/api/extracurricular", adminextracurricularRoutes);
app.use("/api/mandatory-disclosure", adminmandatorydisclosureRoutes);
app.use("/api", admingalleryRoutes);
app.use("/api", admincontactRoutes);
app.use("/api/admin-notices", adminnoticeRoutes);
app.use("/api", noticeRoutes);
app.use("/api/admin-header", adminHeaderRoutes);
app.use("/api/admin-main-popup", adminmainsitepopupRoutes);
app.use("/api/teachers", adminteachersRoutes);
app.use("/api/homesecond", homesecondRoutes)
app.use("/api/headersecond", headersecondRoutes);
app.use("/api/upload", uploadRoute);
app.use("/api/activities", activitytableRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Multi-School Dynamic Backend Running");
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));







