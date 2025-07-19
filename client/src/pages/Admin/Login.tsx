import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication check
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminAuth", "authenticated");
      toast.success("Login realizado com sucesso!");
      setLocation("/admin/dashboard");
    } else {
      toast.error("Credenciais inválidas!");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-botanical-white">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="botanical-container max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-playfair text-botanical-dark">
                Painel Administrativo
              </CardTitle>
              <CardDescription>
                Digite suas credenciais para acessar o painel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Usuário</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border-botanical-sage/30 focus:border-botanical-olive"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-botanical-sage/30 focus:border-botanical-olive"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full botanical-button-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-botanical-dark/60">
                  Usuário: <strong>admin</strong><br />
                  Senha: <strong>admin123</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;