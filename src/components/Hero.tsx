
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const scrollToSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-botanical-dark/40"></div>
      
      {/* Content */}
      <div className="botanical-container relative z-10 text-botanical-white text-center px-4">
        <div className="animate-fade-in">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6">
            Amanda D'Angelis
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-xl mx-auto">
            Aromaterapia, Perfumaria Botânica & Bioativos da Flora Brasileira
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="#about" className="botanical-button-primary">Conheça meu Trabalho</Link>
            <Link to="#shop" className="botanical-button-secondary">Visite a Loja</Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce" onClick={scrollToSection}>
        <ChevronDown className="text-botanical-white h-8 w-8" />
      </div>
    </section>
  );
};

export default Hero;
