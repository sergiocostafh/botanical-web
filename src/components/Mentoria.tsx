import { Leaf, Beaker, Lightbulb, Shield, Heart } from "lucide-react";

const Mentoria = () => {
  return (
    <section id="mentoria" className="py-20 bg-botanical-light">
      <div className="botanical-container">
        <div className="text-center mb-16">
          <h2 className="section-title text-center">Mentoria Especializada</h2>
          <p className="text-lg text-botanical-dark/70 max-w-3xl mx-auto leading-relaxed">
            Um programa completo para profissionais, terapeutas e formuladores interessados em aprofundar seus conhecimentos sobre ativos vegetais brasileiros
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-16">
          {/* Content Box - O que você aprenderá */}
          <div className="order-2 lg:order-1">
            <div className="bg-botanical-white rounded-lg p-8 shadow-sm h-full flex flex-col">
              <h3 className="text-2xl font-playfair font-medium mb-6 text-botanical-dark">
                O que você aprenderá
              </h3>
              <div className="prose prose-lg max-w-none text-botanical-dark/80 leading-relaxed flex-grow">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Leaf className="w-5 h-5 text-botanical-olive mt-1 mr-3 flex-shrink-0" />
                    <span>Aspectos botânicos e ecológicos das espécies nativas</span>
                  </li>
                  <li className="flex items-start">
                    <Beaker className="w-5 h-5 text-botanical-olive mt-1 mr-3 flex-shrink-0" />
                    <span>Composição fitoquímica e propriedades funcionais</span>
                  </li>
                  <li className="flex items-start">
                    <Lightbulb className="w-5 h-5 text-botanical-olive mt-1 mr-3 flex-shrink-0" />
                    <span>Estratégias para desenvolvimento de formulações</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="w-5 h-5 text-botanical-olive mt-1 mr-3 flex-shrink-0" />
                    <span>Aplicações seguras em aromaterapia e cosmetologia natural</span>
                  </li>
                  <li className="flex items-start">
                    <Heart className="w-5 h-5 text-botanical-olive mt-1 mr-3 flex-shrink-0" />
                    <span>Valorização da biodiversidade brasileira</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Content Box - Para Quem é a Mentoria */}
          <div className="order-1 lg:order-2">
            <div className="bg-botanical-white rounded-lg p-8 shadow-sm h-full flex flex-col">
              <h3 className="text-2xl font-playfair font-medium mb-6 text-botanical-dark">
                Para Quem é a Mentoria
              </h3>
              <div className="prose prose-lg max-w-none text-botanical-dark/80 leading-relaxed flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-botanical-olive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Aromaterapeutas:</strong> que desejam se especializar em óleos essenciais brasileiros e suas aplicações terapêuticas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-botanical-olive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Formuladores de cosméticos:</strong> interessados em incorporar ativos vegetais nativos em suas formulações</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-botanical-olive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Profissionais da saúde:</strong> que buscam integrar terapias naturais baseadas na flora brasileira</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-botanical-olive rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Empreendedores:</strong> que desejam desenvolver produtos naturais com base científica sólida</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included Section */}
        <div className="bg-botanical-white rounded-lg p-8 shadow-sm mb-12">
          <h3 className="text-2xl font-playfair font-medium mb-8 text-botanical-dark text-center">
            O Que Está Incluído na Mentoria
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-botanical-olive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className="font-semibold text-botanical-dark mb-2">Material Científico Exclusivo</h4>
              <p className="text-botanical-dark/70 text-sm">
                Conteúdo baseado em pesquisas atuais sobre bioativos da flora brasileira
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-botanical-olive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h4 className="font-semibold text-botanical-dark mb-2">Análise de Casos Reais</h4>
              <p className="text-botanical-dark/70 text-sm">
                Estudos de aplicação prática com resultados comprovados
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-botanical-olive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h4 className="font-semibold text-botanical-dark mb-2">Acompanhamento Individual</h4>
              <p className="text-botanical-dark/70 text-sm">
                Orientação personalizada para seus projetos específicos
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-botanical-olive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h4 className="font-semibold text-botanical-dark mb-2">Banco de Ativos Vegetais</h4>
              <p className="text-botanical-dark/70 text-sm">
                Acesso exclusivo ao banco de dados de plantas medicinais brasileiras
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-botanical-olive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧪</span>
              </div>
              <h4 className="font-semibold text-botanical-dark mb-2">Protocolos de Formulação</h4>
              <p className="text-botanical-dark/70 text-sm">
                Métodos práticos para desenvolvimento de produtos naturais
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-botanical-olive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h4 className="font-semibold text-botanical-dark mb-2">Certificado de Conclusão</h4>
              <p className="text-botanical-dark/70 text-sm">
                Reconhecimento oficial da sua especialização
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-playfair font-medium mb-4 text-botanical-dark">
            Transforme seu Conhecimento em Expertise
          </h3>
          <p className="text-lg text-botanical-dark/70 mb-8 max-w-2xl mx-auto">
            Junte-se a uma mentoria que combina ciência, prática e sustentabilidade para formar especialistas em bioativos vegetais brasileiros.
          </p>
          <button className="botanical-button-primary text-lg px-8 py-4">
            Saber Mais Sobre a Mentoria
          </button>
        </div>
      </div>
    </section>
  );
};

export default Mentoria;
