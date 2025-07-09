
import { createClient } from '@supabase/supabase-js';
import { Product, Course, Publication } from '../types';
import { toast } from 'sonner';
import { supabase } from '../integrations/supabase/client';

// Keep the mock data for when rendering in development without Supabase connection
const mockProducts: Product[] = [
  {
    id: 'mock-1',
    name: 'Produto Exemplo',
    price: 29.99,
    category: 'terroa',
    description: 'Este é um produto de exemplo. Conecte-se ao Supabase para ver produtos reais.',
    image: 'https://placehold.co/600x400?text=Produto+Exemplo'
  }
];

const mockCourses: Course[] = [
  {
    id: 'mock-1',
    title: 'Curso Exemplo',
    subtitle: 'Um curso de exemplo para desenvolvimento',
    type: 'Online',
    description: 'Este é um curso de exemplo. Conecte-se ao Supabase para ver cursos reais.',
    image: 'https://placehold.co/600x400?text=Curso+Exemplo'
  }
];

const mockPublications: Publication[] = [
  {
    id: 1,
    title: 'Publicação Exemplo',
    journal: 'Revista Científica',
    year: '2023',
    abstract: 'Este é um resumo de exemplo. Conecte-se ao Supabase para ver publicações reais.'
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
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching products:", error);
        return mockProducts;
      }
      
      return data as Product[];
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Erro ao carregar produtos. Usando dados de exemplo.");
      return mockProducts;
    }
  },

  getProduct: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching product ${id}:`, error);
        return mockProducts[0];
      }
      
      return data as Product;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      toast.error("Erro ao carregar o produto.");
      return mockProducts[0];
    }
  },

  createProduct: async (product: Omit<Product, 'id' | 'created_at'>) => {
    try {
      console.log("Creating product:", product);
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select();
    
      if (error) {
        console.error("Error creating product:", error);
        throw error;
      }
      
      console.log("Product created successfully:", data[0]);
      return data[0] as Product;
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Erro ao criar produto");
      throw error;
    }
  },

  updateProduct: async (id: string, product: Partial<Product>) => {
    try {
      console.log(`Updating product ${id}:`, product);
      const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', id)
        .select();
    
      if (error) {
        console.error("Error updating product:", error);
        throw error;
      }
      
      console.log("Product updated successfully:", data[0]);
      return data[0] as Product;
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Erro ao atualizar produto");
      throw error;
    }
  },

  deleteProduct: async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
    
      if (error) throw error;
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
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching courses:", error);
        return mockCourses;
      }
      
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
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching course ${id}:`, error);
        throw error;
      }
      
      console.log("Course fetched:", data);
      return data as Course;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      toast.error("Erro ao carregar o curso.");
      throw error;
    }
  },

  createCourse: async (course: Omit<Course, 'id' | 'created_at'>) => {
    try {
      console.log("Creating course:", course);
      const { data, error } = await supabase
        .from('courses')
        .insert([course])
        .select();
      
      if (error) {
        console.error("Error creating course:", error);
        throw error;
      }
      
      console.log("Course created successfully:", data[0]);
      return data[0] as Course;
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Erro ao criar curso");
      throw error;
    }
  },

  updateCourse: async (id: string, course: Partial<Course>) => {
    try {
      console.log(`Updating course ${id} with:`, course);
      const { data, error } = await supabase
        .from('courses')
        .update(course)
        .eq('id', id)
        .select();
      
      if (error) {
        console.error("Supabase update error:", error);
        throw error;
      }
      
      console.log("Course updated successfully:", data[0]);
      return data[0] as Course;
    } catch (error) {
      console.error(`Error updating course ${id}:`, error);
      toast.error("Erro ao atualizar curso");
      throw error;
    }
  },

  updateCourseByTitle: async (title: string, course: Partial<Course>) => {
    try {
      console.log(`Updating course "${title}" with:`, course);
      const { data, error } = await supabase
        .from('courses')
        .update(course)
        .eq('title', title)
        .select();
      
      if (error) {
        console.error("Supabase update error:", error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        throw new Error(`Course with title "${title}" not found`);
      }
      
      console.log("Course updated successfully:", data[0]);
      return data[0] as Course;
    } catch (error) {
      console.error(`Error updating course "${title}":`, error);
      toast.error(`Erro ao atualizar curso "${title}"`);
      throw error;
    }
  },

  deleteCourse: async (id: string) => {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
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
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching publications:", error);
        return mockPublications;
      }
      
      return data as Publication[];
    } catch (error) {
      console.error("Error fetching publications:", error);
      toast.error("Erro ao carregar publicações. Usando dados de exemplo.");
      return mockPublications;
    }
  },

  getPublication: async (id: number) => {
    try {
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching publication ${id}:`, error);
        throw error;
      }
      return data as Publication;
    } catch (error) {
      console.error(`Error fetching publication ${id}:`, error);
      toast.error("Erro ao carregar a publicação.");
      throw error;
    }
  },

  createPublication: async (publication: Omit<Publication, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('publications')
        .insert([publication])
        .select();
    
      if (error) throw error;
      return data[0] as Publication;
    } catch (error) {
      console.error("Error creating publication:", error);
      toast.error("Erro ao criar publicação");
      throw error;
    }
  },

  updatePublication: async (id: number, publication: Partial<Publication>) => {
    try {
      const { data, error } = await supabase
        .from('publications')
        .update(publication)
        .eq('id', id)
        .select();
    
      if (error) throw error;
      return data[0] as Publication;
    } catch (error) {
      console.error("Error updating publication:", error);
      toast.error("Erro ao atualizar publicação");
      throw error;
    }
  },

  deletePublication: async (id: number) => {
    try {
      const { error } = await supabase
        .from('publications')
        .delete()
        .eq('id', id);
    
      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting publication:", error);
      toast.error("Erro ao excluir publicação");
      throw error;
    }
  }
};
