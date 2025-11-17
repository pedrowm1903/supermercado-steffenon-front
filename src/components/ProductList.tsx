
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import * as api from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
}

interface ProductListProps {
  title: string;
  showNavigation?: boolean;
  maxItems?: number;
}

const ProductList = ({ title, showNavigation = true, maxItems }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProducts();
      
      // Limita o número de produtos se maxItems foi definido
      const limitedProducts = maxItems ? data.slice(0, maxItems) : data;
      setProducts(limitedProducts);
    } catch (err: any) {
      console.error('Erro ao carregar produtos:', err);
      setError(err.message || 'Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated) {
      alert('Você precisa estar logado para adicionar ao carrinho');
      return;
    }

    try {
      await api.addToCart(productId, 1);
      alert('Produto adicionado ao carrinho!');
    } catch (err: any) {
      alert('Erro ao adicionar: ' + err.message);
    }
  };

  const scrollLeft = () => {
    const container = document.getElementById(`product-list-${title}`);
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById(`product-list-${title}`);
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Carregando produtos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadProducts} variant="outline">
            Tentar novamente
          </Button>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground">Nenhum produto disponível no momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {showNavigation && products.length > 4 && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Products Grid/Carousel */}
      <div
        id={`product-list-${title}`}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-none w-64">
            <ProductCard 
              product={product}
              onAddToCart={() => handleAddToCart(product.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;