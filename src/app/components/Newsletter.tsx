import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function Newsletter() {
  return (
    <section className="py-24 lg:py-32 bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 
            className="text-4xl lg:text-5xl mb-6 text-foreground"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
          >
            Assine nossa newsletter
          </h2>
          
          {/* CORREÇÃO 1: Substituído text-gray-600 por text-muted-foreground */}
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Receba em primeira mão nossas novidades, lançamentos exclusivos e conteúdo editorial sobre moda e estilo de vida.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            {/* CORREÇÃO 2 e 3: Fundo adaptável e borda adaptável no foco */}
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-6 py-4 bg-muted text-foreground border border-transparent focus:border-foreground focus:outline-none transition-colors placeholder:text-muted-foreground"
            />
            
            {/* CORREÇÃO 4: Botão adaptável ao tema (texto vaza no fundo, fundo vaza no texto) 
                Nota: Se o vermelho for a cor oficial da marca, você pode desfazer esta linha e manter o #DC2626 */}
            <button 
              type="submit"
              className="group bg-foreground text-background px-8 py-4 flex items-center justify-center gap-3 hover:bg-muted-foreground transition-all duration-300"
            >
              <span className="tracking-wide uppercase text-sm font-medium">Assinar</span>
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