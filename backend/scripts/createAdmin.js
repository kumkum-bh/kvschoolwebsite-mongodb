import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const username = "admin";     // default
    const plainPassword = "admin123";  // default password

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = new Admin({
      username,
      password: hashedPassword
    });

    await admin.save();

    console.log("Admin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();

