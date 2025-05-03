
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "O preço deve ser um número positivo",
  }),
  category: z.string().min(1, "A categoria é obrigatória"),
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
      category: ""
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
            category: "terroa"
          },
          {
            id: "mascara-facial-purificante",
            name: "Máscara Facial Purificante",
            price: 79.00,
            category: "terroa"
          },
          {
            id: "desodorante-liquido-bioaromallis",
            name: "Desodorante Líquido - BioAromallis",
            price: 45.00,
            category: "curadoria"
          },
          {
            id: "oleo-essencial-alecrim",
            name: "Óleo Essencial de Alecrim",
            price: 35.00,
            category: "oleos"
          },
        ];
        
        const product = products.find(p => p.id === productId);
        
        if (product) {
          form.reset({
            name: product.name,
            price: product.price.toString(),
            category: product.category
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

            <div className="flex justify-end gap-2">
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
