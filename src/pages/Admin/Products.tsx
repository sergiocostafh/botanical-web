
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([
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
    // Versão simplificada para demonstração
  ]);

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      setProducts(products.filter(product => product.id !== id));
      toast.success("Produto removido com sucesso");
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
                <TableCell>R$ {product.price.toFixed(2)}</TableCell>
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
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
