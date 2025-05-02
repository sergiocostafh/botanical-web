
const Publications = () => {
  const publications = [
    {
      id: 1,
      title: "MERCADO MUNDIAL DE ÓLEOS ESSENCIAIS E POSIÇÃO DA INDÚSTRIA BRASILEIRA",
      journal: "Revista de Economia & Tecnologia",
      year: "2023",
      abstract: "Este estudo examina o mercado mundial de óleos essenciais e a posição do Brasil nesse cenário. A pesquisa analisa tendências de mercado, oportunidades e desafios enfrentados pela indústria brasileira de óleos essenciais.",
      link: "#"
    },
    {
      id: 2,
      title: "Estudio etnobotánico de Cataia (Pimenta pseudocaryophyllus (Gomes) Landrum) en el Parque Nacional de Superagui, Guaraqueçaba/PR/Brasil",
      journal: "Journal of Ethnobiology and Ethnomedicine",
      year: "2022",
      abstract: "Este estudo etnobotânico documenta o uso tradicional da Cataia (Pimenta pseudocaryophyllus) por comunidades tradicionais no Parque Nacional do Superagui, investigando suas propriedades e importância cultural.",
      link: "#"
    }
  ];

  return (
    <section id="publications" className="py-20 bg-botanical-beige/30">
      <div className="botanical-container">
        <h2 className="section-title text-center mx-auto">Publicações Científicas</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-botanical-dark/80">
          Contribuições para o conhecimento científico sobre bioativos e etnobotânica brasileira.
        </p>
        
        <div className="space-y-8 mt-12">
          {publications.map((publication) => (
            <div 
              key={publication.id} 
              className="bg-botanical-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-botanical-clay"
            >
              <h3 className="font-playfair text-xl mb-2 text-botanical-dark">{publication.title}</h3>
              <div className="flex items-center text-sm text-botanical-dark/70 mb-4">
                <span className="font-medium text-botanical-olive">{publication.journal}</span>
                <span className="mx-2">•</span>
                <span>{publication.year}</span>
              </div>
              <p className="text-botanical-dark/80 mb-4">{publication.abstract}</p>
              <a 
                href={publication.link}
                className="inline-flex items-center text-botanical-olive hover:text-botanical-dark transition-colors font-medium"
              >
                Ler publicação completa
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-botanical-light rounded-lg">
          <h3 className="font-playfair text-xl mb-4 text-botanical-dark text-center">Colaborações Científicas</h3>
          <p className="text-center text-botanical-dark/80 mb-6">
            Interessado em colaborar em pesquisas sobre bioativos da flora brasileira?
          </p>
          <div className="text-center">
            <a 
              href="mailto:contato@example.com" 
              className="botanical-button-primary inline-flex items-center"
            >
              Entre em contato
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
