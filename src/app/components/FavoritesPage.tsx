import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useCart } from "../../contexts/CartContext";
import { Product } from "../../services/api";

interface FavoritesPageProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onAddToCart: () => void;
}

export function FavoritesPage({ onBack, onProductClick,onAddToCart }: FavoritesPageProps) {
  const { favorites, removeFavorite } = useFavorites();
  const { addToCart } = useCart();

  // Tela de "vazio" (Empty State)
  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center pt-24 transition-colors duration-300">
        <Heart className="w-16 h-16 text-muted-foreground mb-6 opacity-50" strokeWidth={1} />
        <h2 className="text-2xl uppercase tracking-widest mb-4 font-light text-foreground">Sua lista está vazia</h2>
        <p className="text-muted-foreground mb-8">Explore a coleção e salve suas peças exclusivas aqui.</p>
        <button 
          onClick={onBack} 
          className="bg-foreground text-background px-8 py-3 uppercase tracking-widest text-xs hover:bg-muted-foreground transition-colors"
        >
          Explorar Coleção
        </button>
      </div>
    );
  }

  // Grid de Favoritos
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-6 lg:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12 border-b border-border pb-6">
          <h1 className="text-2xl lg:text-3xl tracking-[0.2em] uppercase font-light">Favoritos</h1>
          <span className="text-muted-foreground uppercase tracking-widest text-xs">
            {favorites.length} {favorites.length === 1 ? 'peça' : 'peças'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {favorites.map((product) => (
            <div key={product.id} className="group flex flex-col bg-card border border-border p-4 rounded-lg">
              
              {/* Imagem da Peça */}
              <div 
                className="relative aspect-[3/4] overflow-hidden mb-4 rounded cursor-pointer" 
                onClick={() => onProductClick(product)}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); // Evita que o clique na lixeira abra a tela do produto
                    removeFavorite(product.id); 
                  }}
                  className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:text-[#DC2626] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Informações e Ações */}
              <div className="flex flex-col flex-1">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                  {product.category}
                </p>
                <h3 
                  className="text-sm uppercase tracking-wider mb-2 cursor-pointer hover:underline" 
                  onClick={() => onProductClick(product)}
                >
                  {product.name}
                </h3>
                <p className="text-sm font-medium mt-auto mb-4">
                  {typeof product.price === 'number' 
                    ? product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    : "R$ 0,00"}
                </p>

                <button 
                  onClick={() => {
                    // 1. Adiciona ao carrinho
                    addToCart({ 
                      id: product.id, 
                      name: product.name, 
                      price: product.price, 
                      image: product.image 
                    });
                    // 2. Tira dos favoritos (limpa a tela na hora)
                    removeFavorite(product.id);
                    // 3. Puxa a aba de notificação lateral
                    onAddToCart();
                  }}
                  className="w-full bg-transparent border border-foreground text-foreground py-3 uppercase tracking-widest text-[10px] hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} />
                  Mover para a Sacola
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}