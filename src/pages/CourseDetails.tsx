
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

// Dados dos cursos - em uma aplicação real, esses dados viriam de uma API
const coursesData = [
  {
    id: "aromaterapia-brasileira",
    title: "Aromaterapia Brasileira",
    subtitle: "15 Óleos Essenciais da Flora Nativa",
    description: "Descubra os segredos dos óleos essenciais nativos do Brasil e suas aplicações terapêuticas.",
    image: "https://images.unsplash.com/photo-1515012003482-7e5c4c6a85d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    type: "Curso gravado",
    fullDescription: `
      <p>Este curso abrangente explora 15 óleos essenciais nativos da flora brasileira, revelando suas propriedades terapêuticas únicas e aplicações práticas na aromaterapia.</p>
      
      <h3>O que você vai aprender:</h3>
      <ul>
        <li>História e fundamentos da aromaterapia brasileira</li>
        <li>Métodos de extração e qualidade dos óleos essenciais</li>
        <li>Composição química e propriedades de 15 óleos nativos</li>
        <li>Aplicações terapêuticas e cosméticas</li>
        <li>Combinações sinérgicas entre óleos brasileiros e tradicionais</li>
        <li>Aspectos de sustentabilidade na produção de óleos essenciais</li>
      </ul>

      <h3>Inclui:</h3>
      <ul>
        <li>12 horas de aulas gravadas</li>
        <li>Material de apoio em PDF</li>
        <li>Certificado de conclusão</li>
        <li>Acesso por 1 ano</li>
      </ul>
    `,
    price: "R$ 597,00",
    duration: "12 horas",
    level: "Iniciante a intermediário"
  },
  {
    id: "oleos-manteigas-vegetais-brasil",
    title: "Óleos e Manteigas Vegetais do Brasil",
    subtitle: "Propriedades e Aplicações",
    description: "Aprenda sobre os diversos óleos e manteigas vegetais brasileiros e suas aplicações em cosméticos naturais.",
    image: "https://images.unsplash.com/photo-1616788075152-d107eb72c133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    type: "Curso gravado",
    fullDescription: `
      <p>Mergulhe no universo dos óleos e manteigas vegetais da biodiversidade brasileira, suas características únicas e aplicações em formulações naturais.</p>
      
      <h3>O que você vai aprender:</h3>
      <ul>
        <li>Composição e propriedades dos principais óleos e manteigas vegetais do Brasil</li>
        <li>Métodos de extração e processamento</li>
        <li>Avaliação de qualidade e conservação</li>
        <li>Aplicações cosméticas e terapêuticas</li>
        <li>Formulações básicas para cosméticos naturais</li>
        <li>Cadeias de valor sustentáveis</li>
      </ul>

      <h3>Inclui:</h3>
      <ul>
        <li>10 horas de aulas gravadas</li>
        <li>Apostilas com fórmulas</li>
        <li>Certificado de conclusão</li>
        <li>Acesso por 1 ano</li>
      </ul>
    `,
    price: "R$ 547,00",
    duration: "10 horas",
    level: "Intermediário"
  },
  {
    id: "oleos-manteigas-amazonia",
    title: "Óleos graxos e Manteigas da Amazônia",
    subtitle: "Bioativos da Floresta Amazônica",
    description: "Um mergulho profundo nos tesouros da biodiversidade amazônica e seu potencial cosmético e terapêutico.",
    image: "https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    type: "Aula gravada",
    fullDescription: `
      <p>Especialização exclusiva focada nos óleos graxos e manteigas da Floresta Amazônica, explorando seus bioativos, aplicações e importância para comunidades locais.</p>
      
      <h3>O que você vai aprender:</h3>
      <ul>
        <li>Biodiversidade amazônica e seus bioativos</li>
        <li>Propriedades fitoquímicas dos óleos amazônicos</li>
        <li>Métodos tradicionais e modernos de extração</li>
        <li>Aplicações em cosméticos avançados</li>
        <li>Aspectos socioeconômicos e sustentabilidade</li>
        <li>Pesquisa científica e inovação com óleos amazônicos</li>
      </ul>

      <h3>Inclui:</h3>
      <ul>
        <li>6 horas de aula gravada intensiva</li>
        <li>Materiais complementares</li>
        <li>Certificado de participação</li>
        <li>Acesso por 1 ano</li>
      </ul>
    `,
    price: "R$ 397,00",
    duration: "6 horas",
    level: "Intermediário a avançado"
  }
];

const CourseDetails = () => {
  const { courseId } = useParams();
  const course = coursesData.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-botanical-white">
        <Header />
        <div className="botanical-container py-32 text-center">
          <h2 className="font-playfair text-3xl mb-4">Curso não encontrado</h2>
          <Link to="/#courses" className="botanical-button-primary inline-flex items-center mt-4">
            <ArrowLeft className="mr-2 h-5 w-5" /> Voltar para cursos
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleContact = () => {
    window.open("https://wa.me/5500000000000?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20curso%20" + encodeURIComponent(course.title), "_blank");
  };

  return (
    <div className="min-h-screen bg-botanical-white">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="botanical-container">
          <Link to="/#courses" className="inline-flex items-center text-botanical-olive hover:text-botanical-dark mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-5 w-5" /> Voltar para cursos
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="relative h-64 md:h-96 lg:h-full rounded-lg overflow-hidden">
              <div className="absolute top-3 right-3 bg-botanical-copper text-botanical-white text-xs font-medium py-1 px-2 rounded">
                {course.type}
              </div>
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl mb-2 text-botanical-dark">{course.title}</h1>
              <p className="text-lg text-botanical-olive font-medium mb-4">{course.subtitle}</p>
              
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="bg-botanical-beige/50 px-3 py-2 rounded-md">
                  <span className="font-medium">Duração:</span> {course.duration}
                </div>
                <div className="bg-botanical-beige/50 px-3 py-2 rounded-md">
                  <span className="font-medium">Nível:</span> {course.level}
                </div>
              </div>
              
              <p className="text-3xl text-botanical-olive font-playfair mb-6">{course.price}</p>
              
              <button onClick={handleContact} className="botanical-button-primary w-full sm:w-auto mb-6">
                Quero me inscrever
              </button>
              
              <div className="mt-10">
                <h2 className="text-2xl font-playfair mb-4">Sobre este curso</h2>
                <div dangerouslySetInnerHTML={{__html: course.fullDescription}} className="prose prose-olive max-w-none space-y-4 text-botanical-dark/80">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseDetails;
