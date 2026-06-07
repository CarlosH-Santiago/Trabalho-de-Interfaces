import { motion } from "motion/react";
import { Heart, AlertCircle, Loader2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../../contexts/CartContext"; 
import { api } from "../../services/api"; 

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

// 1. Componente de exibição (Presentational) - SEM lógica de API
function ProductCard({
  product,
  index,
  onAddToCart,
}: {
  product: Product;
  index: number; 
  onAddToCart: () => void;
}) {
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.2 },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    console.log("Campos disponíveis no produto:", Object.keys(product));
    console.log("Valor do campo 'price':", product.price);
    return () => observer.disconnect();
  }, []);
const handleAddToCartClick = () => {
  // DEBUG: Vamos ver se o preço existe antes de enviar
  console.log("DEBUGANDO PREÇO:", product.name, product.price);

  addToCart({
    id: product.id,
    name: product.name,
    price: product.price, // SE ISSO FOR UNDEFINED, O CARRINHO QUEBRA
    image: product.image,
  });
  
  onAddToCart(); 
};

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-card mb-4">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <button className="absolute top-4 right-4 w-10 h-10 bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#DC2626] hover:text-foreground">
          <Heart className="w-5 h-5" />
        </button>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCartClick}
            className="w-full bg-background text-foreground py-3 tracking-wide hover:bg-[#DC2626] hover:text-foreground transition-colors cursor-pointer"
          >
            Adicionar
          </button>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
          {product.category}
        </p>
        <h3 className="text-base">{product.name}</h3>
          <p className="text-sm">
            {(() => {
              // 1. Tenta achar o preço no objeto, não importa como esteja escrito
              const rawPrice = 
                product.price ?? 
                (product as any).preco ?? 
                (product as any).valor ?? 
                (product as any).Price ?? 
                (product as any).Preco ?? 
                0;

              // 2. Log de debug para vermos o que realmente está vindo
              // console.log("O objeto completo é:", JSON.stringify(product)); 

              // 3. Converte para número se for texto e formata
              const numericPrice = typeof rawPrice === 'string' ? parseFloat(rawPrice) : rawPrice;

              return typeof numericPrice === 'number' && !isNaN(numericPrice)
                ? numericPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                : "R$ 0,00";
            })()}
          </p>
      </div>
    </motion.div>
  );
}

// 2. Componente de Grid (Container) - COM lógica de API
interface ProductGridProps {
  onAddToCart: () => void;
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCollection() {
      try {
        setIsLoading(true);
        setError(null);
        
        // Force o 'data' a ser 'any' para que o TypeScript pare de reclamar
        const data: any = await api.getProducts(); 

        // Agora ele aceitará acessar .produtos sem erro
        const arrayParaExibir = Array.isArray(data) ? data : (data.produtos || []);
        setProducts(arrayParaExibir);
      } catch (err) {
        console.error(err);
        setError("Não foi possível conectar ao servidor.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCollection();
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl mb-4 font-serif italic">Novidades da Estação</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Peças selecionadas que combinam design atemporal com a mais alta qualidade
          </p>
        </motion.div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-accent" />
            <p className="text-xs uppercase tracking-widest">Carregando coleção...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-red-500">
            <AlertCircle className="w-8 h-8 mb-4" />
            <p className="text-xs uppercase tracking-widest">{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16">
            {products.map((product, index) => (
              <ProductCard
                // Usamos o product.id, mas se ele não existir, usamos o index como fallback
                key={product.id || index} 
                product={product}
                index={index}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}