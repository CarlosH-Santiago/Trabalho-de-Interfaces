import {
  Mail, Lock, Eye, EyeOff, User, Phone, MapPin, Map, Hash, Globe, FileText, ChevronLeft, Loader2, AlertCircle
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

interface RegisterPageProps {
  onRegisterSuccess: () => void;
  onLoginClick: () => void; // NOVO: Prop para o botão de voltar ao login
}

export function RegisterPage({ onRegisterSuccess, onLoginClick }: RegisterPageProps) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [estado, setEstado] = useState("");
  const [complemento, setComplemento] = useState("");

  // Puxamos o motor de login
  const { login } = useAuth();

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (step === 1) {
      setStep(2);
    } else {
      setIsLoading(true);
      try {
        // 1. Cadastra o usuário no banco
        await api.register(nome, email, senha);
        
        // 2. AUTO-LOGIN: Se o cadastro deu certo, já pega o token e loga na hora!
        const authData = await api.login(email, senha);
        login(authData.user, authData.token);

        // 3. Redireciona logado
        onRegisterSuccess();
      } catch (err: any) {
        setApiError(err.message || "Ocorreu um erro ao criar a conta.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const inputClass =
    "w-full pl-12 pr-4 py-3 bg-transparent border border-gray-200 dark:border-gray-700 rounded-2xl focus:border-black dark:focus:border-white outline-none transition-all text-sm font-light";
  const labelClass = "text-[10px] uppercase tracking-widest text-gray-400 ml-2";

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 flex flex-col z-0">
        <div className="h-1/2 bg-[#DC2626]" />
        <div className="h-1/2 bg-background" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 bg-background w-full max-w-lg mx-6 p-8 md:p-12 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800"
      >
        <div className="flex items-center justify-between mb-8">
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-gray-400 hover:text-foreground transition-colors"
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

        {apiError && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-500 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{apiError}</p>
          </motion.div>
        )}

        <form onSubmit={handleNext} className="space-y-5">
          <AnimatePresence mode="wait">
            {/* ... OS SEUS INPUTS DO STEP 1 E 2 CONTINUAM EXATAMENTE IGUAIS AQUI ... */}
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
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
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
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      placeholder="••••••••"
                      className={inputClass}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
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
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
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
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
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
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
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
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
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
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-xs tracking-[0.2em] uppercase font-semibold transition-all shadow-lg mt-6 disabled:opacity-50 ${
              step === 1
                ? "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800"
                : "bg-[#111111] dark:bg-white text-white dark:text-black hover:bg-[#333333]"
            }`}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {step === 1 
              ? "Próximo Passo" 
              : isLoading ? "Criando Conta..." : "Finalizar Cadastro"
            }
          </button>

          {/* NOVO: Botão de voltar ao login */}
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={onLoginClick}
              className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              Já possui uma conta?{" "}
              <span className="font-bold underline underline-offset-4">
                Efetuar Login
              </span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}