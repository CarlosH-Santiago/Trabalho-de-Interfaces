import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      > 
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1764998112626-23f005c580d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwbW9kZWwlMjBlbGVnYW50fGVufDF8fHx8MTc3MjgxMTIyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Luxury Fashion Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white/80"></div>
      </motion.div>

      {/* Content */}
      <div className="relative h-full flex items-end pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="text-sm tracking-[0.3em] uppercase mb-6 text-gray-700">
              Primavera Verão 2026
            </p>
            <h2 
              className="text-5xl lg:text-7xl mb-8 leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
            >
              Elegância que<br />transcende o tempo
            </h2>
            <p className="text-lg text-gray-700 mb-10 max-w-xl leading-relaxed">
              Descubra nossa nova coleção exclusiva, onde o minimalismo encontra a sofisticação em cada detalhe.
            </p>
            <button className="group bg-[#DC2626] text-foreground px-8 py-4 flex items-center gap-3 hover:bg-[#B91C1C] transition-all duration-300">
              <span className="tracking-wide">Explorar Coleção</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
