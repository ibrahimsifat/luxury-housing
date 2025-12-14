import { BlogCard } from "@/components/blog-card";
import { MobileNavigation } from "@/components/mobile-navigation";
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs";
import { Calendar, Eye, User } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogs();
    return blogs.map((blog) => ({
      slug: blog.slug, // Next.js will automatically encode this for URLs
    }));
  } catch (error) {
    // If database connection fails during build, return empty array
    // Pages will be generated on-demand instead
    console.error("Error generating static params for blog pages:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  // Decode URL-encoded slug to handle Arabic characters properly
  // Next.js may already decode it, but we decode it explicitly to be safe
  let decodedSlug = params.slug;
  try {
    decodedSlug = decodeURIComponent(params.slug);
  } catch (e) {
    decodedSlug = params.slug;
  }

  try {
    const blog = await getBlogBySlug(decodedSlug);

    if (!blog) {
      return {
        title: "المقالة غير موجودة",
        description: "المقالة المطلوبة غير موجودة في موقعنا",
      };
    }

    const title = blog.metaTitle || `${blog.title} - مدونة المساكن الفاخرة`;
    const description =
      blog.metaDescription ||
      blog.excerpt ||
      `اقرأ ${blog.title} من مدونة المساكن الفاخرة`;

    return {
      title,
      description,
      keywords: blog.tags || [],
      openGraph: {
        title,
        description,
        type: "article",
        url: `https://luxuryhousing.sa/blog/${encodeURIComponent(params.slug)}`,
        images: blog.featuredImage
          ? [
              {
                url: blog.featuredImage,
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ]
          : [],
        publishedTime: blog.publishedAt
          ? new Date(blog.publishedAt).toISOString()
          : undefined,
        authors: blog.author ? [blog.author] : undefined,
        tags: blog.tags || [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: blog.featuredImage ? [blog.featuredImage] : [],
      },
      alternates: {
        canonical: `/blog/${encodeURIComponent(params.slug)}`,
      },
    };
  } catch (error) {
    // If database connection fails, return default metadata
    console.error("Error generating metadata for blog page:", error);
    return {
      title: "المقالة غير موجودة",
      description: "المقالة المطلوبة غير موجودة في موقعنا",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Decode URL-encoded slug to handle Arabic characters properly
  // Next.js may already decode it, but we decode it explicitly to be safe
  let decodedSlug = params.slug;
  try {
    decodedSlug = decodeURIComponent(params.slug);
  } catch (e) {
    decodedSlug = params.slug;
  }

  try {
    const blog = await getBlogBySlug(decodedSlug);

    if (!blog || blog.status !== "published") {
      notFound();
    }

    // Get related blogs (same tags or recent)
    const allBlogs = await getAllBlogs();
    const relatedBlogs = allBlogs
      .filter(
        (b) =>
          b.id !== blog.id &&
          b.status === "published" &&
          (b.tags?.some((tag) => blog.tags?.includes(tag)) ||
            b.author === blog.author)
      )
      .slice(0, 3);

    const formattedDate = blog.publishedAt
      ? new Date(blog.publishedAt).toLocaleDateString("ar-SA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

    // Generate structured data for the blog post
    const articleStructuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt,
      image: blog.featuredImage || "",
      datePublished: blog.publishedAt
        ? new Date(blog.publishedAt).toISOString()
        : undefined,
      dateModified: blog.updatedAt
        ? new Date(blog.updatedAt).toISOString()
        : undefined,
      author: {
        "@type": "Person",
        name: blog.author || "المساكن الفاخرة",
      },
      publisher: {
        "@type": "Organization",
        name: "المساكن الفاخرة",
        logo: {
          "@type": "ImageObject",
          url: "https://luxuryhousing.sa/images/luxury-housing-logo.png",
        },
      },
      keywords: blog.tags?.join(", ") || "",
    };

    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
        dir="rtl"
      >
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleStructuredData),
          }}
        />

        {/* Hero Section */}
        <section className="relative pt-24 pb-12 bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.3),transparent_50%)]"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 md:pt-24 pt-16">
            <div className="mb-6">
              <Link
                href="/blog"
                className="inline-flex items-center text-purple-200 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                العودة إلى المدونة
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-cairo leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-purple-100">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
              )}
              {formattedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{blog.views || 0} مشاهدة</span>
              </div>
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Featured Image */}
        {blog.featuredImage && (
          <section className="py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-12">
              <div
                className="prose prose-lg max-w-none font-cairo"
                dangerouslySetInnerHTML={{ __html: blog.content }}
                style={{
                  direction: "rtl",
                  textAlign: "right",
                }}
              />
            </article>
          </div>
        </section>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <section className="py-12 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 text-center font-cairo">
                مقالات ذات صلة
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog, index) => (
                  <BlogCard
                    key={relatedBlog.id}
                    blog={relatedBlog}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <MobileNavigation />
      </div>
    );
  } catch (error) {
    // If database connection fails, show not found
    console.error("Error loading blog page:", error);
    notFound();
  }
}
