
import { Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="text-botanical-white pt-12 pb-6 bg-black">
      <div className="botanical-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Contact */}
          <div className="md:col-span-1">
            <h3 className="font-playfair text-2xl mb-4 text-botanical-white">Amanda D'Angelis</h3>
            <p className="text-botanical-white/70 mb-6 leading-relaxed">
              Pesquisadora, especialista em bioativos da flora brasileira e fundadora da Terroá Biocosmética.
            </p>
            <div className="flex flex-col space-y-3">
              <a href="mailto:contato@example.com" className="flex items-center text-botanical-white/70 hover:text-botanical-white transition-colors">
                <Mail className="mr-2 h-5 w-5" />
                <span>contato@example.com</span>
              </a>
              <a href="tel:+5500000000000" className="flex items-center text-botanical-white/70 hover:text-botanical-white transition-colors">
                <Phone className="mr-2 h-5 w-5" />
                <span>+55 (00) 00000-0000</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4 text-botanical-white">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-botanical-white/70 hover:text-botanical-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-botanical-white/70 hover:text-botanical-white transition-colors">Quem Sou</a>
              </li>
              <li>
                <a href="#mentoria" className="text-botanical-white/70 hover:text-botanical-white transition-colors">Mentoria</a>
              </li>
              <li>
                <a href="#courses" className="text-botanical-white/70 hover:text-botanical-white transition-colors">Cursos</a>
              </li>
              <li>
                <a href="#shop" className="text-botanical-white/70 hover:text-botanical-white transition-colors">Loja</a>
              </li>
              <li>
                <a href="#publications" className="text-botanical-white/70 hover:text-botanical-white transition-colors">Publicações</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-medium text-lg mb-4 text-botanical-white">Siga nas redes</h3>
            <p className="text-botanical-white/70 mb-4">
              Acompanhe novidades e lançamentos nas redes sociais.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-botanical-white/10 hover:bg-botanical-white/20 p-3 rounded-full transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-botanical-white/10 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-botanical-white/50 text-sm">
              © Amanda D'Angelis – {new Date().getFullYear()}. Todos os direitos reservados.
            </p>
            <p className="text-botanical-white/50 text-sm italic mt-2 md:mt-0">
              "A natureza em sua forma mais pura e consciente."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
