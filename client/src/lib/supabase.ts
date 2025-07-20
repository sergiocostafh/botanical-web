
import { Product, Course, Publication } from '../types';
import { toast } from 'sonner';
import { apiRequest } from './queryClient';

// Keep the mock data for when rendering in development without Supabase connection
const mockProducts: Product[] = [
  {
    id: 'mock-1',
    name: 'Produto Exemplo',
    price: "29.99",
    category: 'terroa',
    description: 'Este é um produto de exemplo. Conecte-se ao Supabase para ver produtos reais.',
    image: 'https://placehold.co/600x400?text=Produto+Exemplo',
    createdAt: new Date()
  }
];

const mockCourses: Course[] = [
  {
    id: 'mock-1',
    title: 'Curso Exemplo',
    subtitle: 'Um curso de exemplo para desenvolvimento',
    type: 'Online',
    description: 'Este é um curso de exemplo. Conecte-se ao Supabase para ver cursos reais.',
    image: 'https://placehold.co/600x400?text=Curso+Exemplo',
    createdAt: new Date(),
    paymentLink: null
  }
];

const mockPublications: Publication[] = [
  {
    id: 1,
    title: 'Publicação Exemplo',
    journal: 'Revista Científica',
    year: '2023',
    abstract: 'Este é um resumo de exemplo. Conecte-se ao Supabase para ver publicações reais.',
    link: null,
    createdAt: new Date()
  }
];

// Helper to check if we're using a real Supabase instance
const isSupabaseConfigured = () => {
  try {
    // Check if we have valid Supabase credentials
    return true;
  } catch (error) {
    console.error("Supabase configuration error:", error);
    return false;
  }
};

// Handle API errors more gracefully
const handleError = (error: any, operation: string) => {
  console.error(`Error ${operation}:`, error);
  
  // Format a user-friendly error message
  let message = 'Ocorreu um erro na operação';
  if (error.message) {
    if (error.message.includes('Failed to fetch')) {
      message = 'Erro de conexão com o Supabase. Verifique as credenciais ou sua conexão com a internet.';
    } else if (error.message.includes('supabaseUrl is required')) {
      message = 'Configuração do Supabase incompleta. Por favor, conecte ao Supabase através do botão no canto superior direito.';
    } else {
      message = error.message;
    }
  }
  
  toast.error(message);
  throw error;
};

// Serviços para produtos
export const productService = {
  getProducts: async () => {
    try {
      return await apiRequest('/api/products');
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Erro ao carregar produtos. Usando dados de exemplo.");
      return mockProducts;
    }
  },

  getProduct: async (id: string) => {
    try {
      return await apiRequest(`/api/products/${id}`);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      toast.error("Erro ao carregar o produto.");
      return mockProducts[0];
    }
  },

  createProduct: async (product: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      console.log("Creating product:", product);
      const result = await apiRequest('/api/products', {
        method: 'POST',
        body: JSON.stringify(product),
      });
      
      console.log("Product created successfully:", result);
      return result as Product;
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Erro ao criar produto");
      throw error;
    }
  },

  updateProduct: async (id: string, product: Partial<Product>) => {
    try {
      console.log(`Updating product ${id}:`, product);
      const result = await apiRequest(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
      });
      
      console.log("Product updated successfully:", result);
      return result as Product;
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Erro ao atualizar produto");
      throw error;
    }
  },

  deleteProduct: async (id: string) => {
    try {
      await apiRequest(`/api/products/${id}`, {
        method: 'DELETE',
      });
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Erro ao excluir produto");
      throw error;
    }
  }
};

// Serviços para cursos
export const courseService = {
  getCourses: async () => {
    try {
      console.log("Fetching courses from database...");
      const data = await apiRequest('/api/courses');
      
      console.log("Courses fetched from database:", data);
      return data as Course[];
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Erro ao carregar cursos. Usando dados de exemplo.");
      return mockCourses;
    }
  },

  getCourse: async (id: string) => {
    try {
      console.log(`Fetching course ${id}...`);
      const data = await apiRequest(`/api/courses/${id}`);
      
      console.log("Course fetched:", data);
      return data as Course;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      toast.error("Erro ao carregar o curso.");
      throw error;
    }
  },

  createCourse: async (course: Omit<Course, 'id' | 'createdAt'>) => {
    try {
      console.log("Creating course:", course);
      const data = await apiRequest('/api/courses', {
        method: 'POST',
        body: JSON.stringify(course),
      });
      
      console.log("Course created successfully:", data);
      return data as Course;
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Erro ao criar curso");
      throw error;
    }
  },

  updateCourse: async (id: string, course: Partial<Course>) => {
    try {
      console.log(`Updating course ${id} with:`, course);
      const data = await apiRequest(`/api/courses/${id}`, {
        method: 'PUT',
        body: JSON.stringify(course),
      });
      
      console.log("Course updated successfully:", data);
      return data as Course;
    } catch (error) {
      console.error(`Error updating course ${id}:`, error);
      toast.error("Erro ao atualizar curso");
      throw error;
    }
  },

  deleteCourse: async (id: string) => {
    try {
      await apiRequest(`/api/courses/${id}`, {
        method: 'DELETE',
      });
      return true;
    } catch (error) {
      console.error(`Error deleting course ${id}:`, error);
      toast.error("Erro ao excluir curso");
      throw error;
    }
  }
};

// Serviços para publicações
export const publicationService = {
  getPublications: async () => {
    try {
      const data = await apiRequest('/api/publications');
      return data as Publication[];
    } catch (error) {
      console.error("Error fetching publications:", error);
      toast.error("Erro ao carregar publicações. Usando dados de exemplo.");
      return mockPublications;
    }
  },

  getPublication: async (id: number) => {
    try {
      const data = await apiRequest(`/api/publications/${id}`);
      return data as Publication;
    } catch (error) {
      console.error(`Error fetching publication ${id}:`, error);
      toast.error("Erro ao carregar a publicação.");
      throw error;
    }
  },

  createPublication: async (publication: Omit<Publication, 'id' | 'createdAt'>) => {
    try {
      const data = await apiRequest('/api/publications', {
        method: 'POST',
        body: JSON.stringify(publication),
      });
      return data as Publication;
    } catch (error) {
      console.error("Error creating publication:", error);
      toast.error("Erro ao criar publicação");
      throw error;
    }
  },

  updatePublication: async (id: number, publication: Partial<Publication>) => {
    try {
      const data = await apiRequest(`/api/publications/${id}`, {
        method: 'PUT',
        body: JSON.stringify(publication),
      });
      return data as Publication;
    } catch (error) {
      console.error("Error updating publication:", error);
      toast.error("Erro ao atualizar publicação");
      throw error;
    }
  },

  deletePublication: async (id: number) => {
    try {
      await apiRequest(`/api/publications/${id}`, {
        method: 'DELETE',
      });
      return true;
    } catch (error) {
      console.error("Error deleting publication:", error);
      toast.error("Erro ao excluir publicação");
      throw error;
    }
  }
};
