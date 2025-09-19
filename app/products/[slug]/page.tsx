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

export async function generateMetadata({ params }: ProductPageProps) {
  // Decode the URL-encoded slug
  const decodedSlug = decodeURIComponent(params.slug);
  const product = productsData.find((p: any) => p.slug === decodedSlug);

  if (!product) {
    return {
      title: "المنتج غير موجود",
    };
  }

  return {
    title: `${product.title} - منتجات الإسكان الفاخر`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  // Decode the URL-encoded slug
  const decodedSlug = decodeURIComponent(params.slug);
  const product = productsData.find((p: any) => p.slug === decodedSlug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsPage product={product} />;
}
