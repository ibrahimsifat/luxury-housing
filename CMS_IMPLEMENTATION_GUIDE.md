# CMS Implementation Guide

## Complete Content Management System for Next.js Projects

This guide provides a comprehensive overview of implementing a full-featured CMS (Content Management System) similar to the one used in the Luxury Housing project. The CMS includes authentication, content management for products/services, gallery management, and file uploads.

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Authentication System](#authentication-system)
4. [Content Management](#content-management)
5. [Gallery Management](#gallery-management)
6. [File Upload System](#file-upload-system)
7. [API Endpoints](#api-endpoints)
8. [Frontend Components](#frontend-components)
9. [Database Structure](#database-structure)
10. [Implementation Steps](#implementation-steps)
11. [Security Considerations](#security-considerations)
12. [Customization Guide](#customization-guide)

---

## 🎯 System Overview

The CMS provides:

- **Authentication**: Simple login system with localStorage and cookies
- **Product Management**: Full CRUD operations for products
- **Service Management**: Full CRUD operations for services
- **Gallery Management**: Image upload, categorization, and management
- **File Upload**: Secure image upload with validation
- **Responsive Design**: Mobile-first approach with Arabic RTL support
- **Real-time Updates**: Immediate UI updates after operations

---

## 🏗️ Architecture

### Frontend Structure

```
app/cms/
├── page.tsx                 # CMS entry point with routing
├── login/page.tsx          # Authentication page
├── dashboard/page.tsx      # Main dashboard
├── gallery/page.tsx        # Gallery management
├── products/
│   ├── add/page.tsx        # Add new product
│   └── [id]/edit/page.tsx  # Edit existing product
└── services/
    ├── add/page.tsx        # Add new service
    └── [id]/edit/page.tsx  # Edit existing service
```

### API Structure

```
app/api/cms/
├── products/
│   ├── route.ts            # GET, POST operations
│   └── [id]/route.ts       # PUT, DELETE operations
├── services/
│   ├── route.ts            # GET, POST operations
│   └── [id]/route.ts       # PUT, DELETE operations
├── gallery/
│   ├── route.ts            # GET, POST operations
│   └── [id]/route.ts       # PUT, DELETE operations
└── upload/route.ts         # File upload endpoint
```

### Data Storage

```
lib/
├── products.json           # Products data
├── services.json           # Services data
└── gallery.json            # Gallery data

public/uploads/
├── products/               # Product images
├── services/               # Service images
├── gallery/                # Gallery images
└── general/                # General uploads
```

---

## 🔐 Authentication System

### Features

- Simple email/password authentication
- localStorage for client-side persistence
- Cookie-based server-side verification
- Automatic redirect to login if not authenticated
- Logout functionality with cleanup

### Implementation

#### 1. Login Component (`app/cms/login/page.tsx`)

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CMSLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Hard-coded credentials (replace with proper authentication)
    if (email === "admin@example.com" && password === "password123") {
      // Store login state
      localStorage.setItem("cms_logged_in", "true");
      localStorage.setItem(
        "cms_user",
        JSON.stringify({ email, role: "admin" })
      );

      // Set cookie for server-side verification
      document.cookie = "cms_logged_in=true; path=/; max-age=86400"; // 24 hours

      router.push("/cms/dashboard");
    } else {
      setError("Invalid email or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-xl"
      >
        <h1 className="text-2xl font-bold mb-6">CMS Login</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
```

#### 2. Authentication Middleware

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if accessing CMS routes
  if (request.nextUrl.pathname.startsWith("/cms")) {
    const isLoggedIn = request.cookies.get("cms_logged_in")?.value;

    if (!isLoggedIn && request.nextUrl.pathname !== "/cms/login") {
      return NextResponse.redirect(new URL("/cms/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/cms/:path*",
};
```

---

## 📦 Content Management

### Product Management

#### 1. Product Data Structure

```typescript
interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  detailedDescription: string;
  category: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
  requirements: string[];
  eligibility: string[];
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  minAmount: string;
  maxAmount: string;
  duration: string;
  interestRate: string;
  processingTime: string;
  badge: string;
  gradient: string;
}
```

#### 2. Product API Endpoints

**GET /api/cms/products** - Fetch all products

```typescript
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

const PRODUCTS_FILE = path.join(process.cwd(), "lib", "products.json");

export async function GET() {
  try {
    const fileContent = await fs.readFile(PRODUCTS_FILE, "utf8");
    const products = JSON.parse(fileContent);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read products" },
      { status: 500 }
    );
  }
}
```

**POST /api/cms/products** - Add new product

```typescript
export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();

    // Read current products
    const fileContent = await fs.readFile(PRODUCTS_FILE, "utf8");
    const products = JSON.parse(fileContent);

    // Add new product
    const newProduct = {
      id: productData.id || `product-${Date.now()}`,
      slug:
        productData.slug ||
        productData.title.toLowerCase().replace(/\s+/g, "-"),
      ...productData,
    };

    products.push(newProduct);

    // Update the JSON file
    await fs.writeFile(
      PRODUCTS_FILE,
      JSON.stringify(products, null, 2),
      "utf8"
    );

    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
```

#### 3. Product Form Component

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    category: "residential",
    icon: "",
    image: "",
    features: [""],
    benefits: [""],
    requirements: [""],
    process: [{ step: 1, title: "", description: "" }],
    faq: [{ question: "", answer: "" }],
    minAmount: "",
    maxAmount: "",
    duration: "",
    interestRate: "",
    processingTime: "",
    eligibility: [""],
    badge: "",
    gradient: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item: any, i: number) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const productData = {
        ...formData,
        slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
        id: `product-${Date.now()}`,
        features: formData.features.filter((f) => f.trim() !== ""),
        benefits: formData.benefits.filter((b) => b.trim() !== ""),
        requirements: formData.requirements.filter((r) => r.trim() !== ""),
        eligibility: formData.eligibility.filter((e) => e.trim() !== ""),
        process: formData.process.filter(
          (p) => p.title.trim() !== "" && p.description.trim() !== ""
        ),
        faq: formData.faq.filter(
          (f) => f.question.trim() !== "" && f.answer.trim() !== ""
        ),
      };

      const response = await fetch("/api/cms/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        router.push("/cms/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create product");
      }
    } catch (error) {
      setError("An error occurred while creating the product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2"
                >
                  Product Title *
                </label>
                <input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium mb-2"
                >
                  Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="financial">Financial</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Features</h2>

            <div className="space-y-4">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    value={feature}
                    onChange={(e) =>
                      handleArrayChange("features", index, e.target.value)
                    }
                    placeholder="Enter feature"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("features", index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addArrayItem("features")}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400"
              >
                Add Feature
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push("/cms/dashboard")}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

---

## 🖼️ Gallery Management

### Features

- Image upload with drag & drop
- Categorization (business, offers, branch)
- Search and filtering
- Grid and list view modes
- Featured image marking
- Bulk operations

### Implementation

#### 1. Gallery Data Structure

```typescript
interface GalleryImage {
  id: string;
  title: string;
  description: string;
  category: "business" | "offers" | "branch";
  image: string;
  alt: string;
  featured: boolean;
  uploadDate: string;
}
```

#### 2. Gallery API Endpoints

**GET /api/cms/gallery** - Fetch all gallery images

```typescript
import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

const GALLERY_FILE = path.join(process.cwd(), "lib", "gallery.json");

export async function GET() {
  try {
    const fileContent = await fs.readFile(GALLERY_FILE, "utf8");
    const galleryData = JSON.parse(fileContent);
    return NextResponse.json(galleryData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read gallery" },
      { status: 500 }
    );
  }
}
```

**POST /api/cms/gallery** - Add new gallery image

```typescript
export async function POST(request: NextRequest) {
  try {
    const imageData = await request.json();

    // Read current gallery
    const fileContent = await fs.readFile(GALLERY_FILE, "utf8");
    const galleryData = JSON.parse(fileContent);

    // Add new image
    const newImage = {
      id: `gallery-${Date.now()}`,
      uploadDate: new Date().toISOString(),
      ...imageData,
    };

    galleryData.images = galleryData.images || [];
    galleryData.images.push(newImage);

    // Update the JSON file
    await fs.writeFile(
      GALLERY_FILE,
      JSON.stringify(galleryData, null, 2),
      "utf8"
    );

    return NextResponse.json(newImage);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}
```

---

## 📁 File Upload System

### Features

- Secure file upload with validation
- Image type validation (JPEG, PNG, WebP, GIF)
- Organized file storage by type
- Unique filename generation
- Public URL generation

### Implementation

#### Upload API Endpoint (`app/api/cms/upload/route.ts`)

```typescript
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = (formData.get("type") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads", type);
    await mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const fileName = `${timestamp}${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/${type}/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: fileName,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
```

#### Frontend Upload Component

```typescript
const handleImageUpload = async () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "gallery");

      const response = await fetch("/api/cms/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        alert("Error uploading image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    }
  };

  input.click();
};
```

---

## 🎨 Frontend Components

### Dashboard Component

```typescript
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
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
      setServices([]);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cms_logged_in");
    localStorage.removeItem("cms_user");
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
          prevServices.filter((service) => service.id !== id)
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
          prevProducts.filter((product) => product.id !== id)
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Content Management System
              </h1>
              <p className="text-sm text-gray-600">
                Manage your website content
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Total Services
                </p>
                <p className="text-3xl font-bold text-blue-900">
                  {services.length}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">
                  Total Products
                </p>
                <p className="text-3xl font-bold text-green-900">
                  {products.length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("services")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "services"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Services ({services.length})
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "products"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Products ({products.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Add New Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {activeTab === "services"
                  ? "Manage Services"
                  : "Manage Products"}
              </h2>
              <a
                href={`/cms/${activeTab}/add`}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
              >
                Add New {activeTab === "services" ? "Service" : "Product"}
              </a>
            </div>

            {/* Content */}
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeTab === "services" ? (
                  services.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No services found. Add your first service!</p>
                    </div>
                  ) : (
                    services.map((service) => (
                      <div
                        key={service.id}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {service.title}
                            </h3>
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {service.description}
                            </p>
                            <div className="text-sm text-gray-500">
                              ID: {service.id}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <a
                              href={`/services/${service.id}`}
                              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                              View
                            </a>
                            <a
                              href={`/cms/services/${service.id}/edit`}
                              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                              Edit
                            </a>
                            <button
                              onClick={() => handleDeleteService(service.id)}
                              className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                ) : products.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No products found. Add your first product!</p>
                  </div>
                ) : (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {product.title}
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="text-sm text-gray-500">
                            ID: {product.id} | Category: {product.category}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <a
                            href={`/products/${product.slug}`}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            View
                          </a>
                          <a
                            href={`/cms/products/${product.id}/edit`}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            Edit
                          </a>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🗄️ Database Structure

### JSON File Structure

#### products.json

```json
[
  {
    "id": "product-1234567890",
    "slug": "residential-financing",
    "title": "Residential Financing",
    "description": "Complete financing solutions for residential properties",
    "detailedDescription": "Our residential financing program offers competitive rates and flexible terms...",
    "category": "residential",
    "icon": "HiHome",
    "image": "/uploads/products/1234567890.jpg",
    "features": [
      "Competitive interest rates",
      "Flexible payment terms",
      "Quick approval process"
    ],
    "benefits": [
      "Lower monthly payments",
      "Tax benefits",
      "Build equity over time"
    ],
    "requirements": [
      "Minimum income: $50,000",
      "Good credit score",
      "Down payment: 20%"
    ],
    "eligibility": [
      "US citizen or permanent resident",
      "Stable employment",
      "No recent bankruptcies"
    ],
    "process": [
      {
        "step": 1,
        "title": "Application",
        "description": "Submit your application with required documents"
      },
      {
        "step": 2,
        "title": "Review",
        "description": "We review your application and credit history"
      },
      {
        "step": 3,
        "title": "Approval",
        "description": "Receive approval and finalize terms"
      }
    ],
    "faq": [
      {
        "question": "What is the minimum down payment?",
        "answer": "The minimum down payment is 20% of the property value."
      }
    ],
    "minAmount": "$100,000",
    "maxAmount": "$2,000,000",
    "duration": "Up to 30 years",
    "interestRate": "From 3.5%",
    "processingTime": "5-7 business days",
    "badge": "Popular Choice",
    "gradient": "from-blue-500/20 via-cyan-500/20 to-blue-600/20"
  }
]
```

#### services.json

```json
[
  {
    "id": "service-1234567890",
    "slug": "financial-consultation",
    "title": "Financial Consultation",
    "description": "Expert financial advice for your property investment",
    "detailedDescription": "Our certified financial advisors provide personalized consultation...",
    "icon": "CreditCard",
    "features": ["Personalized advice", "Market analysis", "Risk assessment"],
    "benefits": [
      "Better investment decisions",
      "Risk mitigation",
      "Optimized returns"
    ],
    "requirements": [
      "Initial consultation",
      "Financial documents",
      "Investment goals"
    ],
    "process": [
      "Schedule consultation",
      "Provide financial information",
      "Receive personalized advice",
      "Implement recommendations"
    ],
    "faq": [
      {
        "question": "How long does a consultation take?",
        "answer": "A typical consultation takes 1-2 hours."
      }
    ],
    "gradient": "from-green-500/20 via-emerald-500/20 to-teal-600/20",
    "iconBg": "bg-gradient-to-br from-green-500 to-emerald-600",
    "accentColor": "border-green-500/30"
  }
]
```

#### gallery.json

```json
{
  "images": [
    {
      "id": "gallery-1234567890",
      "title": "Modern Office Building",
      "description": "Our state-of-the-art office building",
      "category": "business",
      "image": "/uploads/gallery/1234567890.jpg",
      "alt": "Modern office building exterior",
      "featured": true,
      "uploadDate": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

## 🚀 Implementation Steps

### Step 1: Project Setup

1. Create a new Next.js project:

   ```bash
   npx create-next-app@latest my-cms-project
   cd my-cms-project
   ```

2. Install required dependencies:

   ```bash
   npm install lucide-react framer-motion
   ```

3. Set up the project structure:

   ```
   app/
   ├── cms/
   │   ├── page.tsx
   │   ├── login/page.tsx
   │   ├── dashboard/page.tsx
   │   ├── gallery/page.tsx
   │   ├── products/
   │   │   ├── add/page.tsx
   │   │   └── [id]/edit/page.tsx
   │   └── services/
   │       ├── add/page.tsx
   │       └── [id]/edit/page.tsx
   └── api/cms/
       ├── products/
       │   ├── route.ts
       │   └── [id]/route.ts
       ├── services/
       │   ├── route.ts
       │   └── [id]/route.ts
       ├── gallery/
       │   ├── route.ts
       │   └── [id]/route.ts
       └── upload/route.ts

   lib/
   ├── products.json
   ├── services.json
   └── gallery.json

   public/uploads/
   ├── products/
   ├── services/
   ├── gallery/
   └── general/
   ```

### Step 2: Create Data Files

1. Create the JSON data files in the `lib/` directory
2. Initialize with empty arrays or sample data
3. Set up the upload directories in `public/uploads/`

### Step 3: Implement Authentication

1. Create the login page with form handling
2. Implement localStorage and cookie management
3. Add authentication middleware
4. Create logout functionality

### Step 4: Build API Endpoints

1. Implement CRUD operations for products
2. Implement CRUD operations for services
3. Implement gallery management
4. Create file upload endpoint

### Step 5: Create Frontend Components

1. Build the dashboard with statistics
2. Create forms for adding/editing content
3. Implement gallery management interface
4. Add responsive design and animations

### Step 6: Add Security Features

1. Implement input validation
2. Add file type validation
3. Set up proper error handling
4. Add rate limiting (optional)

### Step 7: Testing and Deployment

1. Test all CRUD operations
2. Test file upload functionality
3. Test authentication flow
4. Deploy to production

---

## 🔒 Security Considerations

### Authentication Security

- Use proper password hashing (bcrypt)
- Implement JWT tokens for better security
- Add session management
- Implement role-based access control

### File Upload Security

- Validate file types and sizes
- Scan uploaded files for malware
- Implement file size limits
- Use secure file storage (AWS S3, etc.)

### Input Validation

- Sanitize all user inputs
- Validate data types and formats
- Implement CSRF protection
- Use proper error handling

### API Security

- Implement rate limiting
- Add request validation
- Use HTTPS in production
- Implement proper CORS policies

---

## 🎨 Customization Guide

### Styling

- Modify Tailwind CSS classes for different themes
- Update color schemes in the gradient configurations
- Customize component layouts and spacing
- Add custom animations and transitions

### Data Structure

- Add new fields to product/service interfaces
- Create new content types (blog posts, testimonials, etc.)
- Implement custom categories and tags
- Add metadata fields for SEO

### Functionality

- Add bulk operations (delete multiple items)
- Implement content scheduling
- Add content versioning
- Create content templates

### Integration

- Connect to external databases (PostgreSQL, MongoDB)
- Integrate with cloud storage services
- Add email notifications
- Implement content publishing workflows

---

## 📝 Conclusion

This CMS implementation provides a solid foundation for managing content in Next.js applications. The system is designed to be:

- **Modular**: Easy to extend with new content types
- **Responsive**: Works on all device sizes
- **Secure**: Includes basic security measures
- **User-friendly**: Intuitive interface for content management
- **Scalable**: Can be extended to handle larger datasets

The JSON-based storage makes it easy to get started, while the modular architecture allows for easy migration to more robust database solutions as your needs grow.

For production use, consider implementing:

- Database integration (PostgreSQL, MongoDB)
- User management with roles and permissions
- Content versioning and history
- Advanced search and filtering
- Content scheduling and publishing workflows
- Analytics and reporting features

This guide provides everything needed to implement a fully functional CMS system that can be customized to meet specific project requirements.
