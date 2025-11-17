import { Wine, Beef, Sparkles, Heart, Apple, Snowflake, ShoppingBag } from "lucide-react";

const CategoryQuickAccess = () => {
  const categories = [
    { icon: Wine, name: "Importados", color: "bg-purple-100 text-purple-600" },
    { icon: Beef, name: "Carnes", color: "bg-red-100 text-red-600" },
    { icon: Sparkles, name: "Limpeza", color: "bg-blue-100 text-blue-600" },
    { icon: Heart, name: "Pets", color: "bg-pink-100 text-pink-600" },
    { icon: Apple, name: "Hortifrúti", color: "bg-green-100 text-green-600" },
    { icon: Snowflake, name: "Congelados", color: "bg-cyan-100 text-cyan-600" },
    { icon: ShoppingBag, name: "Ofertas", color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-4 min-w-max">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center cursor-pointer group min-w-[100px]"
                >
                  <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-md`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <span className="text-sm font-medium text-foreground text-center">
                    {category.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryQuickAccess;