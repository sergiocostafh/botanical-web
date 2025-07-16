import { Leaf, Beaker, Lightbulb, Shield, Heart, Droplet } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const Mentoria = () => {
  return <section id="mentoria" className="py-20 bg-botanical-light">
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
                    <Droplet className="w-5 h-5 text-botanical-olive mt-1 mr-3 flex-shrink-0" />
                    <span>Óleos essenciais, manteigas e óleos vegetais da flora brasileira</span>
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

        {/* Depoimentos Section */}
        <div className="bg-botanical-white rounded-lg p-8 shadow-sm mb-12">
          <h3 className="text-2xl font-playfair font-medium mb-8 text-botanical-dark text-center">
            Depoimentos
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Depoimento 1 - Samantha Scardazan */}
            <div className="bg-botanical-light rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Avatar className="w-20 h-20 mr-4">
                  <AvatarImage alt="Samantha Scardazan" src="/lovable-uploads/5a0f35b3-5645-4792-aa6e-3c635e0c1f14.jpg" />
                  <AvatarFallback className="bg-botanical-olive text-botanical-white font-medium">SS</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-botanical-dark">Samantha Scardazan</h4>
                  <p className="text-sm text-botanical-dark/70">Terapeuta Integrativa e Esteticista Natural. Especialista em Psicodermatoses e Peles Sensíveis</p>
                </div>
              </div>
              <blockquote className="text-botanical-dark/80 italic leading-relaxed">
                "Estou encantada! A prof dra. Amanda e dona de uma inteligência absoluta, simplicidade, conhecimento e leveza. Ela fez a chave e abriu um caminho que só espiávamos pelo buraco da fechadura. Aprofundei o estudo dos óleos essenciais que já estão na minha prática e coração."
              </blockquote>
            </div>

            {/* Depoimento 2 - Carol Oliver */}
            <div className="bg-botanical-light rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Avatar className="w-20 h-20 mr-4">
                  <AvatarImage alt="Carol Oliver" src="/lovable-uploads/e2103d74-e24b-4cf0-9ce9-1195ef5963f4.jpg" />
                  <AvatarFallback className="bg-botanical-olive text-botanical-white font-medium">CO</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-botanical-dark">Carol Oliver</h4>
                  <p className="text-sm text-botanical-dark/70">Naturopata, dedicada à Aromaterapia Clínica e Vibracional e Florais de Bach. Criadora da Insight Aromas</p>
                </div>
              </div>
              <blockquote className="text-botanical-dark/80 italic leading-relaxed">
                "Tive a maravilhosa oportunidade de aprofundar meus conhecimentos sobre óleos essenciais do Brasil de uma maneira muito especial com a Amanda D'angelis. Me encantei e me surpreendi com o potencial terapêutico das plantas aromáticas do nosso país. Os óleos essenciais brasileiros revelam a força curativa da natureza nativa do nosso país. Trazem a magia e a energia ancestral da floresta brasileira. Com esse transformador conhecimento em mãos, tomei a sábia decisão de reformular a linha Alquimias Insight, incluindo óleos essenciais brasileiros. Agora, a alquimia está completa!"
              </blockquote>
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
    </section>;
};
export default Mentoria;