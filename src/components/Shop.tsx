
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { productService } from "@/lib/supabase";
import { Product } from "@/types";

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Erro ao carregar produtos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleContact = () => {
    window.open("https://wa.me/5500000000000?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos.", "_blank");
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success("Produto adicionado ao carrinho", {
      description: product.name,
    });
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
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-botanical-olive border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-10 text-gray-500">
                Nenhum produto encontrado nesta categoria.
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="bg-botanical-white border border-botanical-beige rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <Link to={`/produto/${product.id}`} className="block h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="font-medium text-botanical-dark line-clamp-2 h-12">
                      <Link to={`/produto/${product.id}`} className="hover:text-botanical-olive transition-colors">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-botanical-olive font-playfair text-lg mt-2">R$ {product.price.toFixed(2)}</p>
                    <div className="flex gap-2 mt-3">
                      <button 
                        onClick={(e) => handleAddToCart(product, e)}
                        className="flex-1 py-2 bg-botanical-clay text-botanical-white rounded hover:bg-botanical-clay/90 transition-colors flex items-center justify-center"
                      >
                        <ShoppingBag className="w-4 h-4 mr-1" /> Comprar
                      </button>
                      <Link 
                        to={`/produto/${product.id}`}
                        className="py-2 px-3 bg-botanical-beige text-botanical-dark rounded hover:bg-botanical-beige/80 transition-colors"
                      >
                        Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

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
