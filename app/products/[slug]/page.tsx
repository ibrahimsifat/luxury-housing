import { ProductDetailsPage } from "@/components/product-details-page";
import productsData from "@/lib/products.json";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return productsData.map((product: any) => ({
    slug: encodeURIComponent(product.slug),
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  // Decode the URL-encoded slug
  const decodedSlug = decodeURIComponent(params.slug);
  const product = productsData.find((p: any) => p.slug === decodedSlug);

  if (!product) {
    return {
      title: "المنتج غير موجود",
      description: "المنتج المطلوب غير موجود في موقعنا",
    };
  }

  const title = `${product.title} - منتجات الإسكان الفاخر`;
  const description =
    product.description ||
    `اكتشف ${product.title} من منتجات الإسكان الفاخر مع أفضل الشروط والأسعار`;
  const keywords = [
    product.title,
    product.category,
    "تمويل عقاري",
    "منتجات عقارية",
    "الإسكان الفاخر",
    ...(product.features || []),
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "product",
      url: `https://luxuryhousing.sa/products/${params.slug}`,
      images: product.image
        ? [
            {
              url: product.image,
              width: 800,
              height: 600,
              alt: product.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.image ? [product.image] : [],
    },
    alternates: {
      canonical: `/products/${params.slug}`,
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  // Decode the URL-encoded slug
  const decodedSlug = decodeURIComponent(params.slug);
  const product = productsData.find((p: any) => p.slug === decodedSlug);

  if (!product) {
    notFound();
  }

  // Generate structured data for the product
  const productStructuredData = generateStructuredData("Product", {
    title: product.title,
    description: product.description,
    image: product.image,
    category: product.category,
    features: product.features,
    price: product.minAmount || "0",
  });

  // Generate breadcrumb structured data
  const breadcrumbStructuredData = generateStructuredData("BreadcrumbList", {
    items: [
      { name: "الرئيسية", url: "https://luxuryhousing.sa" },
      { name: "المنتجات", url: "https://luxuryhousing.sa/products" },
      {
        name: product.title,
        url: `https://luxuryhousing.sa/products/${params.slug}`,
      },
    ],
  });

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <ProductDetailsPage product={product} />
    </>
  );
}
