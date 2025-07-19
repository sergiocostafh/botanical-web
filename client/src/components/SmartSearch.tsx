import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface SearchResult {
  id: string;
  title: string;
  type: 'course' | 'product' | 'publication';
  subtitle?: string;
  description?: string;
}

interface SmartSearchProps {
  onResultSelect?: (result: SearchResult) => void;
  onNavigate?: (type: string, id: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SmartSearch({ 
  onResultSelect, 
  onNavigate,
  placeholder = "Buscar cursos, produtos ou publicações...",
  className 
}: SmartSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Fetch search results
  const { data: searchResults = [], isLoading } = useQuery<SearchResult[]>({
    queryKey: ["/api/search", query],
    queryFn: async () => {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      return response.json();
    },
    enabled: query.length > 2,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || searchResults.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : searchResults.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
            handleResultSelect(searchResults[selectedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    setIsOpen(value.length > 0);
  };

  const handleResultSelect = (result: SearchResult) => {
    setQuery(result.title);
    setIsOpen(false);
    setSelectedIndex(-1);
    
    if (onResultSelect) {
      onResultSelect(result);
    }
    
    if (onNavigate) {
      onNavigate(result.type, result.id);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
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

  const highlightMatch = (text: string, query: string) => {
    if (!query || query.length < 2) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="pl-10 pr-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="p-4 text-center text-gray-500">
              <div className="inline-block w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mr-2"></div>
              Buscando...
            </div>
          )}
          
          {!isLoading && searchResults.length === 0 && query.length > 2 && (
            <div className="p-4 text-center text-gray-500">
              Nenhum resultado encontrado para "{query}"
            </div>
          )}
          
          {!isLoading && searchResults.length > 0 && (
            <div ref={resultsRef}>
              {searchResults.map((result, index) => (
                <div
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultSelect(result)}
                  className={cn(
                    "p-3 cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
                    selectedIndex === index && "bg-emerald-50 dark:bg-emerald-900/20"
                  )}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg mt-0.5">{getTypeIcon(result.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {highlightMatch(result.title, query)}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full">
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      {result.subtitle && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">
                          {highlightMatch(result.subtitle, query)}
                        </p>
                      )}
                      {result.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                          {highlightMatch(result.description.replace(/<[^>]*>/g, ''), query)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="p-2 bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 text-center">
                Use ↑↓ para navegar, Enter para selecionar, Esc para fechar
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}