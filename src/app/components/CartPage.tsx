import { useCart } from "../../contexts/CartContext";// Ícones genéricos (você pode usar lucide-react, heroicons ou a biblioteca do seu projeto)
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react"; 

interface CartPageProps {
  onBack: () => void;
  onCheckout: () => void; 
}

export function CartPage({ onBack, onCheckout }: CartPageProps) {
  // Consumindo o "cérebro" do carrinho
  const { cart, removeFromCart, updateQuantity, cartTotal, cartItemCount } = useCart();

  // Tratando o estado vazio exigido pelas heurísticas de UX
  if (cartItemCount === 0) {
    return (
      <div className="min-h-screen bg-input text-foreground flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl tracking-widest uppercase mb-4">Sua Sacola está vazia</h2>
        <p className="text-muted-foreground mb-8">Parece que você ainda não escolheu nenhuma peça exclusiva.</p>
        <button 
          onClick={onBack}
          className="bg-background text-foreground px-8 py-3 uppercase tracking-widest text-sm hover:bg-zinc-200 transition-colors"
        >
          Continuar Explorando
        </button>
      </div>
    );
  }

  // Layout Modular (Bento Grid) para o carrinho preenchido
  return (
    <div className="min-h-screen bg-input text-foreground p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={20} />
          <span className="uppercase tracking-widest text-xs">Voltar para a loja</span>
        </button>

        <h1 className="text-3xl tracking-widest uppercase mb-12 border-b border-border pb-4">
          Sacola ({cartItemCount})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Módulo 1: Lista de Produtos */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-6 bg-card p-4 rounded-lg items-center border border-border">
                <img src={item.image} alt={item.name} className="w-24 h-32 object-cover rounded" />
                
                <div className="flex-1">
                  <h3 className="text-lg tracking-wide">{item.name}</h3>
                  {/* PROTEÇÃO AQUI: Se o preço não for número, exibe 0.00 */}
                  <p className="text-muted-foreground mt-1">
                    R$ {typeof item.price === 'number' ? item.price.toFixed(2) : "0.00"}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-zinc-700 rounded">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-zinc-800 transition-colors">
                        <Minus size={16} />
                      </button>
                      <span className="px-4 text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-zinc-800 transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-red-500 transition-colors p-2">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                
                {/* PROTEÇÃO AQUI NO SUBTOTAL DO ITEM */}
                <div className="text-right font-medium">
                  R$ {typeof item.price === 'number' && typeof item.quantity === 'number' 
                    ? (item.price * item.quantity).toFixed(2) 
                    : "0.00"}
                </div>
              </div>
            ))}
          </div>

          {/* Módulo 2: Resumo do Pedido */}
          <div className="bg-card p-8 rounded-lg border border-border h-fit">
            <h2 className="text-xl tracking-widest uppercase mb-6">Resumo</h2>
            <div className="space-y-4 text-muted-foreground border-b border-border pb-6 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete Expresso</span>
                <span className="text-foreground uppercase text-xs tracking-widest">Grátis</span>
              </div>
            </div>
            <div className="flex justify-between text-xl font-medium mb-8 text-foreground">
              <span>Total</span>
              <span>R$ {cartTotal.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={onCheckout}
              className="w-full bg-background text-foreground py-4 uppercase tracking-widest text-sm hover:bg-zinc-200 transition-colors font-medium">
              Finalizar Compra
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}