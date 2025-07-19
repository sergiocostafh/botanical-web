import { Link, useLocation } from "wouter";
import { LogOut, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { user, isLoading, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      setLocation("/admin/portal");
    }
  }, [isLoading, isAuthenticated, isAdmin, setLocation]);

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-botanical-beige/10 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-botanical-olive border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const SidebarContent = () => (
    <>
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-playfair font-bold text-white">Painel Admin</h1>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          <Link
            to="/admin/dashboard"
            className="text-botanical-white hover:bg-botanical-olive group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/courses"
            className="text-botanical-white hover:bg-botanical-olive group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            Cursos
          </Link>
          <Link
            to="/admin/products"
            className="text-botanical-white hover:bg-botanical-olive group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            Produtos
          </Link>
          <Link
            to="/admin/publications"
            className="text-botanical-white hover:bg-botanical-olive group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          >
            Publicações
          </Link>
        </nav>
      </div>
      <div className="flex-shrink-0 border-t border-botanical-copper">
        <div className="p-3">
          <div className="flex items-center space-x-3">
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Perfil"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 bg-botanical-olive rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-botanical-white truncate">
                {user?.firstName || user?.email || 'Usuário'}
              </p>
              <p className="text-xs text-botanical-beige/70 truncate">
                Administrador
              </p>
            </div>
          </div>
        </div>
        <div className="px-3 pb-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-3 py-2 text-sm text-botanical-white hover:bg-botanical-olive rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-botanical-beige/10">
      {/* Sidebar Mobile */}
      <div className="lg:hidden">
        <div className="fixed inset-0 z-40 flex">
          <div
            className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setSidebarOpen(false)}
          ></div>

          <div
            className={`relative flex-1 flex flex-col max-w-xs w-full bg-botanical-dark transition ease-in-out duration-300 transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      </div>

      {/* Sidebar Desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-botanical-dark">
            <SidebarContent />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-botanical-white">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-botanical-olive"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <main className="flex-1 pb-8">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;