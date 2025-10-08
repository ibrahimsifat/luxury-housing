const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

// Load environment variables
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || "luxury_housing";

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

async function migrateData() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(MONGODB_DATABASE);

    // Read JSON files
    const productsPath = path.join(__dirname, "..", "lib", "products.json");
    const servicesPath = path.join(__dirname, "..", "lib", "services.json");
    const galleryPath = path.join(__dirname, "..", "lib", "gallery.json");

    const productsData = JSON.parse(fs.readFileSync(productsPath, "utf8"));
    const servicesData = JSON.parse(fs.readFileSync(servicesPath, "utf8"));
    const galleryData = JSON.parse(fs.readFileSync(galleryPath, "utf8"));

    console.log(`Found ${productsData.length} products`);
    console.log(`Found ${servicesData.length} services`);
    console.log(`Found ${galleryData.length} gallery images`);

    // Clear existing collections
    await db.collection("products").deleteMany({});
    await db.collection("services").deleteMany({});
    await db.collection("gallery").deleteMany({});
    console.log("Cleared existing collections");

    // Clean up products data - fix duplicate slugs
    const cleanedProducts = productsData.map((product, index) => {
      // Check if slug already exists in previous products
      const existingSlugs = productsData.slice(0, index).map((p) => p.slug);
      if (existingSlugs.includes(product.slug)) {
        // Generate unique slug by appending index
        product.slug = `${product.slug}-${index}`;
        console.log(`Fixed duplicate slug: ${product.id} -> ${product.slug}`);
      }
      return product;
    });

    // Insert products
    if (cleanedProducts.length > 0) {
      const productsResult = await db
        .collection("products")
        .insertMany(cleanedProducts);
      console.log(`Inserted ${productsResult.insertedCount} products`);
    }

    // Clean up services data - fix duplicate slugs
    const cleanedServices = servicesData.map((service, index) => {
      // Check if slug already exists in previous services
      const existingSlugs = servicesData.slice(0, index).map((s) => s.slug);
      if (existingSlugs.includes(service.slug)) {
        // Generate unique slug by appending index
        service.slug = `${service.slug}-${index}`;
        console.log(
          `Fixed duplicate service slug: ${service.id} -> ${service.slug}`
        );
      }
      return service;
    });

    // Insert services
    if (cleanedServices.length > 0) {
      const servicesResult = await db
        .collection("services")
        .insertMany(cleanedServices);
      console.log(`Inserted ${servicesResult.insertedCount} services`);
    }

    // Insert gallery images
    if (galleryData.length > 0) {
      const galleryResult = await db
        .collection("gallery")
        .insertMany(galleryData);
      console.log(`Inserted ${galleryResult.insertedCount} gallery images`);
    }

    // Create indexes for better performance
    try {
      await db
        .collection("products")
        .createIndex({ slug: 1 }, { unique: true });
      await db.collection("products").createIndex({ category: 1 });
      await db.collection("products").createIndex({ featured: 1 });

      await db
        .collection("services")
        .createIndex({ slug: 1 }, { unique: true });
      await db.collection("services").createIndex({ category: 1 });
      await db.collection("services").createIndex({ featured: 1 });

      await db.collection("gallery").createIndex({ category: 1 });
      await db.collection("gallery").createIndex({ featured: 1 });

      console.log("Created database indexes");
    } catch (indexError) {
      console.warn(
        "Warning: Some indexes could not be created:",
        indexError.message
      );
      console.log(
        "This is usually not critical and the migration can continue."
      );
    }
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrateData();
