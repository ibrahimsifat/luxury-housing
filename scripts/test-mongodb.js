const { MongoClient } = require("mongodb");
const path = require("path");

// Load environment variables
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || "luxury_housing";

async function testConnection() {
  console.log("🔍 Testing MongoDB Connection...\n");

  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in .env.local");
    process.exit(1);
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    console.log("📡 Connecting to MongoDB...");
    await client.connect();
    console.log("✅ Connected to MongoDB successfully!");

    const db = client.db(MONGODB_DATABASE);
    console.log(`📊 Using database: ${MONGODB_DATABASE}`);

    // Test collections
    const collections = await db.listCollections().toArray();
    console.log(`📁 Found ${collections.length} collections:`);

    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`   • ${collection.name}: ${count} documents`);
    }

    // Test a simple query
    const productsCollection = db.collection("products");
    const productCount = await productsCollection.countDocuments();
    console.log(`\n📦 Products collection: ${productCount} products`);

    if (productCount > 0) {
      const sampleProduct = await productsCollection.findOne();
      console.log(`📄 Sample product: ${sampleProduct.title}`);
    }

    console.log("\n🎉 MongoDB connection test completed successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection test failed:", error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log("🔌 Connection closed");
  }
}

testConnection();
