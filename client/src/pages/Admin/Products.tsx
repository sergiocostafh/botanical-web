
import { useState, useEffect } from "react";
import { Link } from "wouter";
import AdminLayout from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { productService } from "@/lib/supabase";
import { Product } from "@/types";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Erro ao carregar produtos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await productService.deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
        toast.success("Produto removido com sucesso");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Erro ao remover produto");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-playfair font-bold text-botanical-dark">Gerenciar Produtos</h1>
        <Link 
          to="/admin/products/new" 
          className="bg-botanical-olive text-white px-4 py-2 rounded hover:bg-botanical-olive/90 transition-colors"
        >
          Adicionar Produto
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin w-8 h-8 border-4 border-botanical-olive border-t-transparent rounded-full"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            Nenhum produto encontrado
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>R$ {parseFloat(product.price).toFixed(2)}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        to={`/admin/products/edit/${product.id}`}
                        className="bg-botanical-beige text-botanical-dark px-3 py-1 rounded text-sm hover:bg-botanical-beige/80 transition-colors"
                      >
                        Editar
                      </Link>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                      >
                        Excluir
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
