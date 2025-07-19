import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import SmartSearch from "@/components/SmartSearch";

interface SearchResult {
  id: string;
  title: string;
  type: 'course' | 'product' | 'publication';
  subtitle?: string;
  description?: string;
}

export default function AdminSearch() {
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchResults = [], isLoading } = useQuery<SearchResult[]>({
    queryKey: ["/api/search", searchQuery],
    queryFn: async () => {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      return response.json();
    },
    enabled: searchQuery.length > 2,
    staleTime: 30 * 1000,
  });

  const handleResultSelect = (result: SearchResult) => {
    setSelectedResult(result);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return '📚';
      case 'product': return '🛍️';
      case 'publication': return '📄';
      default: return '🔍';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'course': return 'Curso';
      case 'product': return 'Produto';
      case 'publication': return 'Publicação';
      default: return '';
    }
  };

  const getActionUrl = (result: SearchResult) => {
    switch (result.type) {
      case 'course':
        return `/admin/courses`;
      case 'product':
        return `/admin/products`;
      case 'publication':
        return `/admin/publications`;
      default:
        return '#';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Busca Inteligente
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Encontre rapidamente cursos, produtos e publicações no sistema
        </p>
      </div>

      {/* Enhanced Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🔍</span>
            <span>Busca Avançada</span>
          </CardTitle>
          <CardDescription>
            Use a busca inteligente para encontrar conteúdo em todo o sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-2xl">
            <SmartSearch
              onResultSelect={(result) => {
                handleResultSelect(result);
                setSearchQuery(result.title);
              }}
              placeholder="Digite para buscar cursos, produtos ou publicações..."
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Selected Result Details */}
      {selectedResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <span className="text-2xl">{getTypeIcon(selectedResult.type)}</span>
              <div>
                <h3 className="text-lg">{selectedResult.title}</h3>
                <Badge variant="outline" className="mt-1">
                  {getTypeLabel(selectedResult.type)}
                </Badge>
              </div>
            </CardTitle>
            {selectedResult.subtitle && (
              <CardDescription className="text-base">
                {selectedResult.subtitle}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedResult.description && (
              <div>
                <h4 className="font-medium mb-2">Descrição:</h4>
                <p className="text-gray-600 dark:text-gray-300" 
                   dangerouslySetInnerHTML={{ 
                     __html: selectedResult.description.replace(/<[^>]*>/g, '').substring(0, 300) + '...' 
                   }}
                />
              </div>
            )}
            
            <div className="flex space-x-2">
              <Button asChild>
                <a href={getActionUrl(selectedResult)} className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Ver no Painel</span>
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={`/${selectedResult.type}s`} target="_blank" className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Ver no Site</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg">📚</span>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Cursos</p>
                <p className="text-lg font-semibold">
                  {searchResults.filter(r => r.type === 'course').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🛍️</span>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Produtos</p>
                <p className="text-lg font-semibold">
                  {searchResults.filter(r => r.type === 'product').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg">📄</span>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Publicações</p>
                <p className="text-lg font-semibold">
                  {searchResults.filter(r => r.type === 'publication').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Tips */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Dicas de Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>• Digite pelo menos 3 caracteres para iniciar a busca</li>
            <li>• Use palavras-chave específicas para melhores resultados</li>
            <li>• A busca funciona em títulos, descrições e conteúdo</li>
            <li>• Use as setas ↑↓ para navegar pelos resultados</li>
            <li>• Pressione Enter para selecionar um resultado</li>
            <li>• Pressione Esc para fechar os resultados</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}