
import { createClient } from '@supabase/supabase-js';
import { Product, Course, Publication } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Serviços para produtos
export const productService = {
  getProducts: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Product[];
  },

  getProduct: async (id: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Product;
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
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Course[];
  },

  getCourse: async (id: string) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Course;
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
    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Publication[];
  },

  getPublication: async (id: number) => {
    const { data, error } = await supabase
      .from('publications')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Publication;
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
