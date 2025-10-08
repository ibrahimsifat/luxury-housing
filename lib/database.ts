import { Document, ObjectId } from "mongodb";
import { getDatabase } from "./mongodb";
import { Client, GalleryImage, Product, Service } from "./types";

// Utility function to convert MongoDB documents to plain objects
function convertToPlainObject<T>(doc: any): T {
  if (!doc) return doc;

  const plain = { ...doc };
  if (plain._id && plain._id.toString) {
    plain._id = plain._id.toString();
  }
  return plain as T;
}

function convertArrayToPlainObjects<T>(docs: any[]): T[] {
  return docs.map(convertToPlainObject<T>);
}

// Database collections
export const COLLECTIONS = {
  PRODUCTS: "products",
  SERVICES: "services",
  GALLERY: "gallery",
  CLIENTS: "clients",
} as const;

// Generic database operations
export class DatabaseService<T extends Document> {
  constructor(private collectionName: string) {}

  protected async getCollection() {
    const db = await getDatabase();
    return db.collection<T>(this.collectionName);
  }

  async findAll(): Promise<T[]> {
    const collection = await this.getCollection();
    const results = await collection.find({}).toArray();
    return convertArrayToPlainObjects<T>(results);
  }

  async findById(id: string): Promise<T | null> {
    const collection = await this.getCollection();
    // Try to find by custom id field first, then by MongoDB _id
    let result = await collection.findOne({ id: id } as any);
    if (!result && ObjectId.isValid(id)) {
      result = await collection.findOne({ _id: new ObjectId(id) } as any);
    }
    return convertToPlainObject<T>(result);
  }

  async findBySlug(slug: string): Promise<T | null> {
    const collection = await this.getCollection();
    const result = await collection.findOne({ slug } as any);
    return convertToPlainObject<T>(result);
  }

  async create(data: Omit<T, "_id">): Promise<T> {
    const collection = await this.getCollection();
    const result = await collection.insertOne(data as any);
    return { ...data, _id: result.insertedId.toString() } as unknown as T;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const collection = await this.getCollection();
    // Try to update by custom id field first, then by MongoDB _id
    let result = await collection.findOneAndUpdate(
      { id: id } as any,
      { $set: data },
      { returnDocument: "after" }
    );
    if (!result && ObjectId.isValid(id)) {
      result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) } as any,
        { $set: data },
        { returnDocument: "after" }
      );
    }
    return convertToPlainObject<T>(result);
  }

  async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    // Try to delete by custom id field first, then by MongoDB _id
    let result = await collection.deleteOne({ id: id } as any);
    if (result.deletedCount === 0 && ObjectId.isValid(id)) {
      result = await collection.deleteOne({ _id: new ObjectId(id) } as any);
    }
    return result.deletedCount > 0;
  }

  async findByCategory(category: string): Promise<T[]> {
    const collection = await this.getCollection();
    const results = await collection.find({ category } as any).toArray();
    return convertArrayToPlainObjects<T>(results);
  }

  async findFeatured(): Promise<T[]> {
    const collection = await this.getCollection();
    const results = await collection.find({ featured: true } as any).toArray();
    return convertArrayToPlainObjects<T>(results);
  }

  async search(query: string): Promise<T[]> {
    const collection = await this.getCollection();
    const results = await collection
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { detailedDescription: { $regex: query, $options: "i" } },
        ],
      } as any)
      .toArray();
    return convertArrayToPlainObjects<T>(results);
  }
}

// Specific services for each data type
export const productService = new DatabaseService<Product>(
  COLLECTIONS.PRODUCTS
);
export const serviceService = new DatabaseService<Service>(
  COLLECTIONS.SERVICES
);
export const galleryService = new DatabaseService<GalleryImage>(
  COLLECTIONS.GALLERY
);

// Extended services with specific methods
export class ProductService extends DatabaseService<Product> {
  constructor() {
    super(COLLECTIONS.PRODUCTS);
  }

  async findByCategory(category: string): Promise<Product[]> {
    const collection = await this.getCollection();
    const results = await collection.find({ category }).toArray();
    return convertArrayToPlainObjects<Product>(results);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const collection = await this.getCollection();
    const results = await collection.find({ featured: true }).toArray();
    return convertArrayToPlainObjects<Product>(results);
  }
}

export class ServiceService extends DatabaseService<Service> {
  constructor() {
    super(COLLECTIONS.SERVICES);
  }

  async findByCategory(category: string): Promise<Service[]> {
    const collection = await this.getCollection();
    const results = await collection.find({ category }).toArray();
    return convertArrayToPlainObjects<Service>(results);
  }

  async getFeaturedServices(): Promise<Service[]> {
    const collection = await this.getCollection();
    const results = await collection.find({ featured: true }).toArray();
    return convertArrayToPlainObjects<Service>(results);
  }
}

export class GalleryService extends DatabaseService<GalleryImage> {
  constructor() {
    super(COLLECTIONS.GALLERY);
  }

  async findByCategory(
    category: "business" | "offers" | "branch"
  ): Promise<GalleryImage[]> {
    const collection = await this.getCollection();
    const results = await collection.find({ category }).toArray();
    return convertArrayToPlainObjects<GalleryImage>(results);
  }

  async getFeaturedImages(): Promise<GalleryImage[]> {
    const collection = await this.getCollection();
    const results = await collection.find({ featured: true }).toArray();
    return convertArrayToPlainObjects<GalleryImage>(results);
  }

  async getImagesByCategory(
    category: "business" | "offers" | "branch"
  ): Promise<GalleryImage[]> {
    const collection = await this.getCollection();
    const results = await collection.find({ category }).toArray();
    return convertArrayToPlainObjects<GalleryImage>(results);
  }
}

export class ClientService extends DatabaseService<Client> {
  constructor() {
    super(COLLECTIONS.CLIENTS);
  }

  async getFeaturedClients(): Promise<Client[]> {
    const collection = await this.getCollection();
    const results = await collection
      .find({ featured: true })
      .sort({ order: 1 })
      .toArray();
    return convertArrayToPlainObjects<Client>(results);
  }

  async getAllClients(): Promise<Client[]> {
    const collection = await this.getCollection();
    const results = await collection.find({}).sort({ order: 1 }).toArray();
    return convertArrayToPlainObjects<Client>(results);
  }

  async findByCategory(category: string): Promise<Client[]> {
    const collection = await this.getCollection();
    const results = await collection
      .find({ category })
      .sort({ order: 1 })
      .toArray();
    return convertArrayToPlainObjects<Client>(results);
  }
}

// Export instances
export const products = new ProductService();
export const services = new ServiceService();
export const gallery = new GalleryService();
export const clients = new ClientService();
