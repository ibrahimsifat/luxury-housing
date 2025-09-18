// Data verification script to check all services and products
import { products } from "../lib/products.js";
import { services } from "../lib/services.js";

console.log("🔍 Verifying CMS Data...\n");

console.log(`✅ Services loaded: ${services.length} items`);
services.forEach((service, index) => {
  console.log(`   ${index + 1}. ${service.title} (${service.id})`);
});

console.log("\n" + "=".repeat(50) + "\n");

console.log(`✅ Products loaded: ${products.length} items`);
products.forEach((product, index) => {
  console.log(
    `   ${index + 1}. ${product.title} (${product.id}) - Category: ${
      product.category
    }`
  );
});

console.log("\n" + "=".repeat(50) + "\n");
console.log("🎯 Data Summary:");
console.log(`   • Total Services: ${services.length}`);
console.log(`   • Total Products: ${products.length}`);
console.log(`   • Total Items: ${services.length + products.length}`);

console.log("\n✅ All data loaded successfully!");
