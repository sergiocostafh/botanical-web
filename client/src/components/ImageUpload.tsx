
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload = ({ onImageUpload, currentImage, className = "" }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Por favor, selecione apenas arquivos de imagem");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("A imagem deve ter no máximo 5MB");
        return;
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      console.log("Uploading file:", fileName);

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      console.log("Image uploaded successfully:", data.publicUrl);
      onImageUpload(data.publicUrl);
      toast.success("Imagem enviada com sucesso!");
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Erro ao enviar imagem. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadImage(file);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      await uploadImage(file);
    } else {
      toast.error("Por favor, selecione apenas arquivos de imagem");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeImage = () => {
    onImageUpload('');
    toast.success("Imagem removida");
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {currentImage ? (
        <div className="relative">
          <img 
            src={currentImage} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-md border"
            onError={(e) => {
              console.error("Error loading image:", currentImage);
              (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Erro+ao+carregar+imagem";
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-md p-8 text-center transition-colors ${
            dragOver ? 'border-botanical-olive bg-botanical-beige/20' : 'border-gray-300'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">
            Arraste uma imagem aqui ou clique para selecionar
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB
          </p>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('image-upload')?.click()}
            disabled={uploading}
          >
            {uploading ? 'Enviando...' : 'Selecionar Imagem'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
