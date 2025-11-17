import { Search, ShoppingCart, User, LogOut, Package, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logoSteffenon from "@/assets/logo-steffenon.png";   // <-- IMPORT DO LOGO

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src={logoSteffenon} 
              alt="Logo Supermercado Steffenon" 
              className="h-14 w-39 hover:opacity-80 transition-opacity" 
              />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="O que você precisa?"
                className="w-full pl-4 pr-12 py-3 text-base border-2 border-muted rounded-lg focus:border-primary"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-dark"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="text-sm text-foreground hover:text-primary flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Olá, <strong>{user?.name}</strong></span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 bg-white border-2 border-gray-200 shadow-xl">
                  <DropdownMenuLabel className="text-gray-900 font-semibold">
                    Minha Conta
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />

                  {isAdmin && (
                    <>
                      <DropdownMenuItem 
                        onClick={() => navigate('/admin')}
                        className="cursor-pointer text-gray-700 hover:bg-[#004C97] hover:text-white transition-colors"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Painel Admin</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-200" />
                    </>
                  )}

                  <DropdownMenuItem 
                    onClick={() => navigate('/pedidos')}
                    className="cursor-pointer text-gray-700 hover:bg-[#FF8C42] hover:text-white transition-colors"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    <span>Meus Pedidos</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-gray-200" />

                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                className="text-sm text-foreground hover:text-primary"
                onClick={() => navigate('/login')}
              >
                <User className="h-4 w-4 mr-2" />
                Olá, faça seu login ou cadastre-se
              </Button>
            )}

            {/* Carrinho */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => navigate('/carrinho')}
            >
              <ShoppingCart className="h-5 w-5 text-primary" />
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
