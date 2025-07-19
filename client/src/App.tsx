
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { CartProvider } from "./context/CartContext";
import { queryClient } from "./lib/queryClient";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import CourseDetails from "./pages/CourseDetails";
import Checkout from "./pages/Checkout";
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminCourses from "./pages/Admin/Courses";
import AdminProducts from "./pages/Admin/Products";
import AdminPublications from "./pages/Admin/Publications";
import AdminSearch from "./pages/Admin/Search";
import EditCourse from "./pages/Admin/EditCourse";
import EditProduct from "./pages/Admin/EditProduct";
import EditPublication from "./pages/Admin/EditPublication";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Switch>
            {/* Site Principal */}
            <Route path="/" component={Index} />
            <Route path="/produto/:productId" component={ProductDetails} />
            <Route path="/curso/:courseId" component={CourseDetails} />
            <Route path="/checkout" component={Checkout} />
            
            {/* Rotas Administrativas */}
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/dashboard">
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            </Route>
            <Route path="/admin/courses">
              <ProtectedRoute>
                <AdminCourses />
              </ProtectedRoute>
            </Route>
            <Route path="/admin/courses/edit/:courseId">
              <ProtectedRoute>
                <EditCourse />
              </ProtectedRoute>
            </Route>
            <Route path="/admin/products">
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            </Route>
            <Route path="/admin/products/edit/:productId">
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            </Route>
            <Route path="/admin/publications">
              <ProtectedRoute>
                <AdminPublications />
              </ProtectedRoute>
            </Route>
            <Route path="/admin/publications/edit/:publicationId">
              <ProtectedRoute>
                <EditPublication />
              </ProtectedRoute>
            </Route>
            <Route path="/admin/search">
              <ProtectedRoute>
                <AdminSearch />
              </ProtectedRoute>
            </Route>
            
            {/* Rota Catch-all */}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
