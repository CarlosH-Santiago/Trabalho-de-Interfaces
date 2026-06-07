import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function Newsletter() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 
            className="text-4xl lg:text-5xl mb-6"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
          >
            Assine nossa newsletter
          </h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">
            Receba em primeira mão nossas novidades, lançamentos exclusivos e conteúdo editorial sobre moda e estilo de vida.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-6 py-4 bg-[#FAFAFA] border border-transparent focus:border-black focus:outline-none transition-colors"
            />
            <button 
              type="submit"
              className="group bg-[#DC2626] text-foreground px-8 py-4 flex items-center justify-center gap-3 hover:bg-[#B91C1C] transition-all duration-300"
            >
              <span className="tracking-wide">Assinar</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-xs text-muted-foreground mt-6">
            Ao se inscrever, você concorda com nossa política de privacidade.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
