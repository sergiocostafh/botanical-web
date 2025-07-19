
import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { courseService } from "@/lib/supabase";
import { Course } from "@/types";
import { toast } from "sonner";

const CourseDetails = () => {
  const [match, params] = useRoute("/curso/:courseId");
  const courseId = params?.courseId;
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      
      try {
        const data = await courseService.getCourse(courseId);
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("Erro ao carregar detalhes do curso");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-botanical-white">
        <Header />
        <div className="botanical-container py-32 flex justify-center">
          <div className="animate-spin w-10 h-10 border-4 border-botanical-olive border-t-transparent rounded-full"></div>
        </div>
        <Footer />
      </div>
    );
  }

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
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Imagem+não+disponível";
                }}
              />
            </div>
            
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl mb-2 text-botanical-dark">{course.title}</h1>
              <p className="text-lg text-botanical-olive font-medium mb-4">{course.subtitle}</p>
              
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="bg-botanical-beige/50 px-3 py-2 rounded-md">
                  <span className="font-medium">Tipo:</span> {course.type}
                </div>
              </div>
              
              <button onClick={handleContact} className="botanical-button-primary w-full sm:w-auto mb-6">
                Quero me inscrever
              </button>
              
              <div className="mt-10">
                <h2 className="text-2xl font-playfair mb-4">Sobre este curso</h2>
                <div className="prose prose-olive max-w-none space-y-4 text-botanical-dark/80">
                  <p>{course.description}</p>
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
