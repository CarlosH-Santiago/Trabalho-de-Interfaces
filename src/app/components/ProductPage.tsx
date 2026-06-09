import { useState } from "react";
import { ShoppingBag, Heart } from "lucide-react"; // Importamos o Heart
import { useCart } from "../../contexts/CartContext";
import { Product } from "../../services/api"; 
import { useFavorites } from "../../contexts/FavoritesContext";

interface ProductPageProps {
  product: Product; 
  onBack: () => void; // Mantemos a prop caso precise no futuro, mas tiramos o botão visual
  onAddToCart: () => void;
}

export function ProductPage({ product, onBack, onAddToCart }: ProductPageProps) {
  const { addToCart } = useCart();
  
  // Conectamos o cérebro dos favoritos
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFavorited = isFavorite(product.id);
  
  // Se houver tamanhos, seleciona o primeiro. Se não, fica vazio.
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ""
  );

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    onAddToCart();
  };

  return (
    <div className="min-h-screen bg-input text-foreground p-8 md:p-16 transition-colors duration-300">
      {/* Adicionamos um padding-top maior para compensar o Header fixo */}
      <div className="max-w-6xl mx-auto pt-12"> 
        
        {/* Layout Modular em Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Módulo de Imagem */}
          <div className="bg-card border border-border p-4 rounded-lg overflow-hidden relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-[600px] object-cover rounded hover:scale-[1.02] transition-transform duration-700" 
            />
          </div>

          {/* Módulo de Informações da Peça */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-2 border-b border-border pb-8">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                {product.category}
              </p>
              <h1 className="text-4xl tracking-widest uppercase">{product.name}</h1>
              <p className="text-2xl font-medium mt-4">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>

            {/* Seleção de Tamanho Modular */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-4">
                <h3 className="uppercase tracking-widest text-xs text-muted-foreground">
                  Selecione o Tamanho
                </h3>
                <div className="flex gap-4">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded border transition-colors flex items-center justify-center font-medium ${
                        selectedSize === size 
                          ? "bg-foreground text-background border-foreground" 
                          : "bg-card border-border text-foreground hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Informação de Estoque */}
            <p className="text-sm text-muted-foreground">
              Estoque disponível: <span className="text-foreground">{product.stock} peças</span>
            </p>

            {/* Call to Action Duplo (Sacola + Favoritos) */}
            <div className="flex gap-4 mt-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-background text-foreground py-4 uppercase tracking-widest text-sm hover:bg-muted transition-colors font-medium flex items-center justify-center gap-3 border border-border hover:border-foreground rounded"
              >
                <ShoppingBag size={18} />
                Adicionar à Sacola
              </button>

              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("CLIQUE NA TELA DO PRODUTO!", product.name);
                  toggleFavorite(product);
                }}
                // Aqui está o segredo: tiramos o 'absolute' e a 'opacity-0'.
                // Agora ele é um bloco de largura fixa (w-16) ao lado da sacola!
                className="w-16 flex items-center justify-center bg-card border border-border hover:border-foreground transition-colors rounded group cursor-pointer relative z-10"
                aria-label="Favoritar peça"
              >
                <Heart 
                  className={`w-6 h-6 transition-all duration-300 ${
                    isFavorited 
                      ? "fill-red-600 text-red-600 scale-110" 
                      : "text-foreground group-hover:text-red-600"
                  }`} 
                />
              </button>
            </div>

            {/* Descrição Fake de Acabamento */}
            <div className="bg-card p-6 rounded-lg border border-border mt-8">
              <h3 className="uppercase tracking-widest text-xs mb-3 text-muted-foreground">Detalhes da Peça</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Esta peça reflete uma fusão entre funcionalidade modular e estética minimalista. Desenvolvida para resistir ao tempo, garantindo um caimento impecável e adaptabilidade a diferentes composições.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}