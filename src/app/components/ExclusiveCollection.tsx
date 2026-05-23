import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ExclusiveCollection() {
  return (
    <section className="py-24 lg:py-32 bg-[#FAFAFA]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763914766563-d15bef819106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGNsb3RoaW5nJTIwYm91dGlxdWV8ZW58MXx8fHwxNzcyODMwMTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Exclusive Collection"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -right-8 bg-white p-8 shadow-lg max-w-xs"
            >
              <p className="text-xs tracking-[0.3em] uppercase mb-2 text-[#DC2626]">Edição Limitada</p>
              <h4 className="text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                Coleção Cápsula
              </h4>
              <p className="text-sm text-gray-600">
                Apenas 100 peças disponíveis
              </p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="space-y-8 lg:pl-12"
          >
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-6 text-gray-500">
                Exclusividade & Design
              </p>
              <h2 
                className="text-4xl lg:text-6xl mb-6 leading-[1.1]"
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
              >
                A arte de vestir com propósito
              </h2>
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Nossa coleção exclusiva é uma celebração do design consciente e da 
                atemporalidade. Cada peça é cuidadosamente desenvolvida para transcender 
                as tendências passageiras e se tornar um item essencial em seu guarda-roupa.
              </p>
              <p>
                Trabalhamos com os melhores tecidos naturais e técnicas artesanais, 
                garantindo que cada detalhe reflita nosso compromisso com a excelência 
                e a sustentabilidade.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-[#DC2626]"></div>
                <p className="text-sm">Produção Limitada</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-[#DC2626]"></div>
                <p className="text-sm">Matérias-Primas Premium</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-[#DC2626]"></div>
                <p className="text-sm">Design Atemporal</p>
              </div>
            </div>

            <button className="group bg-[#DC2626] text-white px-8 py-4 flex items-center gap-3 hover:bg-[#B91C1C] transition-all duration-300 mt-8">
              <span className="tracking-wide">Ver Coleção Completa</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
