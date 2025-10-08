const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || "luxury_housing";

if (!MONGODB_URI) {
  console.error("Please add your MongoDB URI to .env.local");
  process.exit(1);
}

// Sample client data based on existing images
const sampleClients = [
  {
    id: "client-1",
    name: "شركة التطوير العقاري",
    logo: "/clients/imgi_13_download.png",
    website: "https://example.com",
    description: "شركة رائدة في مجال التطوير العقاري",
    category: "Real Estate",
    featured: true,
    order: 1,
  },
  {
    id: "client-2",
    name: "بنك الاستثمار",
    logo: "/clients/imgi_14_9404f6_c147c8d811f14beb916d6cd3567758ec_mv2.png",
    website: "https://example.com",
    description: "بنك متخصص في الاستثمار العقاري",
    category: "Banking",
    featured: true,
    order: 2,
  },
  {
    id: "client-3",
    name: "مجموعة البناء الحديث",
    logo: "/clients/imgi_16_002.jpg",
    website: "https://example.com",
    description: "مجموعة متخصصة في البناء والتشييد",
    category: "Construction",
    featured: true,
    order: 3,
  },
  {
    id: "client-4",
    name: "شركة التمويل العقاري",
    logo: "/clients/imgi_17_9404f6_556dd3f4f9f54128a9d2b0393e0ffcbd_mv2.png",
    website: "https://example.com",
    description: "شركة متخصصة في التمويل العقاري",
    category: "Finance",
    featured: true,
    order: 4,
  },
  {
    id: "client-5",
    name: "مؤسسة الاستشارات العقارية",
    logo: "/clients/imgi_18_07.jpg",
    website: "https://example.com",
    description: "مؤسسة متخصصة في الاستشارات العقارية",
    category: "Consulting",
    featured: false,
    order: 5,
  },
  {
    id: "client-6",
    name: "شركة إدارة العقارات",
    logo: "/clients/imgi_19_001.jpg",
    website: "https://example.com",
    description: "شركة متخصصة في إدارة العقارات",
    category: "Property Management",
    featured: false,
    order: 6,
  },
];

async function migrateClients() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(MONGODB_DATABASE);
    const clientsCollection = db.collection("clients");

    // Check if clients already exist
    const existingClients = await clientsCollection.countDocuments();
    if (existingClients > 0) {
      console.log(
        `Found ${existingClients} existing clients. Do you want to add more? (This will not delete existing clients)`
      );
    }

    // Insert sample clients
    console.log("Inserting sample clients...");
    const result = await clientsCollection.insertMany(sampleClients);
    console.log(`Successfully inserted ${result.insertedCount} clients`);

    // Create indexes
    try {
      await clientsCollection.createIndex({ id: 1 }, { unique: true });
      await clientsCollection.createIndex({ featured: 1 });
      await clientsCollection.createIndex({ order: 1 });
      await clientsCollection.createIndex({ category: 1 });
      console.log("Indexes created successfully");
    } catch (indexError) {
      console.warn(
        "Index creation failed (might already exist):",
        indexError.message
      );
    }

    // Verify the data
    const allClients = await clientsCollection.find({}).toArray();
    console.log(`Total clients in database: ${allClients.length}`);

    // Show sample data
    if (allClients.length > 0) {
      console.log("Sample client data:");
      console.log(JSON.stringify(allClients[0], null, 2));
    }
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("Migration completed");
  }
}

// Run the migration
migrateClients();
