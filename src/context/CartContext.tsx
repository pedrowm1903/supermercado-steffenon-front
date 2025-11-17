import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image?: string;
    description?: string;
  };
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  totalPrice: number;
  loading: boolean;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  console.log('🛒 CartProvider inicializado. Autenticado?', isAuthenticated);

  // Carregar carrinho ao montar ou quando o usuário logar
  useEffect(() => {
    console.log('🔄 useEffect do CartProvider. Autenticado?', isAuthenticated);
    if (isAuthenticated) {
      refreshCart();
    } else {
      console.log('⚠️ Usuário não autenticado, limpando carrinho local');
      setItems([]);
    }
  }, [isAuthenticated]);

  const refreshCart = async () => {
    if (!isAuthenticated) {
      console.warn('⚠️ refreshCart: Usuário não autenticado');
      return;
    }
    
    try {
      console.log('📥 Carregando carrinho da API...');
      setLoading(true);
      
      const data = await api.getCart();
      console.log('✅ Carrinho carregado - Resposta completa:', data);
      console.log('✅ Items encontrados:', data.items);
      console.log('✅ Quantidade de items:', data.items ? data.items.length : 0);
      
      const items = data.items || [];
      console.log('📦 Definindo items no estado:', items);
      setItems(items);
      
      console.log('📊 CartCount será:', items.reduce((total, item) => total + item.quantity, 0));
    } catch (error) {
      console.error('❌ Erro ao carregar carrinho:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId: number, quantity: number = 1) => {
    console.log('➕ addItem chamado:', { productId, quantity, isAuthenticated });

    if (!isAuthenticated) {
      console.error('❌ addItem: Usuário não autenticado');
      
      toast({
        variant: "destructive",
        title: "❌ Erro ao adicionar",
        description: "Você precisa estar logado para adicionar produtos ao carrinho",
        duration: 4000,
      });
      
      throw new Error('Você precisa estar logado para adicionar produtos ao carrinho');
    }

    try {
      setLoading(true);
      console.log('📤 Enviando requisição para API: addToCart');
      console.log('Parâmetros:', { product_id: productId, quantity });
      
      const response = await api.addToCart(productId, quantity);
      console.log('✅ Resposta da API addToCart:', response);
      
      // ✅ Toast de sucesso bonito
      toast({
        title: "✅ Produto adicionado!",
        description: "O produto foi adicionado ao seu carrinho",
        duration: 3000,
      });
      
      console.log('🔄 Atualizando carrinho...');
      await refreshCart();
      
      console.log('🎉 Item adicionado com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao adicionar item:', error);
      
      // ✅ Toast de erro bonito
      let errorMessage = 'Erro ao adicionar produto ao carrinho';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        console.error('Mensagem do erro:', error.message);
      }
      
      toast({
        variant: "destructive",
        title: "❌ Erro ao adicionar",
        description: errorMessage,
        duration: 4000,
      });
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId: number) => {
    console.log('➖ removeItem chamado:', productId);
    
    try {
      setLoading(true);
      await api.removeFromCart(productId);
      console.log('✅ Item removido');
      
      toast({
        title: "🗑️ Produto removido",
        description: "O produto foi removido do carrinho",
        duration: 3000,
      });
      
      await refreshCart();
    } catch (error) {
      console.error('❌ Erro ao remover item:', error);
      
      toast({
        variant: "destructive",
        title: "❌ Erro ao remover",
        description: "Não foi possível remover o produto",
        duration: 4000,
      });
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    console.log('🗑️ clearCart chamado');
    
    try {
      setLoading(true);
      await api.clearCart();
      setItems([]);
      console.log('✅ Carrinho limpo');
      
      toast({
        title: "🧹 Carrinho limpo",
        description: "Todos os produtos foram removidos",
        duration: 3000,
      });
    } catch (error) {
      console.error('❌ Erro ao limpar carrinho:', error);
      
      toast({
        variant: "destructive",
        title: "❌ Erro ao limpar carrinho",
        description: "Não foi possível limpar o carrinho",
        duration: 4000,
      });
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  console.log('📊 Estado atual do carrinho:', {
    itemsCount: items.length,
    cartCount,
    totalPrice,
    loading
  });

  const value: CartContextType = {
    items,
    cartCount,
    totalPrice,
    loading,
    addItem,
    removeItem,
    clearCart,
    refreshCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};