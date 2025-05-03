
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
  journal: z.string().min(3, "O nome do periódico deve ter pelo menos 3 caracteres"),
  year: z.string().min(4, "O ano deve ter pelo menos 4 caracteres"),
  abstract: z.string().optional(),
  link: z.string().url("Insira um URL válido").optional().or(z.literal("")),
});

const EditPublication = () => {
  const { publicationId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
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
    // Simulate fetching publication data
    const fetchPublication = () => {
      setIsLoading(true);
      // This would normally be an API call, but for now we simulate with local data
      setTimeout(() => {
        const publications = [
          {
            id: 1,
            title: "MERCADO MUNDIAL DE ÓLEOS ESSENCIAIS E POSIÇÃO DA INDÚSTRIA BRASILEIRA",
            journal: "Revista de Economia & Tecnologia",
            year: "2023",
            abstract: "Este estudo examina o mercado mundial de óleos essenciais e a posição do Brasil nesse cenário. A pesquisa analisa tendências de mercado, oportunidades e desafios enfrentados pela indústria brasileira de óleos essenciais.",
            link: "https://example.com/publication1"
          },
          {
            id: 2,
            title: "Estudio etnobotánico de Cataia (Pimenta pseudocaryophyllus (Gomes) Landrum) en el Parque Nacional de Superagui",
            journal: "Journal of Ethnobiology and Ethnomedicine",
            year: "2022",
            abstract: "Este estudo etnobotânico documenta o uso tradicional da Cataia (Pimenta pseudocaryophyllus) por comunidades tradicionais no Parque Nacional do Superagui, investigando suas propriedades e importância cultural.",
            link: "https://example.com/publication2"
          }
        ];
        
        const publication = publications.find(p => p.id === Number(publicationId));
        
        if (publication) {
          form.reset({
            title: publication.title,
            journal: publication.journal,
            year: publication.year,
            abstract: publication.abstract,
            link: publication.link
          });
        } else {
          toast.error("Publicação não encontrada");
          navigate("/admin/publications");
        }
        
        setIsLoading(false);
      }, 500);
    };

    fetchPublication();
  }, [publicationId, form, navigate]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate API call to update publication
    setTimeout(() => {
      toast.success("Publicação atualizada com sucesso!");
      setIsLoading(false);
      navigate("/admin/publications");
    }, 1000);
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
