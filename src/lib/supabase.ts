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
    // Attempt a simple query to see if Supabase is working
    const query = supabase.from('courses').select('count', { count: 'exact', head: true });
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
      if (!isSupabaseConfigured()) {
        console.warn('Using mock product data because Supabase is not properly configured');
        return mockProducts;
      }
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Erro ao carregar produtos. Verifique a conexão com o Supabase.");
      return mockProducts; // Return mock data on error
    }
  },

  getProduct: async (id: string) => {
    try {
      if (!isSupabaseConfigured()) {
        const mockProduct = mockProducts.find(p => p.id === id) || mockProducts[0];
        return mockProduct;
      }
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Product;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      toast.error("Erro ao carregar o produto. Verifique a conexão com o Supabase.");
      return mockProducts[0]; // Return first mock product on error
    }
  },

  createProduct: async (product: Omit<Product, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();
    
    if (error) throw error;
    return data[0] as Product;
  },

  updateProduct: async (id: string, product: Partial<Product>) => {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0] as Product;
  },

  deleteProduct: async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};

// Serviços para cursos
export const courseService = {
  getCourses: async () => {
    try {
      if (!isSupabaseConfigured()) {
        console.warn('Using mock course data because Supabase is not properly configured');
        return mockCourses;
      }
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Course[];
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Erro ao carregar cursos. Verifique a conexão com o Supabase.");
      return mockCourses; // Return mock data on error
    }
  },

  getCourse: async (id: string) => {
    try {
      if (!isSupabaseConfigured()) {
        const mockCourse = mockCourses.find(c => c.id === id) || mockCourses[0];
        return mockCourse;
      }
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching course ${id}:`, error);
        throw error;
      }
      return data as Course;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      toast.error("Erro ao carregar o curso. Verifique a conexão com o Supabase.");
      throw error;
    }
  },

  createCourse: async (course: Omit<Course, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert([course])
        .select();
      
      if (error) throw error;
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
      console.log("Update response:", data);
      return data[0] as Course;
    } catch (error) {
      console.error(`Error updating course ${id}:`, error);
      toast.error("Erro ao atualizar curso");
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
      if (!isSupabaseConfigured()) {
        console.warn('Using mock publication data because Supabase is not properly configured');
        return mockPublications;
      }
      
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Publication[];
    } catch (error) {
      console.error("Error fetching publications:", error);
      toast.error("Erro ao carregar publicações. Verifique a conexão com o Supabase.");
      return mockPublications; // Return mock data on error
    }
  },

  getPublication: async (id: number) => {
    try {
      if (!isSupabaseConfigured()) {
        const mockPublication = mockPublications.find(p => p.id === id) || mockPublications[0];
        return mockPublication;
      }
      
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
      toast.error("Erro ao carregar a publicação. Verifique a conexão com o Supabase.");
      throw error;
    }
  },

  createPublication: async (publication: Omit<Publication, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('publications')
      .insert([publication])
      .select();
    
    if (error) throw error;
    return data[0] as Publication;
  },

  updatePublication: async (id: number, publication: Partial<Publication>) => {
    const { data, error } = await supabase
      .from('publications')
      .update(publication)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0] as Publication;
  },

  deletePublication: async (id: number) => {
    const { error } = await supabase
      .from('publications')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};
