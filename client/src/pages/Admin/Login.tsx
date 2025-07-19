
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação de autenticação - em um ambiente real, isso seria uma chamada API
    setTimeout(() => {
      // Credenciais fixas para demonstração
      if (username === "admin" && password === "admin123") {
        // Armazenar token de autenticação
        localStorage.setItem("adminAuth", "true");
        toast.success("Login realizado com sucesso!");
        setLocation("/admin/dashboard");
      } else {
        toast.error("Credenciais inválidas!");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-botanical-beige/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-2xl font-playfair font-bold text-botanical-dark">
            Painel Administrativo
          </h2>
          <p className="mt-2 text-center text-sm text-botanical-dark/70">
            Entre com suas credenciais para acessar
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Nome de usuário
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-botanical-olive focus:border-botanical-olive focus:z-10 sm:text-sm"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-botanical-olive focus:border-botanical-olive focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-botanical-olive hover:bg-botanical-olive/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-botanical-olive"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
