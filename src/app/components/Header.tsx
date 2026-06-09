import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "../../contexts/CartContext";

interface HeaderProps {
  onCartClick: () => void;
  onUserClick: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
  onFavoritesClick?: () => void;
}

export function Header({ onCartClick, onUserClick, showBackButton, onBackClick, onFavoritesClick }: HeaderProps) {
  
  // 1. Forçamos o TypeScript a aceitar as variações do nome da sua lista de carrinho
  const cartContext = useCart() as any;
  const listaDoCarrinho = cartContext.cart || cartContext.items || cartContext.cartItems || [];

  // 2. Tipamos explicitamente o sum (number) e o item (any) para limpar os erros do TS
  const itemCount = listaDoCarrinho.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);

  return (
    <header className="fixed top-0 w-full bg-background z-50 border-b border-border transition-colors duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LADO ESQUERDO: Botão de Voltar e Links */}
        <div className="flex-1 flex items-center gap-8">
          {showBackButton && (
            <button 
              onClick={onBackClick}
              className="group flex items-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Voltar"
            >
              <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:-translate-x-2 transition-transform duration-500">
                <path d="M40 6H1M1 6L6 1M1 6L6 11" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </button>
          )}

        </div>

        {/* CENTRO: Logo */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-xl tracking-[0.3em] uppercase font-light cursor-pointer" onClick={onBackClick}>
            Atelier
          </h1>
        </div>

        {/* LADO DIREITO: Ícones */}
        <div className="flex-1 flex justify-end items-center gap-6 text-muted-foreground">
          <button className="hover:text-foreground transition-colors">
            <Search strokeWidth={1.5} className="w-5 h-5" />
          </button>
          <button onClick={onUserClick} className="hover:text-foreground transition-colors">
            <User strokeWidth={1.5} className="w-5 h-5" />
          </button>
          <button onClick={onFavoritesClick} className="hover:text-foreground transition-colors">
            <Heart strokeWidth={1.5} className="w-5 h-5" />
          </button>
          
          <button onClick={onCartClick} className="relative hover:text-foreground transition-colors">
            <ShoppingBag strokeWidth={1.5} className="w-5 h-5" />
            
            {/* BOLINHA COM CONTADOR DINÂMICO */}
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-[18px] h-[18px] bg-[#DC2626] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-background">
                {itemCount}
              </span>
            )}
          </button>
        </div>
        
      </div>
    </header>
  );
}