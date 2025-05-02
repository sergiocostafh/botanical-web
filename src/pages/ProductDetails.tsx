
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { toast } from "sonner";

// Dados dos produtos - em uma aplicação real, esses dados viriam de uma API
const productsData = [
  // Terroá Biocosmética
  {
    id: "leave-in-fortalecedor",
    name: "Leave-in Fortalecedor Capilar",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "terroa",
    categoryDisplay: "Terroá Biocosmética",
    fullDescription: `
      <p>O Leave-in Fortalecedor Capilar é enriquecido com ativos da flora brasileira que fortalecem e protegem os fios, proporcionando brilho e vitalidade aos cabelos.</p>
      
      <h3>Benefícios:</h3>
      <ul>
        <li>Fortalecimento capilar</li>
        <li>Proteção contra danos externos</li>
        <li>Redução da quebra dos fios</li>
        <li>Brilho e maciez naturais</li>
        <li>Hidratação prolongada</li>
      </ul>
      
      <h3>Principais ativos:</h3>
      <ul>
        <li>Óleo de Pracaxi - Rico em ácidos graxos, fortalece o cabelo</li>
        <li>Manteiga de Murumuru - Hidrata profundamente os fios</li>
        <li>Extrato de Guaçatonga - Estimula o crescimento capilar</li>
        <li>Óleo de Patauá - Alto poder nutritivo e antioxidante</li>
      </ul>
      
      <h3>Modo de usar:</h3>
      <p>Aplique nos cabelos úmidos, do meio para as pontas, e estilize como de costume. Não necessita enxágue.</p>
    `,
    size: "120ml",
    volume: "120ml",
    ingredients: "Aqua, Glycerin, Astrocaryum Murumuru Seed Butter, Pentaclethra Macroloba Seed Oil, Oenocarpus Bataua Fruit Oil, Casearia Sylvestris Extract..."
  },
  {
    id: "mascara-facial-purificante",
    name: "Máscara Facial Purificante",
    price: 79.00,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "terroa",
    categoryDisplay: "Terroá Biocosmética",
    fullDescription: `
      <p>A Máscara Facial Purificante combina argila brasileira e extratos vegetais que purificam, desobstruem os poros e equilibram a oleosidade da pele.</p>
      
      <h3>Benefícios:</h3>
      <ul>
        <li>Remoção de impurezas</li>
        <li>Desobstrução dos poros</li>
        <li>Controle da oleosidade</li>
        <li>Pele mais uniforme e luminosa</li>
        <li>Ação anti-inflamatória</li>
      </ul>
      
      <h3>Principais ativos:</h3>
      <ul>
        <li>Argila Verde Brasileira - Absorve impurezas e excesso de óleo</li>
        <li>Extrato de Copaíba - Propriedades anti-inflamatórias e antibacterianas</li>
        <li>Extrato de Barbatimão - Ação adstringente e cicatrizante</li>
        <li>Óleo essencial de Cravo - Controla a oleosidade e purifica</li>
      </ul>
      
      <h3>Modo de usar:</h3>
      <p>Aplique uma camada uniforme sobre a pele limpa, evitando a área dos olhos. Deixe agir por 15 minutos e remova com água morna.</p>
    `,
    size: "60g",
    volume: "60g",
    ingredients: "Kaolin, Aqua, Montmorillonite, Copaifera Officinalis Resin, Stryphnodendron Adstringens Bark Extract, Eugenia Caryophyllus Leaf Oil..."
  },
  // Curadoria
  {
    id: "desodorante-liquido-bioaromallis",
    name: "Desodorante Líquido - BioAromallis",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1624453213076-b7e47c526923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "curadoria",
    categoryDisplay: "Curadoria",
    fullDescription: `
      <p>Desodorante líquido natural que neutraliza os odores sem bloquear a transpiração natural do corpo, promovendo equilíbrio da microbiota.</p>
      
      <h3>Benefícios:</h3>
      <ul>
        <li>Neutralização eficaz de odores</li>
        <li>Sem alumínio e sem álcool</li>
        <li>Respeita o equilíbrio da pele</li>
        <li>Hidratação natural</li>
        <li>Fragrância natural que perdura</li>
      </ul>
      
      <h3>Principais ativos:</h3>
      <ul>
        <li>Extrato de Aloe Vera - Hidrata e acalma a pele</li>
        <li>Óleos essenciais selecionados - Propriedades antimicrobianas</li>
        <li>Bicarbonato de sódio - Neutraliza odores</li>
        <li>Óleo de coco - Propriedades hidratantes e antibacterianas</li>
      </ul>
      
      <h3>Modo de usar:</h3>
      <p>Agite antes de usar. Aplique nas axilas secas e limpas. Permita secar antes de vestir-se.</p>
    `,
    size: "60ml",
    volume: "60ml",
    ingredients: "Aqua, Aloe Barbadensis Leaf Juice, Sodium Bicarbonate, Cocos Nucifera Oil, Citrus Limon Peel Oil, Lavandula Angustifolia Oil..."
  },
  // Óleos Essenciais
  {
    id: "oleo-essencial-alecrim",
    name: "Óleo Essencial de Alecrim",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1626278664285-f796b9ee7806?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "oleos",
    categoryDisplay: "Óleos Essenciais",
    fullDescription: `
      <p>Óleo essencial 100% puro e natural de Alecrim (Rosmarinus officinalis), extraído a partir das folhas e galhos através de destilação a vapor.</p>
      
      <h3>Propriedades:</h3>
      <ul>
        <li>Estimulante mental e da circulação</li>
        <li>Analgésico e anti-inflamatório</li>
        <li>Fortalecedor capilar</li>
        <li>Antisséptico e antimicrobiano</li>
        <li>Equilibrante do sistema nervoso</li>
      </ul>
      
      <h3>Aplicações:</h3>
      <ul>
        <li>Aromaterapia - difusão ambiental para foco e concentração</li>
        <li>Cosméticos - tônicos capilares, produtos para pele oleosa</li>
        <li>Massagens - diluído em óleo carreador para dores musculares</li>
        <li>Cuidados domésticos - limpeza natural de superfícies</li>
      </ul>
      
      <h3>Modo de usar:</h3>
      <p>Uso inalatório, tópico (diluído) ou em difusor. Não usar puro sobre a pele e sempre realizar teste de sensibilidade.</p>
    `,
    size: "10ml",
    volume: "10ml",
    origen: "Brasil",
    extraction: "Destilação a vapor das folhas e galhos"
  }
];

