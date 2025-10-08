// Simple script to add sample clients using the existing API
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

async function addSampleClients() {
  const baseUrl = "http://localhost:3000";

  console.log("Adding sample clients to the database...");

  for (const client of sampleClients) {
    try {
      const response = await fetch(`${baseUrl}/api/cms/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Added client: ${client.name}`);
      } else {
        const error = await response.json();
        console.log(`❌ Failed to add client ${client.name}:`, error.error);
      }
    } catch (error) {
      console.log(`❌ Error adding client ${client.name}:`, error.message);
    }
  }

  console.log("Sample clients migration completed!");
}

// Run the migration
addSampleClients();
