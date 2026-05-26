import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  MapPin,
  Map,
  Hash,
  Globe,
  FileText,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface RegisterPageProps {
  onRegisterSuccess: () => void;
}

export function RegisterPage({ onRegisterSuccess }: RegisterPageProps) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else onRegisterSuccess();
  };

  const inputClass =
    "w-full pl-12 pr-4 py-3 bg-transparent border border-gray-200 rounded-2xl focus:border-black outline-none transition-all text-sm font-light";
  const labelClass = "text-[10px] uppercase tracking-widest text-gray-400 ml-2";

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 flex flex-col z-0">
        <div className="h-1/2 bg-[#DC2626]" />
        <div className="h-1/2 bg-white" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 bg-white w-full max-w-lg mx-6 p-8 md:p-12 rounded-[2rem] shadow-2xl border border-gray-100"
      >
        <div className="flex items-center justify-between mb-8">
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="text-gray-400 hover:text-black transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1 text-center">
            <h2 className="text-2xl tracking-[0.3em] font-light mb-1">
              ATELIER
            </h2>
            <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase">
              {step === 1 ? "Criar Conta" : "Endereço de Entrega"}
            </p>
          </div>
          {step === 2 && <div className="w-5" />}
        </div>

        <form onSubmit={handleNext} className="space-y-5">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className={labelClass}>Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Seu nome"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>Contato</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="email@exemplo.com"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={inputClass}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className={labelClass}>CEP</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="00000-000"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>Endereço</label>
                  <div className="relative">
                    <Map className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rua, Av..."
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={labelClass}>Bairro</label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Bairro"
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className={labelClass}>Estado</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="UF"
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className={labelClass}>Complemento</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Apto, Casa..."
                      className={inputClass}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className={`w-full py-4 rounded-2xl text-xs tracking-[0.2em] uppercase font-semibold transition-all shadow-lg mt-6 ${
              step === 1
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-[#22C55E] text-white hover:bg-[#16a34a] shadow-green-100"
            }`}
          >
            {step === 1 ? "Próximo Passo" : "Finalizar Cadastro"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
