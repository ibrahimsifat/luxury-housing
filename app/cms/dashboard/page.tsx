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

export default function CMSDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<"services" | "products">(
    "services"
  );
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
    } catch (error) {
      console.error("Error loading data:", error);
      // Ensure arrays are set even on error
      setServices([]);
      setProducts([]);
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
    if (!confirm("Are you sure you want to delete this service?")) return;

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
    if (!confirm("Are you sure you want to delete this product?")) return;

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

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 font-cairo">
                  CMS Dashboard
                </h1>
                <p className="text-sm text-slate-600">
                  Luxury Housing Content Management
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-slate-600 hover:text-slate-900"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ScrollAnimation animation="fadeInUp">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">
                      Total Services
                    </p>
                    <p className="text-3xl font-bold text-blue-900">
                      {Array.isArray(services) ? services.length : 0}
                    </p>
                  </div>
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      Total Products
                    </p>
                    <p className="text-3xl font-bold text-green-900">
                      {Array.isArray(products) ? products.length : 0}
                    </p>
                  </div>
                  <Package className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">
                      Total Items
                    </p>
                    <p className="text-3xl font-bold text-purple-900">
                      {(Array.isArray(services) ? services.length : 0) +
                        (Array.isArray(products) ? products.length : 0)}
                    </p>
                  </div>
                  <Settings className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="border-b border-slate-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab("services")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "services"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <Briefcase className="w-4 h-4 inline mr-2" />
                  Services ({Array.isArray(services) ? services.length : 0})
                </button>
                <button
                  onClick={() => setActiveTab("products")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "products"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <Package className="w-4 h-4 inline mr-2" />
                  Products ({Array.isArray(products) ? products.length : 0})
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Add New Button */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  {activeTab === "services"
                    ? "Services Management"
                    : "Products Management"}
                </h2>
                <Link href={`/cms/${activeTab}/add`}>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New {activeTab === "services" ? "Service" : "Product"}
                  </Button>
                </Link>
              </div>

              {/* Content */}
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-slate-600">Loading...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeTab === "services" ? (
                    !Array.isArray(services) || services.length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        <Briefcase className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                        <p>No services found. Add your first service!</p>
                      </div>
                    ) : (
                      services.map((service) => (
                        <Card
                          key={service.id}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                  {service.title}
                                </h3>
                                <p className="text-slate-600 mb-3 line-clamp-2">
                                  {service.description}
                                </p>
                                <div className="flex items-center space-x-4 text-sm text-slate-500">
                                  <span>ID: {service.id}</span>
                                  <span>Slug: {service.slug}</span>
                                  <span>
                                    Features: {service.features.length}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Link href={`/cms/services/${service.id}`}>
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4 mr-1" />
                                    View
                                  </Button>
                                </Link>
                                <Link href={`/cms/services/${service.id}/edit`}>
                                  <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4 mr-1" />
                                    Edit
                                  </Button>
                                </Link>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteService(service.id)
                                  }
                                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )
                  ) : !Array.isArray(products) || products.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <Package className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                      <p>No products found. Add your first product!</p>
                    </div>
                  ) : (
                    products.map((product) => (
                      <Card
                        key={product.id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                {product.title}
                              </h3>
                              <p className="text-slate-600 mb-3 line-clamp-2">
                                {product.description}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-slate-500">
                                <span>ID: {product.id}</span>
                                <span>Category: {product.category}</span>
                                <span>
                                  Amount: {product.minAmount} -{" "}
                                  {product.maxAmount}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Link
                                href={`/products/${encodeURIComponent(
                                  product.slug
                                )}`}
                              >
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                              </Link>
                              <Link href={`/cms/products/${product.id}/edit`}>
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-700 hover:border-red-300"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
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
