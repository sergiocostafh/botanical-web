
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { publicationService } from "@/lib/supabase";
import { Publication } from "@/types";

const AdminPublications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await publicationService.getPublications();
        setPublications(data);
      } catch (error) {
        console.error("Error fetching publications:", error);
        toast.error("Erro ao carregar publicações");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta publicação?")) {
      try {
        await publicationService.deletePublication(id);
        setPublications(publications.filter(pub => pub.id !== id));
        toast.success("Publicação removida com sucesso");
      } catch (error) {
        console.error("Error deleting publication:", error);
        toast.error("Erro ao remover publicação");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-playfair font-bold text-botanical-dark">Gerenciar Publicações</h1>
        <Link 
          to="/admin/publications/new" 
          className="bg-botanical-olive text-white px-4 py-2 rounded hover:bg-botanical-olive/90 transition-colors"
        >
          Adicionar Publicação
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin w-8 h-8 border-4 border-botanical-olive border-t-transparent rounded-full"></div>
          </div>
        ) : publications.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            Nenhuma publicação encontrada
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Revista</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publications.map((pub) => (
                <TableRow key={pub.id}>
                  <TableCell className="font-medium">{pub.id}</TableCell>
                  <TableCell className="max-w-md truncate">{pub.title}</TableCell>
                  <TableCell>{pub.journal}</TableCell>
                  <TableCell>{pub.year}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        to={`/admin/publications/edit/${pub.id}`}
                        className="bg-botanical-beige text-botanical-dark px-3 py-1 rounded text-sm hover:bg-botanical-beige/80 transition-colors"
                      >
                        Editar
                      </Link>
                      <button 
                        onClick={() => handleDelete(pub.id)}
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

export default AdminPublications;
