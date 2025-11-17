import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import mousseImage from "@/assets/recipe-mousse.jpg";
import feijoadaImage from "@/assets/recipe-feijoada.jpg";

const RecipeSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const recipes = [
    {
      id: 1,
      image: mousseImage,
      name: "Mousse de Chocolate",
      brand: "Nestlé"
    },
    {
      id: 2,
      image: feijoadaImage,
      name: "Feijoada Completa",
      brand: null
    },
    {
      id: 3,
      image: mousseImage,
      name: "Torta de Chocolate",
      brand: "Nestlé"
    },
    {
      id: 4,
      image: feijoadaImage,
      name: "Risotto de Camarão",
      brand: null
    }
  ];

  const scrollLeft = () => {
    const newPosition = Math.max(scrollPosition - 300, 0);
    setScrollPosition(newPosition);
    const container = document.getElementById('recipes-container');
    if (container) {
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById('recipes-container');
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newPosition = Math.min(scrollPosition + 300, maxScroll);
      setScrollPosition(newPosition);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-montserrat font-bold text-foreground">
            Receitas
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

        {/* Recipes Carousel */}
        <div className="relative">
          <div
            id="recipes-container"
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {recipes.map((recipe) => (
              <Card key={recipe.id} className="flex-shrink-0 w-80 group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0 relative">
                  <div className="relative">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Recipe Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-montserrat font-bold mb-2">
                        {recipe.name}
                      </h3>
                      {recipe.brand && (
                        <div className="bg-white/20 backdrop-blur-sm rounded px-3 py-1 text-sm font-medium inline-block">
                          {recipe.brand}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeSection;