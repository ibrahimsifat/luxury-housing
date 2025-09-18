// Simple data check script
const fs = require("fs");
const path = require("path");

console.log("🔍 Checking CMS Data Files...\n");

// Check services file
const servicesPath = path.join(__dirname, "../lib/services.ts");
if (fs.existsSync(servicesPath)) {
  const servicesContent = fs.readFileSync(servicesPath, "utf8");
  const serviceMatches = servicesContent.match(/id: "/g);
  const serviceCount = serviceMatches ? serviceMatches.length : 0;
  console.log(`✅ Services file found: ${serviceCount} services`);
} else {
  console.log("❌ Services file not found");
}

// Check products file
const productsPath = path.join(__dirname, "../lib/products.ts");
if (fs.existsSync(productsPath)) {
  const productsContent = fs.readFileSync(productsPath, "utf8");
  const productMatches = productsContent.match(/id: "/g);
  const productCount = productMatches ? productMatches.length : 0;
  console.log(`✅ Products file found: ${productCount} products`);
} else {
  console.log("❌ Products file not found");
}

console.log("\n🎯 Files are ready for CMS!");
