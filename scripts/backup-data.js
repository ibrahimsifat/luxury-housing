// Backup script for services and products data
const fs = require("fs");
const path = require("path");

const servicesFile = path.join(__dirname, "../lib/services.ts");
const productsFile = path.join(__dirname, "../lib/products.ts");
const backupDir = path.join(__dirname, "../backups");

// Create backup directory if it doesn't exist
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Create timestamp
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

// Backup services
if (fs.existsSync(servicesFile)) {
  const servicesContent = fs.readFileSync(servicesFile, "utf8");
  fs.writeFileSync(
    path.join(backupDir, `services-${timestamp}.ts`),
    servicesContent
  );
  console.log("✅ Services backed up");
}

// Backup products
if (fs.existsSync(productsFile)) {
  const productsContent = fs.readFileSync(productsFile, "utf8");
  fs.writeFileSync(
    path.join(backupDir, `products-${timestamp}.ts`),
    productsContent
  );
  console.log("✅ Products backed up");
}

console.log("🎯 Backup completed successfully!");
