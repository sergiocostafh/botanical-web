
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const products: Product[] = [
    // Terroá Biocosmética
    {
      id: 1,
      name: "Leave-in Fortalecedor Capilar",
      price: 85.00,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "terroa"
    },
    {
      id: 2,
      name: "Máscara Facial Purificante",
      price: 79.00,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "terroa"
    },
    {
      id: 3,
      name: "Hidratante Facial",
      price: 95.00,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "terroa"
    },
    {
      id: 4,
      name: "Hidratante Regenerador",
      price: 110.00,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "terroa"
    },
    
    // Curadoria
    {
      id: 5,
      name: "Desodorante Líquido - BioAromallis",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1624453213076-b7e47c526923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "curadoria"
    },
    {
      id: 6,
      name: "Desodorante Creme - BioAromallis",
      price: 49.00,
      image: "https://images.unsplash.com/photo-1624453213076-b7e47c526923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "curadoria"
    },
    {
      id: 7,
      name: "Perfume em Óleo Mirach - BioAromallis",
      price: 120.00,
      image: "https://images.unsplash.com/photo-1624453213076-b7e47c526923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "curadoria"
    },
    
    // Óleos Essenciais
    {
      id: 8,
      name: "Óleo Essencial de Alecrim",
      price: 35.00,
      image: "https://images.unsplash.com/photo-1626278664285-f796b9ee7806?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "oleos"
    },
    {
      id: 9,
      name: "Óleo Essencial de Capim-limão",
      price: 32.00,
      image: "https://images.unsplash.com/photo-1626278664285-f796b9ee7806?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "oleos"
    },
    {
      id: 10,
      name: "Óleo Essencial de Limão Siciliano",
      price: 38.00,
      image: "https://images.unsplash.com/photo-1626278664285-f796b9ee7806?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "oleos"
    },
    {
      id: 11,
      name: "Óleo Essencial de Eucalipto Globulus",
      price: 30.00,
      image: "https://images.unsplash.com/photo-1626278664285-f796b9ee7806?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      category: "oleos"
    },
  ];

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleContact = () => {
    window.open("https://wa.me/5500000000000?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos.", "_blank");
  };

  return (
    <section id="shop" className="py-20 bg-botanical-white">
      <div className="botanical-container">
        <h2 className="section-title text-center mx-auto">Loja</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-botanical-dark/80">
          Produtos naturais desenvolvidos com bioativos da flora brasileira.
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button 
            className={`px-4 py-2 rounded-md transition-colors ${activeCategory === 'all' 
              ? 'bg-botanical-olive text-botanical-white' 
              : 'bg-botanical-beige text-botanical-dark hover:bg-botanical-beige/70'}`}
            onClick={() => setActiveCategory('all')}
          >
            Todos
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-colors ${activeCategory === 'terroa' 
              ? 'bg-botanical-olive text-botanical-white' 
              : 'bg-botanical-beige text-botanical-dark hover:bg-botanical-beige/70'}`}
            onClick={() => setActiveCategory('terroa')}
          >
            Terroá Biocosmética
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-colors ${activeCategory === 'curadoria' 
              ? 'bg-botanical-olive text-botanical-white' 
              : 'bg-botanical-beige text-botanical-dark hover:bg-botanical-beige/70'}`}
            onClick={() => setActiveCategory('curadoria')}
          >
            Curadoria
          </button>
          <button 
            className={`px-4 py-2 rounded-md transition-colors ${activeCategory === 'oleos' 
              ? 'bg-botanical-olive text-botanical-white' 
              : 'bg-botanical-beige text-botanical-dark hover:bg-botanical-beige/70'}`}
            onClick={() => setActiveCategory('oleos')}
          >
            Óleos Essenciais
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-botanical-white border border-botanical-beige rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-botanical-dark line-clamp-2 h-12">{product.name}</h3>
                <p className="text-botanical-olive font-playfair text-lg mt-2">R$ {product.price.toFixed(2)}</p>
                <button 
                  onClick={handleContact}
                  className="mt-3 w-full py-2 bg-botanical-clay text-botanical-white rounded hover:bg-botanical-clay/90 transition-colors"
                >
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button onClick={handleContact} className="botanical-button-primary">
            Entrar em contato para compras
          </button>
        </div>
      </div>
    </section>
  );
};

export default Shop;
