import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Navigation = () => {
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null);

  const departments = {
    "Mercearia": ["Açúcar e Adoçante", "Arroz e Feijão", "Café e Achocolatado", "Cereais e Granola", "Farinhas", "Massas", "Molhos e Temperos", "Óleos e Vinagre"],
    "Carnes": ["Bovina", "Suína", "Frango", "Linguiças", "Peixes", "Frutos do Mar"],
    "Frios e Laticínios": ["Queijos", "Presunto", "Mortadela", "Iogurtes", "Leite", "Manteiga"],
    "Hortifrúti": ["Frutas", "Verduras", "Legumes", "Temperos Frescos"],
    "Limpeza": ["Detergentes", "Sabão em Pó", "Desinfetante", "Papel Higiênico", "Toalha de Papel"],
    "Bebidas": ["Refrigerantes", "Sucos", "Águas", "Cervejas", "Vinhos", "Destilados"],
    "Congelados": ["Sorvetes", "Pizzas", "Pratos Prontos", "Vegetais Congelados"],
    "Pets": ["Ração para Cães", "Ração para Gatos", "Petiscos", "Brinquedos", "Higiene"]
  };

  const navigationItems = [
    "Departamentos",
    "Mais Vendidos", 
    "Ofertas",
    "Fale Conosco"
  ];

  return (
    <nav className="bg-secondary text-white relative z-40" style={{ marginTop: '80px' }}>
      <div className="container mx-auto px-4">
        <ul className="flex items-center">
          {navigationItems.map((item, index) => (
            <li key={index} className="relative">
              {item === "Departamentos" ? (
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredDepartment("open")}
                  onMouseLeave={() => setHoveredDepartment(null)}
                >
                  <button className="flex items-center px-6 py-4 hover:bg-secondary-dark transition-colors font-medium">
                    {item}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  
                  {/* Mega Menu */}
                  {hoveredDepartment && (
                    <div className="absolute top-full left-0 bg-white shadow-lg border rounded-lg min-w-[800px] z-50">
                      <div className="flex">
                        {/* Categories Column */}
                        <div className="w-1/3 bg-muted border-r">
                          {Object.keys(departments).map((dept) => (
                            <div
                              key={dept}
                              className="p-4 text-foreground hover:bg-accent cursor-pointer border-b last:border-b-0"
                              onMouseEnter={() => setHoveredDepartment(dept)}
                            >
                              <span className="font-medium">{dept}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Subcategories Column */}
                        <div className="w-2/3 p-4">
                          {hoveredDepartment && hoveredDepartment !== "open" && departments[hoveredDepartment as keyof typeof departments] && (
                            <div>
                              <h3 className="text-lg font-semibold text-primary mb-3">{hoveredDepartment}</h3>
                              <div className="grid grid-cols-2 gap-2">
                                {departments[hoveredDepartment as keyof typeof departments].map((subcat, idx) => (
                                  <a
                                    key={idx}
                                    href="#"
                                    className="text-sm text-foreground hover:text-primary p-2 rounded hover:bg-accent"
                                  >
                                    {subcat}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href="#"
                  className="block px-6 py-4 hover:bg-secondary-dark transition-colors font-medium"
                >
                  {item}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;