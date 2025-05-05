
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { courseService } from "@/lib/supabase";
import { Course } from "@/types";
import { toast } from "sonner";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Erro ao carregar cursos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section id="courses" className="py-20 bg-botanical-beige/30">
      <div className="botanical-container">
        <h2 className="section-title text-center mx-auto">Cursos</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-botanical-dark/80">
          Aprofunde seus conhecimentos sobre a flora brasileira e seus benefícios através dos cursos especializados.
        </p>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-botanical-olive border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {courses.length === 0 ? (
              <div className="col-span-full text-center py-10 text-gray-500">
                Nenhum curso disponível no momento.
              </div>
            ) : (
              courses.map((course) => (
                <div key={course.id} className="bg-botanical-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute top-3 right-3 bg-botanical-copper text-botanical-white text-xs font-medium py-1 px-2 rounded">
                      {course.type}
                    </div>
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Imagem+não+disponível";
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair text-xl mb-2 text-botanical-dark">{course.title}</h3>
                    <p className="text-sm text-botanical-olive font-medium mb-3">{course.subtitle}</p>
                    <p className="text-botanical-dark/70 mb-6 line-clamp-3">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <Link to={`/curso/${course.id}`} className="botanical-button-primary text-sm py-2">Saiba mais</Link>
                      <a href="#" className="text-botanical-olive hover:text-botanical-dark transition-colors">
                        Adquirir
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;
