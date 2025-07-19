import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LogIn, Shield, AlertCircle } from "lucide-react";

const AdminPortal = () => {
  const { user, isLoading, isAuthenticated, isAdmin } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && isAuthenticated && isAdmin) {
      setLocation("/admin/dashboard");
    }
  }, [isLoading, isAuthenticated, isAdmin, setLocation]);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-botanical-white">
        <Header />
        <div className="botanical-container py-32 flex justify-center">
          <div className="animate-spin w-10 h-10 border-4 border-botanical-olive border-t-transparent rounded-full"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-botanical-white">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="botanical-container max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Shield className="h-16 w-16 text-botanical-olive mx-auto mb-6" />
            <h1 className="text-2xl font-playfair font-bold text-botanical-dark mb-4">
              Painel Administrativo
            </h1>
            
            {!isAuthenticated ? (
              <div>
                <p className="text-botanical-dark/70 mb-6">
                  Faça login com sua conta Replit para acessar o painel administrativo.
                </p>
                <button
                  onClick={handleLogin}
                  className="botanical-button-primary w-full flex items-center justify-center"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Entrar com Replit
                </button>
              </div>
            ) : !isAdmin ? (
              <div>
                <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <p className="text-botanical-dark/70 mb-4">
                  Sua conta não possui permissões administrativas.
                </p>
                <p className="text-sm text-botanical-dark/50 mb-6">
                  Entre em contato com o administrador do sistema para solicitar acesso.
                </p>
                <div className="text-xs text-botanical-dark/40 p-3 bg-botanical-beige/20 rounded">
                  Usuário logado: {user?.email || user?.id}
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-botanical-dark/50">
              Sistema de autenticação seguro via Replit OAuth
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminPortal;