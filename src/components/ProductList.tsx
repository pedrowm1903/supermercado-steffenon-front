import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
  discount?: number;
  originalPrice?: number;
}

interface ProductListProps {
  title?: string;
  maxItems?: number;
  showNavigation?: boolean;
}

export default function ProductList({ 
  title = "Produtos mais vendidos", 
  maxItems,
  showNavigation = true 
}: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      
      // Limitar produtos se maxItems foi especificado
      const productsToShow = maxItems ? data.slice(0, maxItems) : data;
      setProducts(productsToShow);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError('Erro ao carregar produtos. Tente novamente mais tarde.');
      // Produtos de exemplo em caso de erro
      setProducts([
        {
          id: 1,
          name: 'Vinho Tinto Premium Reserva Especial 750ml',
          price: 89.99,
          originalPrice: 119.99,
          discount: 25,
          image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
          description: 'Vinho tinto encorpado com notas de frutas vermelhas'
        },
        {
          id: 2,
          name: 'Alcatra Bovina Premium Kg',
          price: 45.90,
          image: 'https://images.unsplash.com/photo-1588347818036-8e89ed7b22b0?w=400',
          description: 'Carne bovina de primeira qualidade, macia e suculenta'
        },
        {
          id: 3,
          name: 'Vinho Branco Seco 750ml',
          price: 62.50,
          originalPrice: 75.90,
          discount: 18,
          image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400',
          description: 'Vinho branco suave com aroma frutado'
        },
        {
          id: 4,
          name: 'Picanha Especial Kg',
          price: 79.90,
          image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400',
          description: 'Picanha nobre, perfeita para churrasco'
        },
        {
          id: 5,
          name: 'Espumante Rosé 750ml',
          price: 95.90,
          image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400',
          description: 'Espumante rosé para ocasiões especiais'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">{error}</p>
            <Button onClick={loadProducts} className="mt-4">
              Tentar novamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header com navegação */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          
          {showNavigation && totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevPage}
                disabled={currentPage === 0}
                className="rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-sm text-gray-600 mx-2">
                {currentPage + 1} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mensagem se não houver produtos */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhum produto disponível no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}