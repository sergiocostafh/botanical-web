
import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { Menu, X } from "lucide-react";
import CartIcon from "./CartIcon";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";
  const scrollPosition = useScrollPosition();
  const [isScrolled, setIsScrolled] = useState(false);
  const isAdmin = location.includes("/admin");

  useEffect(() => {
    setIsScrolled(scrollPosition > 50);
  }, [scrollPosition]);
  
  if (isAdmin) {
    return null; // Não renderiza o header em páginas admin
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? "bg-botanical-dark/95 py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="botanical-container flex justify-between items-center">
        <Link to="/" className="font-playfair text-botanical-white text-xl">
          Amanda D'Angelis
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/#about"
            className="text-botanical-white hover:text-botanical-beige transition-colors"
          >
            Sobre
          </Link>
          <Link
            to="/#mentoria"
            className="text-botanical-white hover:text-botanical-beige transition-colors"
          >
            Mentoria
          </Link>
          <Link
            to="/#courses"
            className="text-botanical-white hover:text-botanical-beige transition-colors"
          >
            Cursos
          </Link>
          <Link
            to="/#shop"
            className="text-botanical-white hover:text-botanical-beige transition-colors"
          >
            Loja
          </Link>
          <Link
            to="/#publications"
            className="text-botanical-white hover:text-botanical-beige transition-colors"
          >
            Publicações
          </Link>
          <CartIcon />
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-botanical-white hover:text-botanical-beige transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-botanical-dark/95 py-4 shadow-lg">
          <div className="botanical-container flex flex-col space-y-4">
            <Link
              to="/#about"
              className="text-botanical-white hover:text-botanical-beige transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="/#mentoria"
              className="text-botanical-white hover:text-botanical-beige transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Mentoria
            </Link>
            <Link
              to="/#courses"
              className="text-botanical-white hover:text-botanical-beige transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cursos
            </Link>
            <Link
              to="/#shop"
              className="text-botanical-white hover:text-botanical-beige transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Loja
            </Link>
            <Link
              to="/#publications"
              className="text-botanical-white hover:text-botanical-beige transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Publicações
            </Link>
            <div className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <CartIcon />
              <span className="ml-2 text-botanical-white">Carrinho</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
