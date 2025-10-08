#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

console.log("🚀 Starting MongoDB Migration Process...\n");

// Check if .env.local exists
const envPath = path.join(__dirname, "..", ".env.local");
if (!fs.existsSync(envPath)) {
  console.error("❌ .env.local file not found!");
  console.log("Please create .env.local with your MongoDB connection string:");
  console.log(
    "MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/"
  );
  console.log("MONGODB_DATABASE=luxury_housing");
  process.exit(1);
}

// Read .env.local to check for MongoDB URI
const envContent = fs.readFileSync(envPath, "utf8");
if (!envContent.includes("MONGODB_URI=")) {
  console.error("❌ MONGODB_URI not found in .env.local!");
  console.log("Please add your MongoDB connection string to .env.local:");
  console.log(
    "MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/"
  );
  console.log("MONGODB_DATABASE=luxury_housing");
  process.exit(1);
}

console.log("✅ Environment configuration found");

try {
  // Run the migration script
  console.log("📦 Running data migration...");
  execSync("node scripts/migrate-to-mongodb.js", {
    stdio: "inherit",
    cwd: path.join(__dirname, ".."),
  });

  console.log("\n✅ Migration completed successfully!");
  console.log("\n📋 Next steps:");
  console.log("1. Test your application to ensure data is loading correctly");
  console.log("2. Verify that the CMS dashboard can read/write data");
  console.log("3. Check that all frontend components display data properly");
  console.log("\n🎉 Your CMS is now powered by MongoDB!");
} catch (error) {
  console.error("\n❌ Migration failed:", error.message);
  console.log("\n🔧 Troubleshooting:");
  console.log("1. Check your MongoDB connection string in .env.local");
  console.log("2. Ensure your MongoDB cluster is accessible");
  console.log("3. Verify that the database name is correct");
  console.log("4. Check your network connection");
  process.exit(1);
}
