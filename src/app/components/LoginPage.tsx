import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface LoginPageProps {
  onLoginSuccess: () => void;
  onRegisterClick: () => void;
}

export function LoginPage({ onLoginSuccess, onRegisterClick }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Split */}
      <div className="absolute inset-0 flex flex-col z-0">
        <div className="h-1/2 bg-[#DC2626]" />
        <div className="h-1/2 bg-white" />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white w-full max-w-md mx-6 p-10 rounded-[2rem] shadow-2xl border border-gray-100"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl tracking-[0.3em] font-light mb-1">ATELIER</h2>
          <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase">
            Acesso
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="E-mail"
                className="w-full pl-12 pr-4 py-3 bg-transparent border border-gray-200 rounded-2xl focus:border-black outline-none transition-all text-sm font-light"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                className="w-full pl-12 pr-12 py-3 bg-transparent border border-gray-200 rounded-2xl focus:border-black outline-none transition-all text-sm font-light"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="text-right">
              <a
                href="#"
                className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
              >
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 space-y-6">
            <button
              type="submit"
              className="w-full bg-[#22C55E] text-white py-4 rounded-2xl text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#16a34a] transition-colors shadow-lg shadow-green-100"
            >
              Acessar
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={onRegisterClick}
                className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
              >
                Não tem uma conta?{" "}
                <span className="font-bold underline underline-offset-4">
                  Clique aqui
                </span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
