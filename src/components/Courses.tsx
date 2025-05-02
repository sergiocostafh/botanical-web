
const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Aromaterapia Brasileira",
      subtitle: "15 Óleos Essenciais da Flora Nativa",
      description: "Descubra os segredos dos óleos essenciais nativos do Brasil e suas aplicações terapêuticas.",
      image: "https://images.unsplash.com/photo-1515012003482-7e5c4c6a85d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      type: "Curso gravado",
    },
    {
      id: 2,
      title: "Óleos e Manteigas Vegetais do Brasil",
      subtitle: "Propriedades e Aplicações",
      description: "Aprenda sobre os diversos óleos e manteigas vegetais brasileiros e suas aplicações em cosméticos naturais.",
      image: "https://images.unsplash.com/photo-1616788075152-d107eb72c133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      type: "Curso gravado",
    },
    {
      id: 3,
      title: "Óleos graxos e Manteigas da Amazônia",
      subtitle: "Bioativos da Floresta Amazônica",
      description: "Um mergulho profundo nos tesouros da biodiversidade amazônica e seu potencial cosmético e terapêutico.",
      image: "https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      type: "Aula gravada",
    },
  ];

  return (
    <section id="courses" className="py-20 bg-botanical-beige/30">
      <div className="botanical-container">
        <h2 className="section-title text-center mx-auto">Cursos</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-botanical-dark/80">
          Aprofunde seus conhecimentos sobre a flora brasileira e seus benefícios através dos cursos especializados.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {courses.map((course) => (
            <div key={course.id} className="bg-botanical-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute top-3 right-3 bg-botanical-copper text-botanical-white text-xs font-medium py-1 px-2 rounded">
                  {course.type}
                </div>
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl mb-2 text-botanical-dark">{course.title}</h3>
                <p className="text-sm text-botanical-olive font-medium mb-3">{course.subtitle}</p>
                <p className="text-botanical-dark/70 mb-6 line-clamp-3">{course.description}</p>
                <div className="flex justify-between items-center">
                  <button className="botanical-button-primary text-sm py-2">Saiba mais</button>
                  <button className="text-botanical-olive hover:text-botanical-dark transition-colors">
                    Adquirir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
