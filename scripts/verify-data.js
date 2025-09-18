// Data verification script to check all services and products
const fs = require("fs");
const path = require("path");

async function verifyData() {
  console.log("🔍 Verifying CMS Data...\n");

  try {
    // Load services
    const servicesPath = path.join(__dirname, "../lib/services.ts");
    const servicesContent = fs.readFileSync(servicesPath, "utf8");

    // Extract services using regex
    const servicesMatch = servicesContent.match(
      /export const services: Service\[\] = (\[[\s\S]*?\]);/
    );
    if (servicesMatch) {
      const services = JSON.parse(servicesMatch[1]);
      console.log(`✅ Services loaded: ${services.length} items`);
      services.forEach((service, index) => {
        console.log(`   ${index + 1}. ${service.title} (${service.id})`);
      });
    } else {
      console.log("❌ Could not load services");
    }

    console.log("\n" + "=".repeat(50) + "\n");

    // Load products
    const productsPath = path.join(__dirname, "../lib/products.ts");
    const productsContent = fs.readFileSync(productsPath, "utf8");

    // Extract products using regex
    const productsMatch = productsContent.match(
      /export const products: Product\[\] = (\[[\s\S]*?\]);/
    );
    if (productsMatch) {
      const products = JSON.parse(productsMatch[1]);
      console.log(`✅ Products loaded: ${products.length} items`);
      products.forEach((product, index) => {
        console.log(
          `   ${index + 1}. ${product.title} (${product.id}) - Category: ${
            product.category
          }`
        );
      });
    } else {
      console.log("❌ Could not load products");
    }

    console.log("\n" + "=".repeat(50) + "\n");
    console.log("🎯 Data Summary:");
    console.log(
      `   • Total Services: ${
        servicesMatch ? JSON.parse(servicesMatch[1]).length : 0
      }`
    );
    console.log(
      `   • Total Products: ${
        productsMatch ? JSON.parse(productsMatch[1]).length : 0
      }`
    );
    console.log(
      `   • Total Items: ${
        (servicesMatch ? JSON.parse(servicesMatch[1]).length : 0) +
        (productsMatch ? JSON.parse(productsMatch[1]).length : 0)
      }`
    );
  } catch (error) {
    console.error("❌ Error verifying data:", error.message);
  }
}

verifyData();
