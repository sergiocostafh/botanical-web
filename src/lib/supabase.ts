import { createClient } from '@supabase/supabase-js';
import { Product, Course, Publication } from '../types';
import { toast } from 'sonner';

// Default values for development - these will not work for real data operations
// but will prevent the app from crashing during development
const DEFAULT_SUPABASE_URL = 'https://your-project-url.supabase.co';
const DEFAULT_SUPABASE_KEY = 'your-anon-key';

// Try to get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY;

// Create client with fallbacks to prevent crashes
export const supabase = createClient(supabaseUrl, supabaseKey);

// Check if credentials are likely valid and show appropriate warnings
const isUsingDefaultUrl = supabaseUrl === DEFAULT_SUPABASE_URL;
const isUsingDefaultKey = supabaseKey === DEFAULT_SUPABASE_KEY;

if (isUsingDefaultUrl || isUsingDefaultKey) {
  console.warn(
    '⚠️ Using default Supabase credentials. The app will load but database operations will fail. ' +
    'To fix this, connect to Supabase using the green Supabase button in the top-right corner.'
  );
}

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

// Mock data for when Supabase is not properly configured
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

// Serviços para produtos
export const productService = {
  getProducts: async () => {
    try {
      if (isUsingDefaultUrl || isUsingDefaultKey) {
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
      if (isUsingDefaultUrl || isUsingDefaultKey) {
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
      if (isUsingDefaultUrl || isUsingDefaultKey) {
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
      if (isUsingDefaultUrl || isUsingDefaultKey) {
        const mockCourse = mockCourses.find(c => c.id === id) || mockCourses[0];
        return mockCourse;
      }
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Course;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      toast.error("Erro ao carregar o curso. Verifique a conexão com o Supabase.");
      return mockCourses[0]; // Return first mock course on error
    }
  },

  createCourse: async (course: Omit<Course, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('courses')
      .insert([course])
      .select();
    
    if (error) throw error;
    return data[0] as Course;
  },

  updateCourse: async (id: string, course: Partial<Course>) => {
    const { data, error } = await supabase
      .from('courses')
      .update(course)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0] as Course;
  },

  deleteCourse: async (id: string) => {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};

// Serviços para publicações
export const publicationService = {
  getPublications: async () => {
    try {
      if (isUsingDefaultUrl || isUsingDefaultKey) {
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
      if (isUsingDefaultUrl || isUsingDefaultKey) {
        const mockPublication = mockPublications.find(p => p.id === id) || mockPublications[0];
        return mockPublication;
      }
      
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Publication;
    } catch (error) {
      console.error(`Error fetching publication ${id}:`, error);
      toast.error("Erro ao carregar a publicação. Verifique a conexão com o Supabase.");
      return mockPublications[0]; // Return first mock publication on error
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
