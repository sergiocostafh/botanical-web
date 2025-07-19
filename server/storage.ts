import { 
  users, 
  adminUsers,
  courses, 
  products, 
  publications, 
  type User, 
  type UpsertUser, 
  type InsertAdminUser,
  type AdminUser,
  type Course, 
  type InsertCourse, 
  type Product, 
  type InsertProduct, 
  type Publication, 
  type InsertPublication 
} from "@shared/schema";
import { db } from './db';
import { eq } from 'drizzle-orm';

export interface IStorage {
  // User methods for Google Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Admin methods
  isUserAdmin(email: string): Promise<boolean>;
  addAdminUser(adminUser: InsertAdminUser): Promise<AdminUser>;
  removeAdminUser(email: string): Promise<boolean>;
  getAdminUsers(): Promise<AdminUser[]>;
  
  // Course methods
  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, course: Partial<InsertCourse>): Promise<Course | undefined>;
  deleteCourse(id: string): Promise<boolean>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  
  // Publication methods
  getPublications(): Promise<Publication[]>;
  getPublication(id: number): Promise<Publication | undefined>;
  createPublication(publication: InsertPublication): Promise<Publication>;
  updatePublication(id: number, publication: Partial<InsertPublication>): Promise<Publication | undefined>;
  deletePublication(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const result = await db
      .insert(users)
      .values({
        ...userData,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result[0];
  }

  // Admin methods
  async isUserAdmin(email: string): Promise<boolean> {
    const result = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
    return result.length > 0;
  }

  async addAdminUser(adminUser: InsertAdminUser): Promise<AdminUser> {
    try {
      const result = await db.insert(adminUsers).values(adminUser).returning();
      return result[0];
    } catch (error) {
      // If user already exists, return existing
      const existing = await db.select().from(adminUsers).where(eq(adminUsers.email, adminUser.email));
      if (existing.length > 0) {
        return existing[0];
      }
      throw error;
    }
  }

  async removeAdminUser(email: string): Promise<boolean> {
    const result = await db.delete(adminUsers).where(eq(adminUsers.email, email)).returning();
    return result.length > 0;
  }

  async getAdminUsers(): Promise<AdminUser[]> {
    return await db.select().from(adminUsers);
  }
  
  // Course methods
  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const result = await db.select().from(courses).where(eq(courses.id, id));
    return result[0];
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const result = await db.insert(courses).values(course).returning();
    return result[0];
  }

  async updateCourse(id: string, course: Partial<InsertCourse>): Promise<Course | undefined> {
    const result = await db.update(courses).set(course).where(eq(courses.id, id)).returning();
    return result[0];
  }

  async deleteCourse(id: string): Promise<boolean> {
    const result = await db.delete(courses).where(eq(courses.id, id));
    return result.length > 0;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const result = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return result[0];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.length > 0;
  }
  
  // Publication methods
  async getPublications(): Promise<Publication[]> {
    return await db.select().from(publications);
  }

  async getPublication(id: number): Promise<Publication | undefined> {
    const result = await db.select().from(publications).where(eq(publications.id, id));
    return result[0];
  }

  async createPublication(publication: InsertPublication): Promise<Publication> {
    const result = await db.insert(publications).values(publication).returning();
    return result[0];
  }

  async updatePublication(id: number, publication: Partial<InsertPublication>): Promise<Publication | undefined> {
    const result = await db.update(publications).set(publication).where(eq(publications.id, id)).returning();
    return result[0];
  }

  async deletePublication(id: number): Promise<boolean> {
    const result = await db.delete(publications).where(eq(publications.id, id));
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