const ProductDetails = () => {
  const { productId } = useParams();
  const product = productsData.find(p => p.id === productId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-botanical-white">
        <Header />
        <div className="botanical-container py-32 text-center">
          <h2 className="font-playfair text-3xl mb-4">Produto não encontrado</h2>
          <Link to="/#shop" className="botanical-button-primary inline-flex items-center mt-4">
            <ArrowLeft className="mr-2 h-5 w-5" /> Voltar para loja
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleContact = () => {
    window.open("https://wa.me/5500000000000?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20produto%20" + encodeURIComponent(product.name), "_blank");
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    // Visual feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
    
    // Toast notification
    toast.success("Produto adicionado ao carrinho", {
      description: `${product.name} (${quantity} unid.)`,
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="min-h-screen bg-botanical-white">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="botanical-container">
          <Link to="/#shop" className="inline-flex items-center text-botanical-olive hover:text-botanical-dark mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-5 w-5" /> Voltar para loja
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="relative h-64 md:h-96 lg:h-full rounded-lg overflow-hidden">
              <div className="absolute top-3 right-3 bg-botanical-copper text-botanical-white text-xs font-medium py-1 px-2 rounded">
                {product.categoryDisplay}
              </div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl mb-2 text-botanical-dark">{product.name}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <p className="text-3xl text-botanical-olive font-playfair">R$ {product.price.toFixed(2)}</p>
                {product.size && (
                  <span className="bg-botanical-beige/50 px-3 py-1 rounded-md text-sm">
                    {product.size}
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mt-6 mb-4">
                <span className="mr-3 text-botanical-dark">Quantidade:</span>
                <div className="flex items-center border border-botanical-beige rounded-md">
                  <button 
                    onClick={decrementQuantity}
                    className="px-3 py-1 text-botanical-dark hover:bg-botanical-beige/20 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-botanical-dark">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-3 py-1 text-botanical-dark hover:bg-botanical-beige/20 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6 mb-8">
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex items-center justify-center w-full py-3 px-4 rounded transition-colors ${
                    isAdded 
                      ? 'bg-botanical-olive text-botanical-white' 
                      : 'bg-botanical-clay text-botanical-white hover:bg-botanical-clay/90'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="mr-2 h-5 w-5" /> Adicionado
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="mr-2 h-5 w-5" /> Adicionar ao carrinho
                    </>
                  )}
                </button>
                <button onClick={handleContact} className="botanical-button-secondary">
                  Consultar
                </button>
              </div>
              
              <div className="mt-10">
                <h2 className="text-2xl font-playfair mb-4">Sobre este produto</h2>
                <div dangerouslySetInnerHTML={{__html: product.fullDescription}} className="prose prose-olive max-w-none space-y-4 text-botanical-dark/80">
                </div>
                
                {product.ingredients && (
                  <div className="mt-8">
                    <h3 className="font-medium text-lg mb-2">Ingredientes:</h3>
                    <p className="text-sm text-botanical-dark/70 italic">{product.ingredients}</p>
                  </div>
                )}
                
                {product.origen && (
                  <div className="mt-6">
                    <p className="text-sm text-botanical-dark/70">
                      <span className="font-medium">Origem:</span> {product.origen}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
