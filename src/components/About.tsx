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
              <p className="mb-4">
                Possui graduação em Ciências Biológicas pela Universidade Federal do Paraná, 
                Mestrado e Doutorado em Agronomia - Produção Vegetal pela Universidade Federal do Paraná 
                e Pós-graduação em Inovação em Medicamentos da Biodiversidade, pela Fiocruz.
              </p>
              <p className="mb-4">
                É pesquisadora na área de etnobiodiversidade, plantas bioativas e cadeias de valor 
                de óleos essenciais e vegetais no Brasil.
              </p>
              <p>
                É fundadora da Terroá Biocosmética, que desenvolve cosméticos naturais ricos em ativos da flora brasileira.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-botanical-light p-4 rounded-md flex-1 min-w-[180px]">
                <div className="text-botanical-olive text-4xl font-playfair mb-2">10+</div>
                <div className="text-botanical-dark">Anos de Pesquisa</div>
              </div>
              <div className="bg-botanical-light p-4 rounded-md flex-1 min-w-[180px]">
                <div className="text-botanical-olive text-4xl font-playfair mb-2">15+</div>
                <div className="text-botanical-dark">Óleos Essenciais Estudados</div>
              </div>
              <div className="bg-botanical-light p-4 rounded-md flex-1 min-w-[180px]">
                <div className="text-botanical-olive text-4xl font-playfair mb-2">3+</div>
                <div className="text-botanical-dark">Publicações Científicas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;