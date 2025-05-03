
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  subtitle: z.string().min(3, "O subtítulo deve ter pelo menos 3 caracteres"),
  type: z.string().min(3, "O tipo deve ser especificado"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  image: z.string().url("A URL da imagem deve ser válida")
});

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      type: "",
      description: "",
      image: ""
    }
  });

  useEffect(() => {
    // Simulate fetching course data
    const fetchCourse = () => {
      setIsLoading(true);
      // This would normally be an API call, but for now we simulate with local data
      setTimeout(() => {
        const courses = [
          {
            id: "aromaterapia-brasileira",
            title: "Aromaterapia Brasileira",
            subtitle: "15 Óleos Essenciais da Flora Nativa",
            type: "Curso gravado",
            description: "Descubra os segredos dos óleos essenciais nativos do Brasil e suas aplicações terapêuticas.",
            image: "https://images.unsplash.com/photo-1515012003482-7e5c4c6a85d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
          {
            id: "oleos-manteigas-vegetais-brasil",
            title: "Óleos e Manteigas Vegetais do Brasil",
            subtitle: "Propriedades e Aplicações",
            type: "Curso gravado",
            description: "Aprenda sobre os diversos óleos e manteigas vegetais brasileiros e suas aplicações em cosméticos naturais.",
            image: "https://images.unsplash.com/photo-1616788075152-d107eb72c133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
          {
            id: "oleos-manteigas-amazonia",
            title: "Óleos graxos e Manteigas da Amazônia",
            subtitle: "Bioativos da Floresta Amazônica",
            type: "Aula gravada",
            description: "Um mergulho profundo nos tesouros da biodiversidade amazônica e seu potencial cosmético e terapêutico.",
            image: "https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
        ];
        
        const course = courses.find(c => c.id === courseId);
        
        if (course) {
          form.reset({
            title: course.title,
            subtitle: course.subtitle,
            type: course.type,
            description: course.description,
            image: course.image
          });
        } else {
          toast.error("Curso não encontrado");
          navigate("/admin/courses");
        }
        
        setIsLoading(false);
      }, 500);
    };

    fetchCourse();
  }, [courseId, form, navigate]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate API call to update course
    setTimeout(() => {
      toast.success("Curso atualizado com sucesso!");
      setIsLoading(false);
      navigate("/admin/courses");
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-playfair font-bold text-botanical-dark">Editar Curso</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Título do curso" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtítulo</FormLabel>
                      <FormControl>
                        <Input placeholder="Subtítulo do curso" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <FormControl>
                        <Input placeholder="Tipo do curso" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descrição detalhada do curso" 
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL da Imagem</FormLabel>
                      <FormControl>
                        <Input placeholder="https://exemplo.com/imagem.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("image") && (
                  <div className="mt-2">
                    <p className="text-sm mb-2">Pré-visualização:</p>
                    <div className="border rounded-md overflow-hidden h-40 bg-gray-50">
                      <img 
                        src={form.watch("image")} 
                        alt="Pré-visualização" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Erro+de+carregamento";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button" 
                variant="outline" 
                onClick={() => navigate("/admin/courses")}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-botanical-olive hover:bg-botanical-olive/90"
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default EditCourse;
