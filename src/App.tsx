import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; // ✅ Importar CartProvider
import Header from "./components/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Cart from "./pages/Cart"; // ✅ Importar página do carrinho
import Login from "./Login";
import SignUp from "./SignUp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider> {/* ✅ Adicionar CartProvider */}
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cadastro" element={<SignUp />} />
            
            {/* Carrinho - Agora funcional! */}
            <Route path="/carrinho" element={<Cart />} />
            
            {/* Admin */}
            <Route path="/admin" element={
              <div className="min-h-screen pt-24 bg-gray-50">
                <div className="container mx-auto px-4">
                  <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <div className="text-6xl mb-4">⚙️</div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Admin</h1>
                    <p className="text-gray-600">Em desenvolvimento...</p>
                  </div>
                </div>
              </div>
            } />
            
            {/* Pedidos */}
            <Route path="/pedidos" element={
              <div className="min-h-screen pt-24 bg-gray-50">
                <div className="container mx-auto px-4">
                  <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <div className="text-6xl mb-4">📦</div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Pedidos</h1>
                    <p className="text-gray-600">Em desenvolvimento...</p>
                  </div>
                </div>
              </div>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App