import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface LoginPageProps {
  onLoginSuccess: () => void;
  onRegisterClick: () => void;
}

export function LoginPage({ onLoginSuccess, onRegisterClick }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados dos inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados de erro
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    // Resetando os erros
    setEmailError("");
    setPasswordError("");

    // Validação de E-mail
    if (!email) {
      setEmailError("O e-mail é obrigatório.");
      isValid = false;
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Insira um e-mail válido.");
      isValid = false;
    }

    // Validação de Senha
    if (!password) {
      setPasswordError("A senha é obrigatória.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      isValid = false;
    }

    // Só permite o sucesso se passar por todas as validações
    if (isValid) {
      onLoginSuccess();
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Split */}
      <div className="absolute inset-0 flex flex-col z-0">
        <div className="h-1/2 bg-[#DC2626]" />
        <div className="h-1/2 bg-background" />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-background w-full max-w-md mx-6 p-10 rounded-[2rem] shadow-2xl border border-gray-100"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl tracking-[0.3em] font-light mb-1">ATELIER</h2>
          <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase">
            Acesso
          </p>
        </div>

        {/* Adicionado noValidate para impedir o balão nativo do navegador e usar a nossa UI */}
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="space-y-1">
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${emailError ? "text-red-500" : "text-gray-400"}`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className={`w-full pl-12 pr-4 py-3 bg-transparent border ${
                  emailError ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-black"
                } rounded-2xl outline-none transition-all text-sm font-light`}
              />
            </div>
            {/* Mensagem de erro do e-mail */}
            {emailError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-red-500 flex items-center gap-1 pl-2">
                <AlertCircle size={10} /> {emailError}
              </motion.p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${passwordError ? "text-red-500" : "text-gray-400"}`} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className={`w-full pl-12 pr-12 py-3 bg-transparent border ${
                  passwordError ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-black"
                } rounded-2xl outline-none transition-all text-sm font-light`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Mensagem de erro da senha */}
            {passwordError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-red-500 flex items-center gap-1 pl-2">
                <AlertCircle size={10} /> {passwordError}
              </motion.p>
            )}
            
            <div className="text-right pt-1">
              <a href="#" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-foreground transition-colors">
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 space-y-6">
            <button
              type="submit"
              className="w-full bg-[#111111] text-foreground py-4 rounded-2xl text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#2e2e2e] transition-colors shadow-lg shadow-black/10"
            >
              Acessar
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={onRegisterClick}
                className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
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