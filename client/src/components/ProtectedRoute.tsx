import { useEffect } from "react";
import { useLocation } from "wouter";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth") === "authenticated";
    
    if (!isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const isAuthenticated = localStorage.getItem("adminAuth") === "authenticated";

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;