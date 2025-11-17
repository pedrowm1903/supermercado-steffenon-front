import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import wineImage from "@/assets/product-wine.jpg";
import meatImage from "@/assets/product-meat.jpg";

// Interface do produto que corresponde ao ProductCard
interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
  discount?: number;
  originalPrice?: number;
}

interface ProductShelfProps {
  title: string;
  products?: Product[];
}

const ProductShelf = ({ title, products: customProducts }: ProductShelfProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Default products if none provided
  const defaultProducts: Product[] = [
    {
      id: 1,
      image: wineImage,
      name: "Vinho Tinto Premium Reserva Especial 750ml",
      description: "Vinho tinto encorpado com notas de frutas vermelhas",
      price: 89.99,
      originalPrice: 119.99,
      discount: 25
    },
    {
      id: 2,
      image: meatImage,
      name: "Alcatra Bovina Premium Kg",
      description: "Carne bovina de primeira qualidade, macia e suculenta",
      price: 45.90
    },
    {
      id: 3,
      image: wineImage,
      name: "Vinho Branco Seco 750ml",
      description: "Vinho branco suave com aroma frutado",
      price: 62.50,
      originalPrice: 75.90,
      discount: 18
    },
    {
      id: 4,
      image: meatImage,
      name: "Picanha Especial Kg",
      description: "Picanha nobre, perfeita para churrasco",
      price: 79.90
    },
    {
      id: 5,
      image: wineImage,
      name: "Espumante Rosé 750ml",
      description: "Espumante rosé para ocasiões especiais",
      price: 95.90
    },
    {
      id: 6,
      image: meatImage,
      name: "Filé Mignon Premium Kg",
      description: "Filé mignon macio e suculento",
      price: 89.90
    }
  ];

  const products = customProducts || defaultProducts;

  const scrollLeft = () => {
    const newPosition = Math.max(scrollPosition - 300, 0);
    setScrollPosition(newPosition);
    const container = document.getElementById(`shelf-${title}`);
    if (container) {
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById(`shelf-${title}`);
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newPosition = Math.min(scrollPosition + 300, maxScroll);
      setScrollPosition(newPosition);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-montserrat font-bold text-foreground">
            {title}
          </h2>
          
          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={scrollLeft}
              className="rounded-full w-10 h-10 p-0 border-primary text-primary hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollRight}
              className="rounded-full w-10 h-10 p-0 border-primary text-primary hover:bg-primary hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <div
            id={`shelf-${title}`}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-72">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShelf;