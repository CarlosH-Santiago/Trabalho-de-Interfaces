import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../services/api";

interface FavoritesContextData {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // 1. Inicializa buscando da memória do navegador (LocalStorage)
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem("@Atelier:Favorites");
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  // 2. Sempre que a lista mudar, salva na memória novamente
  useEffect(() => {
    localStorage.setItem("@Atelier:Favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Função auxiliar para blindar o problema do MongoDB (_id vs id)
  const getSafeId = (product: any) => product.id || product._id;

  const toggleFavorite = (product: Product) => {
    const safeId = product.id || (product as any)._id; // Força a busca pelo ID
    
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((p) => (p.id || (p as any)._id) === safeId);
      
      if (isAlreadyFavorite) {
        console.log("💔 Removendo:", product.name);
        return prev.filter((p) => (p.id || (p as any)._id) !== safeId);
      }
      
      console.log("❤️ Adicionando:", product.name);
      return [...prev, product];
    });
  };;

  const addFavorite = (product: Product) => {
    // Mantida para compatibilidade, mas agora usa a lógica blindada
    const safeId = getSafeId(product);
    setFavorites((prev) => {
      if (prev.some((p) => getSafeId(p) === safeId)) return prev;
      return [...prev, product];
    });
  };

  const removeFavorite = (productId: string) => {
    setFavorites((prev) => prev.filter((p) => getSafeId(p) !== productId));
  };

  const isFavorite = (productId: string) => {
    return favorites.some((p) => getSafeId(p) === productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);