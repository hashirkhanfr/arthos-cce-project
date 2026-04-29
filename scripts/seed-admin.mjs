import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// Function to parse .env.local manually
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf8");
    envConfig.split("\n").forEach((line) => {
      const firstEq = line.indexOf("=");
      if (firstEq !== -1) {
        const key = line.substring(0, firstEq).trim();
        const value = line.substring(firstEq + 1).trim();
        if (key) {
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_USERNAME = "admin"; // Default username
const ADMIN_PASSWORD = "admin123"; // Default password - CHANGE THIS

async function seed() {
  if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI is not defined in .env.local");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB...");

    const UserSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, default: "admin" },
    });

    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: ADMIN_USERNAME });
    if (existingAdmin) {
      console.log(`Admin user '${ADMIN_USERNAME}' already exists. Updating password...`);
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log("Password updated successfully.");
    } else {
      console.log(`Creating new admin user: ${ADMIN_USERNAME}`);
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      const newAdmin = new User({
        username: ADMIN_USERNAME,
        password: hashedPassword,
        role: "admin",
      });
      await newAdmin.save();
      console.log("Admin user created successfully.");
    }

    console.log("\n-------------------------------------------");
    console.log(`Username: ${ADMIN_USERNAME}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    console.log("-------------------------------------------\n");
    console.log("Keep these credentials safe and change the password after first login.");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
