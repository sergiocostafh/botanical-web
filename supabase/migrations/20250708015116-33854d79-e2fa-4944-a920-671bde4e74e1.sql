
-- Create products table
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  price decimal(10,2) NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create publications table  
CREATE TABLE public.publications (
  id serial PRIMARY KEY,
  title text NOT NULL,
  journal text NOT NULL,
  year text NOT NULL,
  abstract text,
  link text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for products (public read, authenticated full access)
CREATE POLICY "Allow public read access to products" 
  ON public.products 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow full access to products for authenticated users" 
  ON public.products 
  FOR ALL 
  USING (true);

-- Enable Row Level Security for publications
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for publications (public read, authenticated full access)
CREATE POLICY "Allow public read access to publications" 
  ON public.publications 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow full access to publications for authenticated users" 
  ON public.publications 
  FOR ALL 
  USING (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true);

-- Create storage policies for the images bucket
CREATE POLICY "Public Access to Images" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can update images" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can delete images" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'images');
