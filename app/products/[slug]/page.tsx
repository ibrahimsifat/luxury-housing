import { notFound } from "next/navigation"
import { getProductBySlug, getAllProducts } from "@/lib/products"
import { ProductDetailsPage } from "@/components/product-details-page"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return {
      title: "المنتج غير موجود",
    }
  }

  return {
    title: `${product.title} - منتجات الإسكان الفاخر`,
    description: product.description,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailsPage product={product} />
}
