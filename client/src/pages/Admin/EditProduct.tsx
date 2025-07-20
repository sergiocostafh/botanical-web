
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
import { productService } from "@/lib/supabase";

const formSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "O preço deve ser um número positivo",
  }),
  category: z.string().min(1, "A categoria é obrigatória"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  image: z.string().url("Insira uma URL válida para a imagem").optional().or(z.literal(""))
});

const EditProduct = () => {
  const [match, params] = useRoute("/admin/products/edit/:productId");
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const productId = params?.productId;
  
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
    if (!productId) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const product = await productService.getProduct(productId);
        form.reset({
          name: product.name,
          price: product.price.toString(),
          category: product.category,
          description: product.description,
          image: product.image || ""
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Erro ao carregar informações do produto");
        setLocation("/admin/products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, form, setLocation]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!productId) return;
    
    setIsLoading(true);
    try {
      console.log("Updating product with data:", data);
      await productService.updateProduct(productId, {
        name: data.name,
        price: data.price,
        category: data.category,
        description: data.description,
        image: data.image || ""
      });
      toast.success("Produto atualizado com sucesso!");
      setLocation("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Erro ao atualizar produto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-playfair font-bold text-botanical-dark">Editar Produto</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <Input 
                      placeholder="https://exemplo.com/imagem.jpg" 
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
                onClick={() => setLocation("/admin/products")}
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
