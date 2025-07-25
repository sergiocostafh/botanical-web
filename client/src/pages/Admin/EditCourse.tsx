
import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import AdminLayout from "@/components/AdminLayout";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { courseService } from "@/lib/supabase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const formSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  subtitle: z.string().min(3, "O subtítulo deve ter pelo menos 3 caracteres"),
  type: z.string().min(3, "O tipo deve ser especificado"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  image: z.string().url("Insira uma URL válida para a imagem").optional().or(z.literal("")),
  paymentLink: z.string().url("Insira uma URL válida para o pagamento").optional().or(z.literal(""))
});

const EditCourse = () => {
  const [match, params] = useRoute("/admin/courses/edit/:courseId");
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const courseId = params?.courseId;

  // Configuração do React Quill
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block', 'link'
  ];
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      type: "",
      description: "",
      image: "",
      paymentLink: ""
    }
  });

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        const course = await courseService.getCourse(courseId);
        console.log("Fetched course:", course);
        form.reset({
          title: course.title,
          subtitle: course.subtitle,
          type: course.type,
          description: course.description,
          image: course.image || "",
          paymentLink: course.paymentLink || ""
        });
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error("Erro ao carregar informações do curso");
        setLocation("/admin/courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, form, setLocation]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!courseId) return;
    
    setIsLoading(true);
    try {
      console.log("Updating course with data:", data);
      await courseService.updateCourse(courseId, {
        title: data.title,
        subtitle: data.subtitle,
        type: data.type,
        description: data.description,
        image: data.image || "",
        paymentLink: data.paymentLink || ""
      });
      toast.success("Curso atualizado com sucesso!");
      setLocation("/admin/courses");
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Erro ao atualizar curso");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-playfair font-bold text-botanical-dark">Editar Curso</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <div className="bg-white">
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Descrição detalhada do curso..."
                        style={{ 
                          minHeight: '200px',
                          backgroundColor: 'white'
                        }}
                        className="rich-text-editor"
                      />
                    </div>
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
                    <Input 
                      placeholder="https://exemplo.com/imagem.jpg" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link para Pagamento</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://exemplo.com/pagamento" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button" 
                variant="outline" 
                onClick={() => setLocation("/admin/courses")}
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
