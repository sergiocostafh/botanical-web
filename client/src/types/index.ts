
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  created_at?: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  description: string;
  image: string;
  created_at?: string;
}

export interface Publication {
  id: number;
  title: string;
  journal: string;
  year: string;
  abstract?: string;
  link?: string;
  created_at?: string;
}
