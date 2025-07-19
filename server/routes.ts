import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupGoogleAuth, isAuthenticated, isAdmin } from "./googleAuth";
import { insertCourseSchema, insertProductSchema, insertPublicationSchema, insertAdminUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Google Auth
  await setupGoogleAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      res.json({
        ...req.user,
        isAdmin: true // User is already verified as admin if authenticated
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Admin management routes
  app.get("/api/admin/users", isAdmin, async (req, res) => {
    try {
      const adminUsers = await storage.getAdminUsers();
      res.json(adminUsers);
    } catch (error) {
      console.error("Error fetching admin users:", error);
      res.status(500).json({ error: "Failed to fetch admin users" });
    }
  });

  app.post("/api/admin/users", isAdmin, async (req, res) => {
    try {
      const validatedData = insertAdminUserSchema.parse(req.body);
      const adminUser = await storage.addAdminUser(validatedData);
      res.status(201).json(adminUser);
    } catch (error) {
      console.error("Error adding admin user:", error);
      res.status(400).json({ error: "Failed to add admin user" });
    }
  });

  app.delete("/api/admin/users/:email", isAdmin, async (req, res) => {
    try {
      const success = await storage.removeAdminUser(req.params.email);
      if (!success) {
        return res.status(404).json({ error: "Admin user not found" });
      }
      res.json({ message: "Admin user removed successfully" });
    } catch (error) {
      console.error("Error removing admin user:", error);
      res.status(400).json({ error: "Failed to remove admin user" });
    }
  });

  // Search endpoint
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query || query.length < 2) {
        return res.json([]);
      }

      const searchTerm = `%${query.toLowerCase()}%`;
      const results = [];

      // Search courses
      const courses = await storage.searchCourses(searchTerm);
      results.push(...courses.map(course => ({
        id: course.id,
        title: course.title,
        subtitle: course.subtitle,
        description: course.description,
        type: 'course' as const
      })));

      // Search products
      const products = await storage.searchProducts(searchTerm);
      results.push(...products.map(product => ({
        id: product.id,
        title: product.name,
        subtitle: `R$ ${product.price.toFixed(2)}`,
        description: product.description,
        type: 'product' as const
      })));

      // Search publications
      const publications = await storage.searchPublications(searchTerm);
      results.push(...publications.map(pub => ({
        id: pub.id.toString(),
        title: pub.title,
        subtitle: pub.authors,
        description: pub.abstract,
        type: 'publication' as const
      })));

      // Sort by relevance (title matches first, then content matches)
      results.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
        const bTitle = b.title.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
        return aTitle - bTitle;
      });

      res.json(results.slice(0, 10)); // Limit to 10 results
    } catch (error) {
      console.error("Error searching:", error);
      res.status(500).json({ error: "Failed to search" });
    }
  });

  // Course routes
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ error: "Failed to fetch course" });
    }
  });

  app.post("/api/courses", isAdmin, async (req, res) => {
    try {
      const validatedData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(validatedData);
      res.status(201).json(course);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(400).json({ error: "Failed to create course" });
    }
  });

  app.put("/api/courses/:id", isAdmin, async (req, res) => {
    try {
      const validatedData = insertCourseSchema.partial().parse(req.body);
      const course = await storage.updateCourse(req.params.id, validatedData);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(400).json({ error: "Failed to update course" });
    }
  });

  app.delete("/api/courses/:id", isAdmin, async (req, res) => {
    try {
      const success = await storage.deleteCourse(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).json({ error: "Failed to delete course" });
    }
  });

  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/products", isAdmin, async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(400).json({ error: "Failed to create product" });
    }
  });

  app.put("/api/products/:id", isAdmin, async (req, res) => {
    try {
      const validatedData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(req.params.id, validatedData);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(400).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", isAdmin, async (req, res) => {
    try {
      const success = await storage.deleteProduct(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Publication routes
  app.get("/api/publications", async (req, res) => {
    try {
      const publications = await storage.getPublications();
      res.json(publications);
    } catch (error) {
      console.error("Error fetching publications:", error);
      res.status(500).json({ error: "Failed to fetch publications" });
    }
  });

  app.get("/api/publications/:id", async (req, res) => {
    try {
      const publication = await storage.getPublication(parseInt(req.params.id));
      if (!publication) {
        return res.status(404).json({ error: "Publication not found" });
      }
      res.json(publication);
    } catch (error) {
      console.error("Error fetching publication:", error);
      res.status(500).json({ error: "Failed to fetch publication" });
    }
  });

  app.post("/api/publications", isAdmin, async (req, res) => {
    try {
      const validatedData = insertPublicationSchema.parse(req.body);
      const publication = await storage.createPublication(validatedData);
      res.status(201).json(publication);
    } catch (error) {
      console.error("Error creating publication:", error);
      res.status(400).json({ error: "Failed to create publication" });
    }
  });

  app.put("/api/publications/:id", isAdmin, async (req, res) => {
    try {
      const validatedData = insertPublicationSchema.partial().parse(req.body);
      const publication = await storage.updatePublication(parseInt(req.params.id), validatedData);
      if (!publication) {
        return res.status(404).json({ error: "Publication not found" });
      }
      res.json(publication);
    } catch (error) {
      console.error("Error updating publication:", error);
      res.status(400).json({ error: "Failed to update publication" });
    }
  });

  app.delete("/api/publications/:id", isAdmin, async (req, res) => {
    try {
      const success = await storage.deletePublication(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ error: "Publication not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting publication:", error);
      res.status(500).json({ error: "Failed to delete publication" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
