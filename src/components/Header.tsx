
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-botanical-white/95 backdrop-blur-sm shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="botanical-container flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-botanical-olive font-playfair text-2xl md:text-3xl">
          Amanda D'Angelis
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#home" className="header-link">Home</a>
          <a href="#about" className="header-link">Quem Sou</a>
          <a href="#courses" className="header-link">Cursos</a>
          <a href="#shop" className="header-link">Loja</a>
          <a href="#publications" className="header-link">Publicações</a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-botanical-dark hover:text-botanical-olive"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-botanical-white z-50 transition-transform duration-300 transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <span className="text-botanical-olive font-playfair text-2xl">Amanda D'Angelis</span>
            <button 
              className="text-botanical-dark hover:text-botanical-olive"
              onClick={closeMenu}
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 text-xl">
            <a href="#home" className="header-link" onClick={closeMenu}>Home</a>
            <a href="#about" className="header-link" onClick={closeMenu}>Quem Sou</a>
            <a href="#courses" className="header-link" onClick={closeMenu}>Cursos</a>
            <a href="#shop" className="header-link" onClick={closeMenu}>Loja</a>
            <a href="#publications" className="header-link" onClick={closeMenu}>Publicações</a>
          </nav>

          <div className="mt-auto pb-8">
            <p className="text-botanical-dark/70 italic text-sm">
              "A natureza em sua forma mais pura e consciente."
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
