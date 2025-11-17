import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';

export default function Cart() {
  const { items, cartCount, totalPrice, loading, removeItem, addItem } = useCart();
  const navigate = useNavigate();
  const [processingItem, setProcessingItem] = useState<number | null>(null);

  const handleRemoveItem = async (productId: number) => {
    try {
      setProcessingItem(productId);
      await removeItem(productId);
    } catch (error) {
      alert('Erro ao remover item do carrinho');
    } finally {
      setProcessingItem(null);
    }
  };

  const handleUpdateQuantity = async (productId: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;

    try {
      setProcessingItem(productId);
      // Remove e adiciona novamente com a nova quantidade
      await removeItem(productId);
      await addItem(productId, newQuantity);
    } catch (error) {
      alert('Erro ao atualizar quantidade');
    } finally {
      setProcessingItem(null);
    }
  };

  if (loading && items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004C97] mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando carrinho...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meu Carrinho</h1>
              <p className="text-gray-600 mt-1">
                {cartCount === 0 ? 'Seu carrinho está vazio' : `${cartCount} ${cartCount === 1 ? 'item' : 'itens'} no carrinho`}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Continuar Comprando
            </Button>
          </div>

          {items.length === 0 ? (
            /* CARRINHO VAZIO */
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Seu carrinho está vazio
              </h2>
              <p className="text-gray-600 mb-6">
                Adicione produtos ao seu carrinho para continuar
              </p>
              <Button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-[#004C97] to-[#FF8C42] text-white px-8 py-3"
              >
                Ir para a loja
              </Button>
            </div>
          ) : (
            /* CARRINHO COM ITENS */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lista de produtos */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-6 hover:shadow-md transition-shadow"
                  >
                    {/* Imagem do produto */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image || 'https://via.placeholder.com/100'}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Informações do produto */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      {item.product.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {item.product.description}
                        </p>
                      )}
                      <p className="text-xl font-bold text-[#004C97] mt-2">
                        R$ {item.product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Controles de quantidade */}
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateQuantity(item.product_id, item.quantity, -1)}
                        disabled={processingItem === item.product_id || item.quantity <= 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateQuantity(item.product_id, item.quantity, 1)}
                        disabled={processingItem === item.product_id}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Subtotal e remover */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-bold text-gray-900 mb-2">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.product_id)}
                        disabled={processingItem === item.product_id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumo do pedido */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Resumo do Pedido
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'itens'})</span>
                      <span>R$ {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Frete</span>
                      <span className="text-green-600 font-medium">Grátis</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-[#004C97]">R$ {totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-[#004C97] to-[#FF8C42] text-white py-6 text-lg font-semibold hover:opacity-90 transition-opacity"
                    onClick={() => navigate('/checkout')}
                  >
                    Finalizar Compra
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Pagamento seguro e protegido
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}