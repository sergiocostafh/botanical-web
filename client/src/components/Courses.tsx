
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { courseService } from "@/lib/supabase";
import { Course } from "@/types";
import { toast } from "sonner";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("Fetching courses...");
        const data = await courseService.getCourses();
        console.log("Courses fetched:", data);
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, courseTitle: string) => {
    console.error(`Error loading image for course: ${courseTitle}`);
    const target = e.target as HTMLImageElement;
    target.src = "https://placehold.co/600x400?text=Imagem+não+disponível";
  };

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
              courses.map((course) => {
                console.log("Rendering course:", course.title, "Image URL:", course.image);
                return (
                  <div key={course.id} className="bg-botanical-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <div className="absolute top-3 right-3 bg-botanical-copper text-botanical-white text-xs font-medium py-1 px-2 rounded z-10">
                        {course.type}
                      </div>
                      {course.image ? (
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                          onError={(e) => handleImageError(e, course.title)}
                          onLoad={() => console.log(`Image loaded successfully for: ${course.title}`)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Sem imagem</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-playfair text-xl mb-1 text-botanical-dark">{course.title}</h3>
                      <p className="text-sm text-botanical-olive font-medium mb-4">{course.subtitle}</p>
                      <div className="flex justify-between items-center">
                        <Link to={`/curso/${course.id}`} className="botanical-button-primary text-sm py-2">Saiba mais</Link>
                        {course.paymentLink ? (
                          <a 
                            href={course.paymentLink} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-botanical-olive hover:text-botanical-dark transition-colors font-medium"
                          >
                            Comprar curso
                          </a>
                        ) : (
                          <span className="text-gray-400">Em breve</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;
