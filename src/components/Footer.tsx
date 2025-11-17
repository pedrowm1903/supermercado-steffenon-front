import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-footer-bg text-footer-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quem Somos */}
          <div>
            <h3 className="text-lg font-montserrat font-semibold mb-4 text-secondary">
              Quem Somos
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-secondary transition-colors">Nossa História</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Missão e Valores</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Trabalhe Conosco</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Responsabilidade Social</a></li>
            </ul>
          </div>

          {/* Forma de Pagamento */}
          <div>
            <h3 className="text-lg font-montserrat font-semibold mb-4 text-secondary">
              Forma de Pagamento
            </h3>
            <ul className="space-y-3">
              <li>PIX</li>
              <li>Dinheiro</li>
              <li>Vale Alimentação</li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-lg font-montserrat font-semibold mb-4 text-secondary">
              Institucional
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-secondary transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Trocas e Devoluções</a></li>

            </ul>
          </div>

          {/* Relacionamento com o Cliente */}
          <div>
            <h3 className="text-lg font-montserrat font-semibold mb-4 text-secondary">
              Relacionamento com o Cliente
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary" />
                <span>(51) 99000-0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary" />
                <span>contato@steffenon.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-secondary" />
                <span>Rua Emancipação 2413, centro</span>
              </div>
              
              {/* Redes Sociais */}
              <div className="pt-4">
                <h4 className="font-semibold mb-3">Redes Sociais</h4>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-secondary transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="hover:text-secondary transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="hover:text-secondary transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div>
              <p>&copy; 2024 Supermercado Steffenon. Todos os direitos reservados.</p>
              <p>CNPJ: 12.345.678/0001-90 | Endereço: Rua Emancipação 2413, centro
Boa Vista do Sul - CEP: 95727-000</p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;