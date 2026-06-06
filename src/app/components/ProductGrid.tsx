import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect, useRef, useState } from "react";
// 1. Importando o contexto do carrinho
import { useCart } from "../../contexts/CartContext";

// 2. Ajustando a interface para receber dados como se viessem de uma API real
interface Product {
  id: string; // Alterado para string
  name: string;
  category: string;
  price: number; // Alterado para number para permitir os cálculos
  image: string;
}

// Mock ajustado (preços como números reais e IDs como strings)
const products: Product[] = [
  {
    id: "1",
    name: "Camisa Linho Premium",
    category: "Camisaria",
    price: 680,
    image:
      "https://images.unsplash.com/photo-1626987937686-e8806e7bc8fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcyODMwMTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "2",
    name: "Blazer Alfaiataria",
    category: "Alfaiataria",
    price: 1280,
    image:
      "https://images.unsplash.com/photo-1633655442136-bbc120229009?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtZW5zd2VhciUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzcyODMwMTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "3",
    name: "Vestido Minimalista",
    category: "Essenciais",
    price: 890,
    image:
      "https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NzI3ODQ3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "4",
    name: "Conjunto Premium",
    category: "Loungewear",
    price: 1450,
    image:
      "https://images.unsplash.com/photo-1589986993357-6f9a171e02d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZmFzaGlvbiUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NzI4MzAxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "5",
    name: "Calça Alfaiataria",
    category: "Alfaiataria",
    price: 720,
    image:
      "https://images.unsplash.com/photo-1654707636800-a8f0acefaee9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjbG90aGluZyUyMGRldGFpbHxlbnwxfHx8fDE3NzI4MzAxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "6",
    name: "Trench Coat",
    category: "Outerwear",
    price: 2180,
    image:
      "https://images.unsplash.com/photo-1761637328025-bccb6ce8af34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbG9va2Jvb2slMjBtb2Rlcm58ZW58MXx8fHwxNzcyODMwMTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

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
  
  // 3. Puxando a função de adicionar ao carrinho do nosso "motor"
  const { addToCart } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 4. Função intermediária que faz as duas ações exigidas
  const handleAddToCartClick = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    // Dispara o toast visual que está no App.tsx
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
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#DC2626] hover:text-white">
          <Heart className="w-5 h-5" />
        </button>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          
          {/* 5. Conectando o clique no botão */}
          <button
            onClick={handleAddToCartClick}
            className="w-full bg-white text-black py-3 tracking-wide hover:bg-[#DC2626] hover:text-white transition-colors cursor-pointer"
          >
            Adicionar
          </button>

        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-500">
          {product.category}
        </p>
        <h3 className="text-base">{product.name}</h3>
        {/* 6. Formatando o número para o padrão de moeda do Brasil na hora de exibir */}
        <p className="text-sm text-gray-700">
          R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
      </div>
    </motion.div>
  );
}

interface ProductGridProps {
  onAddToCart: () => void;
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl lg:text-5xl mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
            }}
          >
            Novidades da Estação
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Peças selecionadas que combinam design atemporal com a mais alta
            qualidade
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}