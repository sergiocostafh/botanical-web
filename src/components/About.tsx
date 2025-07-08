const About = () => {
  return <section id="about" className="py-20 bg-botanical-white">
      <div className="botanical-container">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image */}
          <div className="lg:w-2/5 overflow-hidden rounded-lg">
            <img alt="Natureza brasileira" className="w-full h-auto object-cover aspect-[4/5]" src="/lovable-uploads/8c28f705-3c3c-4aff-af18-9a41d38b66b1.jpg" />
          </div>
          
          {/* Content */}
          <div className="lg:w-3/5">
            <h2 className="section-title">Quem é Amanda D'Angelis</h2>
            <div className="prose prose-lg max-w-none text-botanical-dark/80 leading-relaxed">
              <p className="mb-4">Amanda D'Angelis é doutora em Produção Vegetal e pós-graduada em Inovação em Medicamentos da Biodiversidade. Sua pesquisa é voltada para bioativos vegetais brasileiros, aromaterapia e desenvolvimento de formulações cosméticas naturais que valorizam a biodiversidade nacional.


Desde 2022, compartilha seu conhecimento científico sobre ativos vegetais brasileiros aplicados à aromaterapia, ministrando cursos em importantes escolas como CasaMay, IBRA e institutos de pesquisa. Sua abordagem alia fundamentação científica rigorosa à aplicação prática, sempre respeitando princípios de segurança e eficácia.


É fundadora da Terroá Biocosmética, marca criada a partir de sua paixão por integrar ciência, natureza e cuidado. Na Terroá, desenvolve cosméticos naturais aromáticos ricos em ativos vegetais genuinamente brasileiros, combinando excelência científica e respeito à biodiversidade e saúde integral. Através de sua mentoria especializada, Amanda oferece um programa completo para profissionais, terapeutas e formuladores interessados em aprofundar seus conhecimentos sobre ativos vegetais brasileiros, sempre fundamentado em evidência científica e práticas sustentáveis.</p>
              
              
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              
              
              
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;