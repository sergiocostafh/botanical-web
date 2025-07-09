
import { courseService } from "@/lib/supabase";

export const updateAromaterapiaCourseImage = async () => {
  try {
    const imageUrl = "https://raw.githubusercontent.com/sergiocostafh/botanical-web/main/public/curso1_thumb.png";
    
    await courseService.updateCourseByTitle("Aromaterapia Brasileira", {
      image: imageUrl
    });
    
    console.log("Curso 'Aromaterapia Brasileira' atualizado com sucesso!");
    return true;
  } catch (error) {
    console.error("Erro ao atualizar curso:", error);
    return false;
  }
};

// Execute the update immediately
updateAromaterapiaCourseImage();
