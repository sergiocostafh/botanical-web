
const Shop = () => {
  return (
    <section id="shop" className="py-20 bg-botanical-white">
      <div className="botanical-container">
        <h2 className="section-title text-center mx-auto">Loja</h2>
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-botanical-dark/80 leading-relaxed mb-6">
            Inspirada na biodiversidade do Brasil, a Terroá desenvolve cosméticos naturais, minimalistas e aromáticos, aliando ciência e inovação para oferecer formulações eficazes, sensoriais e ricas em ativos antioxidantes e regeneradores.
          </p>
          <p className="text-botanical-dark/80 mb-8">
            Conheça a linha completa de biocosméticos da Terroá.
          </p>
          <button 
            onClick={() => window.open("https://www.terroabiocosmetica.com.br/", "_blank")}
            className="botanical-button-primary"
          >
            Visite a loja Terroá Biocosmética
          </button>
        </div>
      </div>
    </section>
  );
};

export default Shop;
