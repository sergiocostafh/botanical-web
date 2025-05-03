
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

type Course = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
};

const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "aromaterapia-brasileira",
      title: "Aromaterapia Brasileira",
      subtitle: "15 Óleos Essenciais da Flora Nativa",
      type: "Curso gravado",
    },
    {
      id: "oleos-manteigas-vegetais-brasil",
      title: "Óleos e Manteigas Vegetais do Brasil",
      subtitle: "Propriedades e Aplicações",
      type: "Curso gravado",
    },
    {
      id: "oleos-manteigas-amazonia",
      title: "Óleos graxos e Manteigas da Amazônia",
      subtitle: "Bioativos da Floresta Amazônica",
      type: "Aula gravada",
    },
  ]);

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este curso?")) {
      setCourses(courses.filter(course => course.id !== id));
      toast.success("Curso removido com sucesso");
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-playfair font-bold text-botanical-dark">Gerenciar Cursos</h1>
        <Link 
          to="/admin/courses/new" 
          className="bg-botanical-olive text-white px-4 py-2 rounded hover:bg-botanical-olive/90 transition-colors"
        >
          Adicionar Curso
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Subtítulo</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.id}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.subtitle}</TableCell>
                <TableCell>{course.type}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link 
                      to={`/admin/courses/edit/${course.id}`}
                      className="bg-botanical-beige text-botanical-dark px-3 py-1 rounded text-sm hover:bg-botanical-beige/80 transition-colors"
                    >
                      Editar
                    </Link>
                    <button 
                      onClick={() => handleDelete(course.id)}
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

export default AdminCourses;
