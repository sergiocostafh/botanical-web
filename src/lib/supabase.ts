import { createClient } from '@supabase/supabase-js';
import { Product, Course, Publication } from '../types';
import { toast } from 'sonner';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are properly set
if (!supabaseUrl || supabaseUrl === 'https://your-supabase-project-url.supabase.co') {
  console.error('VITE_SUPABASE_URL not configured correctly. Please check your .env file');
}

if (!supabaseKey || supabaseKey === 'your-anon-key') {
  console.error('VITE_SUPABASE_ANON_KEY not configured correctly. Please check your .env file');
}

export const supabase = createClient(supabaseUrl as string, supabaseKey as string);

// Add error handling to service methods
const handleError = (error: any, operation: string) => {
  console.error(`Error ${operation}:`, error);
  
  // Format a user-friendly error message
  let message = 'Ocorreu um erro na operação';
  if (error.message) {
    if (error.message.includes('Failed to fetch')) {
      message = 'Erro de conexão com o Supabase. Verifique as credenciais ou sua conexão com a internet.';
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
      
      if (error) throw error;
      return data as Product[];
    } catch (error) {
      return handleError(error, 'fetching products');
    }
  },

  getProduct: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Product;
    } catch (error) {
      return handleError(error, `fetching product ${id}`);
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
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Course[];
    } catch (error) {
      return handleError(error, 'fetching courses');
    }
  },

  getCourse: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Course;
    } catch (error) {
      return handleError(error, `fetching course ${id}`);
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
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Publication[];
    } catch (error) {
      return handleError(error, 'fetching publications');
    }
  },

  getPublication: async (id: number) => {
    try {
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Publication;
    } catch (error) {
      return handleError(error, `fetching publication ${id}`);
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
