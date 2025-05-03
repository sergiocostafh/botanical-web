
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
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "O preço deve ser um número positivo",
  }),
  category: z.string().min(1, "A categoria é obrigatória"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  image: z.string().url("A URL da imagem deve ser válida")
});

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      image: ""
    }
  });

  useEffect(() => {
    // Simulate fetching product data
    const fetchProduct = () => {
      setIsLoading(true);
      // This would normally be an API call, but for now we simulate with local data
      setTimeout(() => {
        const products = [
          {
            id: "leave-in-fortalecedor",
            name: "Leave-in Fortalecedor Capilar",
            price: 85.00,
            category: "terroa",
            description: "Um leave-in nutritivo e fortalecedor capilar formulado com ativos da biodiversidade brasileira. Ideal para todos os tipos de cabelo, oferece hidratação profunda e proteção contra danos externos.",
            image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
          {
            id: "mascara-facial-purificante",
            name: "Máscara Facial Purificante",
            price: 79.00,
            category: "terroa",
            description: "Máscara facial purificante enriquecida com argila branca e ativos botânicos brasileiros. Remove impurezas e excesso de oleosidade sem ressecar a pele.",
            image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
          {
            id: "desodorante-liquido-bioaromallis",
            name: "Desodorante Líquido - BioAromallis",
            price: 45.00,
            category: "curadoria",
            description: "Desodorante líquido natural com ativos antibacterianos da flora brasileira. Oferece proteção duradoura sem obstruir os poros.",
            image: "https://images.unsplash.com/photo-1624453213076-b7e47c526923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
          {
            id: "oleo-essencial-alecrim",
            name: "Óleo Essencial de Alecrim",
            price: 35.00,
            category: "oleos",
            description: "Óleo essencial de alecrim 100% puro e natural, cultivado em solo brasileiro. Propriedades estimulantes, revigorantes e purificantes.",
            image: "https://images.unsplash.com/photo-1626278664285-f796b9ee7806?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          },
        ];
        
        const product = products.find(p => p.id === productId);
        
        if (product) {
          form.reset({
            name: product.name,
            price: product.price.toString(),
            category: product.category,
            description: product.description,
            image: product.image
          });
        } else {
          toast.error("Produto não encontrado");
          navigate("/admin/products");
        }
        
        setIsLoading(false);
      }, 500);
    };

    fetchProduct();
  }, [productId, form, navigate]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate API call to update product
    setTimeout(() => {
      toast.success("Produto atualizado com sucesso!");
      setIsLoading(false);
      navigate("/admin/products");
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-playfair font-bold text-botanical-dark">Editar Produto</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do produto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <Input placeholder="Categoria do produto" {...field} />
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
                          placeholder="Descrição detalhada do produto" 
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
                onClick={() => navigate("/admin/products")}
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

export default EditProduct;
