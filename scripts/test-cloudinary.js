// Test script to verify Cloudinary configuration
// Run with: node scripts/test-cloudinary.js

require('dotenv').config({ path: '.env.local' });

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testCloudinary() {
  console.log('🧪 Testing Cloudinary Configuration...\n');

  // Check if environment variables are set
  const requiredVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\nPlease add these to your .env.local file');
    return;
  }

  console.log('✅ Environment variables are set');
  console.log(`   Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
  console.log(`   API Key: ${process.env.CLOUDINARY_API_KEY.substring(0, 8)}...`);
  console.log(`   API Secret: ${process.env.CLOUDINARY_API_SECRET.substring(0, 8)}...\n`);

  try {
    // Test API connection
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary API connection successful');
    console.log(`   Status: ${result.status}\n`);

    // Test folder creation (this will create the folder if it doesn't exist)
    console.log('📁 Testing folder structure...');
    const folders = ['luxury-housing', 'luxury-housing/products', 'luxury-housing/services', 'luxury-housing/gallery'];
    
    for (const folder of folders) {
      try {
        await cloudinary.api.create_folder(folder);
        console.log(`   ✅ Folder created/verified: ${folder}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`   ✅ Folder already exists: ${folder}`);
        } else {
          console.log(`   ⚠️  Folder issue: ${folder} - ${error.message}`);
        }
      }
    }

    console.log('\n🎉 Cloudinary setup is working correctly!');
    console.log('You can now upload images to your CMS.');

  } catch (error) {
    console.error('❌ Cloudinary API connection failed:');
    console.error(`   Error: ${error.message}`);
    console.error('\nPlease check your credentials and try again.');
  }
}

testCloudinary();
