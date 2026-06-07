import { motion } from "motion/react";
import { ShoppingBag } from "lucide-react";

interface CartNotificationProps {
  onClose: () => void;
}

export function CartNotification({ onClose }: CartNotificationProps) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      {/* Background escurecido */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      />

      {/* Modal de Confirmação */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-background p-10 md:p-12 shadow-2xl flex flex-col items-center text-center max-w-sm w-full"
      >
        <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-foreground" />
        </div>

        <h3 className="text-xs tracking-[0.3em] uppercase mb-8 font-light text-foreground">
          Produto adicionado à cesta
        </h3>

        <button
          onClick={onClose}
          className="w-full bg-black text-foreground text-[10px] tracking-[0.2em] uppercase py-4 hover:bg-[#DC2626] transition-colors duration-300"
        >
          Okay
        </button>
      </motion.div>
    </div>
  );
}
