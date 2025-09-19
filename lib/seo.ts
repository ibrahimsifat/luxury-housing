// SEO Configuration and Utilities
export const seoConfig = {
  siteName: "الإسكان الفاخر",
  siteNameEn: "Luxury Housing",
  description:
    "نقدم خدمات التمويل العقاري والاستثمار العقاري في المملكة العربية السعودية مع أفضل الشروط والأسعار",
  descriptionEn:
    "We provide real estate financing and investment services in Saudi Arabia with the best terms and prices",
  url: "https://luxuryhousing.sa",
  logo: "/logo.png",
  keywords: [
    "التمويل العقاري",
    "الاستثمار العقاري",
    "الرهن العقاري",
    "تمويل شراء منزل",
    "تمويل عقاري",
    "real estate financing",
    "mortgage",
    "home loans",
    "property investment",
    "Saudi Arabia",
  ],
  author: "الإسكان الفاخر",
  twitter: "@luxuryhousing",
  facebook: "luxuryhousing.sa",
  linkedin: "luxury-housing-sa",
};

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product" | "service";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

export function generateSEOTags({
  title,
  description = seoConfig.description,
  keywords = seoConfig.keywords,
  image = seoConfig.logo,
  url = seoConfig.url,
  type = "website",
  publishedTime,
  modifiedTime,
  author = seoConfig.author,
  section,
  tags,
  noindex = false,
  nofollow = false,
}: SEOProps = {}) {
  const fullTitle = title
    ? `${title} | ${seoConfig.siteName}`
    : seoConfig.siteName;
  const fullUrl = url.startsWith("http") ? url : `${seoConfig.url}${url}`;
  const fullImage = image.startsWith("http")
    ? image
    : `${seoConfig.url}${image}`;

  const metaTags = [
    // Basic Meta Tags
    { name: "title", content: fullTitle },
    { name: "description", content: description },
    { name: "keywords", content: keywords.join(", ") },
    { name: "author", content: author },
    {
      name: "robots",
      content: `${noindex ? "noindex" : "index"}, ${
        nofollow ? "nofollow" : "follow"
      }`,
    },
    { name: "language", content: "ar" },
    { name: "revisit-after", content: "7 days" },

    // Open Graph Tags
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:image", content: fullImage },
    { property: "og:url", content: fullUrl },
    { property: "og:type", content: type },
    { property: "og:site_name", content: seoConfig.siteName },
    { property: "og:locale", content: "ar_SA" },

    // Twitter Card Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: fullImage },
    { name: "twitter:site", content: seoConfig.twitter },
    { name: "twitter:creator", content: seoConfig.twitter },

    // Additional Meta Tags
    { name: "theme-color", content: "#1e40af" },
    { name: "msapplication-TileColor", content: "#1e40af" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ];

  // Add article-specific tags
  if (type === "article" && publishedTime) {
    metaTags.push(
      { property: "article:published_time", content: publishedTime },
      { property: "article:author", content: author }
    );
    if (modifiedTime) {
      metaTags.push({
        property: "article:modified_time",
        content: modifiedTime,
      });
    }
    if (section) {
      metaTags.push({ property: "article:section", content: section });
    }
    if (tags) {
      tags.forEach((tag) => {
        metaTags.push({ property: "article:tag", content: tag });
      });
    }
  }

  return metaTags;
}

export function generateStructuredData(
  type: "Organization" | "Product" | "Service" | "WebSite" | "BreadcrumbList",
  data: any
) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type,
  };

  switch (type) {
    case "Organization":
      return {
        ...baseStructuredData,
        name: seoConfig.siteName,
        alternateName: seoConfig.siteNameEn,
        description: seoConfig.description,
        url: seoConfig.url,
        logo: `${seoConfig.url}${seoConfig.logo}`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+966-13-123-4567",
          contactType: "customer service",
          availableLanguage: ["Arabic", "English"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "نوفوتيل بزنس بارك، شارع الوليد بن سلامة",
          addressLocality: "الخالدية الشمالية",
          addressRegion: "الدمام",
          postalCode: "32232",
          addressCountry: "SA",
        },
        sameAs: [
          `https://twitter.com/${seoConfig.twitter}`,
          `https://facebook.com/${seoConfig.facebook}`,
          `https://linkedin.com/company/${seoConfig.linkedin}`,
        ],
      };

    case "Product":
      return {
        ...baseStructuredData,
        name: data.title,
        description: data.description,
        image: data.image ? `${seoConfig.url}${data.image}` : undefined,
        brand: {
          "@type": "Brand",
          name: seoConfig.siteName,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "SAR",
          availability: "https://schema.org/InStock",
          price: data.price || "0",
          priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        },
        category: data.category,
        additionalProperty:
          data.features?.map((feature: string) => ({
            "@type": "PropertyValue",
            name: "feature",
            value: feature,
          })) || [],
      };

    case "Service":
      return {
        ...baseStructuredData,
        name: data.title,
        description: data.description,
        provider: {
          "@type": "Organization",
          name: seoConfig.siteName,
          url: seoConfig.url,
        },
        areaServed: {
          "@type": "Country",
          name: "Saudi Arabia",
        },
        serviceType: data.category || "Real Estate Services",
        additionalProperty:
          data.features?.map((feature: string) => ({
            "@type": "PropertyValue",
            name: "feature",
            value: feature,
          })) || [],
      };

    case "WebSite":
      return {
        ...baseStructuredData,
        name: seoConfig.siteName,
        alternateName: seoConfig.siteNameEn,
        url: seoConfig.url,
        description: seoConfig.description,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${seoConfig.url}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      };

    case "BreadcrumbList":
      return {
        ...baseStructuredData,
        itemListElement: data.items.map((item: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };

    default:
      return baseStructuredData;
  }
}
