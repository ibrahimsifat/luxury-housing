"use client";

import { ScrollAnimation } from "@/components/scroll-animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Edit,
  Eye,
  LogOut,
  Package,
  Plus,
  Settings,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  gradient: string;
  iconBg: string;
  accentColor: string;
  detailedDescription: string;
  benefits: string[];
  requirements: string[];
  process: string[];
  faq: Array<{ question: string; answer: string }>;
}

interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  features: string[];
  badge: string;
  gradient: string;
  detailedDescription: string;
  benefits: string[];
  requirements: string[];
  process: Array<{ step: number; title: string; description: string }>;
  faq: Array<{ question: string; answer: string }>;
  minAmount: string;
  maxAmount: string;
  duration: string;
  interestRate: string;
  processingTime: string;
  eligibility: string[];
}

interface Client {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  category?: string;
  featured: boolean;
  order: number;
}

export default function CMSDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<
    "services" | "products" | "clients" | "blogs"
  >("services");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("cms_logged_in");
    if (!loggedIn) {
      router.push("/cms/login");
      return;
    }

    setIsLoggedIn(true);
    loadData();
  }, [router]);

  const loadData = async () => {
    try {
      // Load services
      const servicesResponse = await fetch("/api/cms/services");
      const servicesData = await servicesResponse.json();
      setServices(Array.isArray(servicesData) ? servicesData : []);

      // Load products
      const productsResponse = await fetch("/api/cms/products");
      const productsData = await productsResponse.json();
      setProducts(Array.isArray(productsData) ? productsData : []);

      // Load clients
      const clientsResponse = await fetch("/api/cms/clients");
      const clientsData = await clientsResponse.json();
      setClients(Array.isArray(clientsData) ? clientsData : []);

      // Load blogs
      const blogsResponse = await fetch("/api/cms/blogs");
      const blogsData = await blogsResponse.json();
      setBlogs(Array.isArray(blogsData) ? blogsData : []);
    } catch (error) {
      console.error("Error loading data:", error);
      // Ensure arrays are set even on error
      setServices([]);
      setProducts([]);
      setClients([]);
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cms_logged_in");
    localStorage.removeItem("cms_user");
    // Clear cookie
    document.cookie =
      "cms_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/cms/login");
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return;

    try {
      const response = await fetch(`/api/cms/services/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setServices((prevServices) =>
          Array.isArray(prevServices)
            ? prevServices.filter((service) => service.id !== id)
            : []
        );
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;

    try {
      const response = await fetch(`/api/cms/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          Array.isArray(prevProducts)
            ? prevProducts.filter((product) => product.id !== id)
            : []
        );
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا العميل؟")) return;

    try {
      const response = await fetch(`/api/cms/clients/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setClients((prevClients) =>
          Array.isArray(prevClients)
            ? prevClients.filter((client) => client.id !== id)
            : []
        );
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  if (!isLoggedIn) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-0 sm:h-16 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 font-cairo">
                  لوحة تحكم إدارة المحتوى
                </h1>
                <p className="text-xs sm:text-sm text-slate-600">
                  إدارة محتوى المساكن الفاخرة
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-slate-600 hover:text-slate-900 text-sm px-3 py-2"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
              <span className="sm:hidden">خروج</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <ScrollAnimation animation="fadeInUp">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-blue-600">
                      إجمالي الخدمات
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-900">
                      {Array.isArray(services) ? services.length : 0}
                    </p>
                  </div>
                  <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-green-600">
                      إجمالي المنتجات
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-900">
                      {Array.isArray(products) ? products.length : 0}
                    </p>
                  </div>
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-purple-600">
                      إجمالي العملاء
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-purple-900">
                      {Array.isArray(clients) ? clients.length : 0}
                    </p>
                  </div>
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-orange-600">
                      إجمالي العناصر
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-orange-900">
                      {(Array.isArray(services) ? services.length : 0) +
                        (Array.isArray(products) ? products.length : 0) +
                        (Array.isArray(clients) ? clients.length : 0) +
                        (Array.isArray(blogs) ? blogs.length : 0)}
                    </p>
                  </div>
                  <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            {/* Blog Management Card */}
            <Link href="/cms/blogs">
              <Card className="bg-gradient-to-r from-purple-50 to-pink-100 border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-purple-600">
                        إجمالي المقالات
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-purple-900">
                        {Array.isArray(blogs) ? blogs.length : 0}
                      </p>
                    </div>
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Gallery Management Card */}
            <Link href="/cms/gallery">
              <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-green-600">
                        معرض الصور
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-green-900">
                        إدارة
                      </p>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 text-green-600">
                      <svg
                        className="w-full h-full"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-lg mb-6 sm:mb-8">
            <div className="border-b border-slate-200">
              <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("services")}
                  className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === "services"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">
                    الخدمات ({Array.isArray(services) ? services.length : 0})
                  </span>
                  <span className="sm:hidden">الخدمات</span>
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === "products"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <Package className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">
                    المنتجات ({Array.isArray(products) ? products.length : 0})
                  </span>
                  <span className="sm:hidden">المنتجات</span>
                </button>
                <button
                  onClick={() => setActiveTab("clients")}
                  className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === "clients"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">
                    العملاء ({Array.isArray(clients) ? clients.length : 0})
                  </span>
                  <span className="sm:hidden">العملاء</span>
                </button>
                <Link href="/cms/blogs">
                  <button
                    className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                      activeTab === "blogs"
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span className="hidden sm:inline">
                      المدونة ({Array.isArray(blogs) ? blogs.length : 0})
                    </span>
                    <span className="sm:hidden">المدونة</span>
                  </button>
                </Link>
              </nav>
            </div>

            <div className="p-4 sm:p-6">
              {/* Add New Button */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                  {activeTab === "services"
                    ? "إدارة الخدمات"
                    : activeTab === "products"
                    ? "إدارة المنتجات"
                    : activeTab === "blogs"
                    ? "إدارة المدونة"
                    : "إدارة العملاء"}
                </h2>
                {activeTab !== "blogs" && (
                  <Link
                    href={`/cms/${activeTab}/add`}
                    className="w-full sm:w-auto"
                  >
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-sm">
                      <Plus className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">
                        إضافة{" "}
                        {activeTab === "services"
                          ? "خدمة جديدة"
                          : activeTab === "products"
                          ? "منتج جديد"
                          : "عميل جديد"}
                      </span>
                      <span className="sm:hidden">
                        إضافة{" "}
                        {activeTab === "services"
                          ? "خدمة"
                          : activeTab === "products"
                          ? "منتج"
                          : "عميل"}
                      </span>
                    </Button>
                  </Link>
                )}
                {activeTab === "blogs" && (
                  <Link href="/cms/blogs" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm">
                      <Plus className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">إدارة المدونة</span>
                      <span className="sm:hidden">المدونة</span>
                    </Button>
                  </Link>
                )}
              </div>

              {/* Content */}
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-slate-600">جاري التحميل...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeTab === "services" ? (
                    !Array.isArray(services) || services.length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        <Briefcase className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                        <p>لم يتم العثور على خدمات. أضف خدمتك الأولى!</p>
                      </div>
                    ) : (
                      services.map((service) => (
                        <Card
                          key={service.id}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                              <div className="flex-1 w-full sm:w-auto">
                                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
                                  {service.title}
                                </h3>
                                <p className="text-sm sm:text-base text-slate-600 mb-3 line-clamp-2">
                                  {service.description}
                                </p>
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-slate-500">
                                  <span>المعرف: {service.id}</span>
                                  <span className="hidden sm:inline">
                                    الرابط: {service.slug}
                                  </span>
                                  <span>
                                    الميزات: {service.features.length}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 w-full sm:w-auto">
                                <Link
                                  href={`/services/${service.id}`}
                                  className="flex-1 sm:flex-none"
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full sm:w-auto text-xs"
                                  >
                                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                    <span className="hidden sm:inline">
                                      عرض
                                    </span>
                                  </Button>
                                </Link>
                                <Link
                                  href={`/cms/services/${service.id}/edit`}
                                  className="flex-1 sm:flex-none"
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full sm:w-auto text-xs"
                                  >
                                    <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                    <span className="hidden sm:inline">
                                      تعديل
                                    </span>
                                  </Button>
                                </Link>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteService(service.id)
                                  }
                                  className="flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:border-red-300 w-full sm:w-auto text-xs"
                                >
                                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  <span className="hidden sm:inline">حذف</span>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )
                  ) : activeTab === "products" ? (
                    !Array.isArray(products) || products.length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        <Package className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                        <p>لم يتم العثور على منتجات. أضف منتجك الأول!</p>
                      </div>
                    ) : (
                      products.map((product) => (
                        <Card
                          key={product.id}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                              <div className="flex-1 w-full sm:w-auto">
                                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
                                  {product.title}
                                </h3>
                                <p className="text-sm sm:text-base text-slate-600 mb-3 line-clamp-2">
                                  {product.description}
                                </p>
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-slate-500">
                                  <span>المعرف: {product.id}</span>
                                  <span>الفئة: {product.category}</span>
                                  <span className="hidden sm:inline">
                                    المبلغ: {product.minAmount} -{" "}
                                    {product.maxAmount}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 w-full sm:w-auto">
                                <Link
                                  href={`/products/${encodeURIComponent(
                                    product.slug
                                  )}`}
                                  className="flex-1 sm:flex-none"
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full sm:w-auto text-xs"
                                  >
                                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                    <span className="hidden sm:inline">
                                      عرض
                                    </span>
                                  </Button>
                                </Link>
                                <Link
                                  href={`/cms/products/${product.id}/edit`}
                                  className="flex-1 sm:flex-none"
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full sm:w-auto text-xs"
                                  >
                                    <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                    <span className="hidden sm:inline">
                                      تعديل
                                    </span>
                                  </Button>
                                </Link>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteProduct(product.id)
                                  }
                                  className="flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:border-red-300 w-full sm:w-auto text-xs"
                                >
                                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  <span className="hidden sm:inline">حذف</span>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )
                  ) : !Array.isArray(clients) || clients.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <Users className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                      <p>لم يتم العثور على عملاء. أضف عميلك الأول!</p>
                    </div>
                  ) : (
                    clients.map((client) => (
                      <Card
                        key={client.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                            <div className="flex items-center space-x-4 flex-1 w-full sm:w-auto">
                              <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                <img
                                  src={client.logo}
                                  alt={client.name}
                                  className="w-10 h-10 object-contain"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                                  {client.name}
                                </h3>
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-slate-500">
                                  <span>المعرف: {client.id}</span>
                                  {client.category && (
                                    <span>الفئة: {client.category}</span>
                                  )}
                                  <span>الترتيب: {client.order}</span>
                                  {client.featured && (
                                    <span className="text-blue-600 font-medium">
                                      مميز
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 w-full sm:w-auto">
                              <Link
                                href={`/clients`}
                                className="flex-1 sm:flex-none"
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full sm:w-auto text-xs"
                                >
                                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  <span className="hidden sm:inline">عرض</span>
                                </Button>
                              </Link>
                              <Link
                                href={`/cms/clients/${client.id}/edit`}
                                className="flex-1 sm:flex-none"
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full sm:w-auto text-xs"
                                >
                                  <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  <span className="hidden sm:inline">
                                    تعديل
                                  </span>
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteClient(client.id)}
                                className="flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:border-red-300 w-full sm:w-auto text-xs"
                              >
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                <span className="hidden sm:inline">حذف</span>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
