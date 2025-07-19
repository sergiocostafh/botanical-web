
import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import AdminLayout from "@/components/AdminLayout";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { publicationService } from "@/lib/supabase";

const formSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  journal: z.string().min(3, "O nome do periódico deve ter pelo menos 3 caracteres"),
  year: z.string().min(4, "O ano deve ter pelo menos 4 caracteres"),
  abstract: z.string().optional(),
  link: z.string().url("Insira um URL válido").optional().or(z.literal("")),
});

const EditPublication = () => {
  const [match, params] = useRoute("/admin/publications/edit/:publicationId");
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const publicationId = params?.publicationId;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      journal: "",
      year: "",
      abstract: "",
      link: ""
    }
  });

  useEffect(() => {
    if (!publicationId) return;

    const fetchPublication = async () => {
      setIsLoading(true);
      try {
        const publication = await publicationService.getPublication(Number(publicationId));
        form.reset({
          title: publication.title,
          journal: publication.journal,
          year: publication.year,
          abstract: publication.abstract || "",
          link: publication.link || ""
        });
      } catch (error) {
        console.error("Error fetching publication:", error);
        toast.error("Erro ao carregar informações da publicação");
        setLocation("/admin/publications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublication();
  }, [publicationId, form, setLocation]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!publicationId) return;
    
    setIsLoading(true);
    try {
      await publicationService.updatePublication(Number(publicationId), {
        title: data.title,
        journal: data.journal,
        year: data.year,
        abstract: data.abstract || undefined,
        link: data.link || undefined
      });
      toast.success("Publicação atualizada com sucesso!");
      setLocation("/admin/publications");
    } catch (error) {
      console.error("Error updating publication:", error);
      toast.error("Erro ao atualizar publicação");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-playfair font-bold text-botanical-dark">Editar Publicação</h1>
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
                    <Input placeholder="Título da publicação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="journal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Revista/Periódico</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da revista ou periódico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Input placeholder="Ano de publicação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="abstract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resumo</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Resumo da publicação" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Link para a publicação completa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button" 
                variant="outline" 
                onClick={() => navigate("/admin/publications")}
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

export default EditPublication;
