import { Smartphone, Award, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MarketingBanners = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        {/* Brand Partners */}
        <div className="mb-12">
          <h2 className="text-2xl font-montserrat font-bold text-foreground mb-6 text-center">
            Marcas Parceiras
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {["Seara", "Iacta", "Nestlé", "Girando Sol", "Coca-Cola", "Tirolez"].map((brand, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="h-16 flex items-center justify-center bg-muted rounded-lg mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="font-montserrat font-bold text-lg">
                      {brand}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Institutional Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Marcas Exclusivas */}
          <Card className="bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden group cursor-pointer">
            <CardContent className="p-8 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
              <Award className="h-12 w-12 mb-4 text-secondary" />
              <h3 className="text-xl font-montserrat font-bold mb-2">
                Marcas Exclusivas
              </h3>
              <p className="text-white/90 mb-4">
                Produtos únicos com qualidade garantida
              </p>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                Conhecer
              </Button>
            </CardContent>
          </Card>

          {/* Atendimento 24h */}
          <Card className="bg-gradient-to-br from-secondary to-secondary-dark text-white overflow-hidden group cursor-pointer">
            <CardContent className="p-8 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
              <Smartphone className="h-12 w-12 mb-4 text-primary-foreground" />
              <h3 className="text-xl font-montserrat font-bold mb-2">
                Atendimento 24h
              </h3>
              <p className="text-white/90 mb-4">
                Estamos sempre prontos para ajudar
              </p>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-secondary">
                Fale Conosco
              </Button>
            </CardContent>
          </Card>

          {/* Entrega Rápida */}
          <Card className="bg-gradient-to-br from-success to-green-600 text-white overflow-hidden group cursor-pointer">
            <CardContent className="p-8 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
              <Truck className="h-12 w-12 mb-4 text-green-100" />
              <h3 className="text-xl font-montserrat font-bold mb-2">
                Entrega Rápida
              </h3>
              <p className="text-white/90 mb-4">
                Receba em casa com segurança
              </p>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-success">
                Saiba Mais
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MarketingBanners;