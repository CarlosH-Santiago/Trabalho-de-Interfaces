import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface LoginSuccessNotificationProps {
  onClose: () => void;
}

export function LoginSuccessNotification({
  onClose,
}: LoginSuccessNotificationProps) {
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
        className="relative bg-white p-10 md:p-12 shadow-2xl flex flex-col items-center text-center max-w-sm w-full rounded-sm"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-[#22C55E]" />
        </div>

        <div className="mb-8">
          <h3 className="text-xs tracking-[0.3em] uppercase mb-2 font-light text-gray-900">
            Login efetuado com Sucesso
          </h3>
          <p className="text-xs tracking-[0.1em] text-gray-500 uppercase font-light">
            Seja Bem vindo!
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-black text-white text-[10px] tracking-[0.2em] uppercase py-4 hover:bg-[#22C55E] transition-colors duration-300"
        >
          Continuar
        </button>
      </motion.div>
    </div>
  );
}
