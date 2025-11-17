import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description?: string;   // <-- agora opcional
    price: number;
    image_url?: string;
  };
  onAddToCart?: () => void;  // <-- agora opcional
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="group border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300">

      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 h-48">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <ShoppingCart size={48} />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-base mb-2 text-foreground line-clamp-2 min-h-[48px]">
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
          {product.description || "Produto sem descrição."}
        </p>

        {/* Price and Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">
              R$ {parseFloat(String(product.price)).toFixed(2)}
            </span>
          </div>

          <Button
            onClick={() => onAddToCart?.()} // <-- evita erro se for undefined
            size="sm"
            className="bg-primary hover:bg-primary-dark"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
