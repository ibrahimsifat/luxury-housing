import { ProductDetailsPage } from "@/components/product-details-page";
import { getAllProducts } from "@/lib/cms-data";
import { generateStructuredData } from "@/lib/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    slug: string; // This will now be the id
  };
}

export async function generateStaticParams() {
  try {
    const productsData = await getAllProducts();
    return productsData.map((product: any) => ({
      slug: product.slug ? decodeURIComponent(product.slug) : product.id,
    }));
  } catch (error) {
    // If database connection fails during build, return empty array
    // Pages will be generated on-demand instead
    console.error("Error generating static params for product pages:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  try {
    // Find product by slug or id
    const productsData = await getAllProducts();
    const product = productsData.find(
      (p: any) =>
        p.slug === params.slug ||
        p.id === params.slug ||
        p.slug === encodeURIComponent(params.slug) ||
        p.slug === decodeURIComponent(params.slug)
    );

    if (!product) {
      return {
        title: "المنتج غير موجود",
        description: "المنتج المطلوب غير موجود في موقعنا",
      };
    }

    const title = `${product.title} - منتجات المساكن الفاخرة`;
    const description =
      product.description ||
      `اكتشف ${product.title} من منتجات المساكن الفاخرة مع أفضل الشروط والأسعار`;
    const keywords = [
      product.title,
      product.category,
      "تمويل عقاري",
      "منتجات عقارية",
      "المساكن الفاخرة",
      ...(product.features || []),
    ];

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        type: "website",
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
  } catch (error) {
    // If database connection fails, return default metadata
    console.error("Error generating metadata for product page:", error);
    return {
      title: "المنتج غير موجود",
      description: "المنتج المطلوب غير موجود في موقعنا",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    // Find product by slug or id
    const productsData = await getAllProducts();
    const product = productsData.find(
      (p: any) =>
        p.slug === params.slug ||
        p.id === params.slug ||
        p.slug === encodeURIComponent(params.slug) ||
        p.slug === decodeURIComponent(params.slug)
    );

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
  } catch (error) {
    // If database connection fails, show not found
    console.error("Error loading product page:", error);
    notFound();
  }
}
