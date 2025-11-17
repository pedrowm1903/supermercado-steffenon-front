import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryQuickAccess from "@/components/CategoryQuickAccess";
import ProductList from "@/components/ProductList"; // ✅ Componente funcional
import MarketingBanners from "@/components/MarketingBanners";
import RecipeSection from "@/components/RecipeSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-montserrat">
      {/* Header - Já tem carrinho funcional */}
      <Header />
      
      {/* Navigation */}
      <Navigation />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Quick Category Access */}
      <CategoryQuickAccess />

      {/* Product Lists - AGORA FUNCIONAIS COM CARRINHO! */}
      <ProductList 
        title="Produtos mais vendidos" 
        showNavigation={true}
      />
      
      <ProductList 
        title="Seleção de Vinhos" 
        showNavigation={true}
        maxItems={8}
      />

      {/* Marketing Banners */}
      <MarketingBanners />

      {/* Recipes Section */}
      <RecipeSection />

      {/* Another Product Shelf */}
      <ProductList 
        title="Ofertas da Semana" 
        showNavigation={true}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;