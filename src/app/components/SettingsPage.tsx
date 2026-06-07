import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Shield, Settings, ArrowLeft, MapPin, CreditCard } from "lucide-react";

type Tab = "geral" | "perfil" | "seguranca";

interface SettingsPageProps {
  onBack: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function SettingsPage({ onBack, theme, toggleTheme }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>("perfil");

  // Navegação Lateral Modular
  const tabs = [
    { id: "geral", label: "Geral", icon: Settings },
    { id: "perfil", label: "Perfil", icon: User },
    { id: "seguranca", label: "Segurança", icon: Shield },
  ] as const;

  return (
    <div className="min-h-screen bg-input text-foreground p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabeçalho */}
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors">
          <ArrowLeft size={20} />
          <span className="uppercase tracking-widest text-xs">Voltar</span>
        </button>

        <h1 className="text-3xl tracking-widest uppercase mb-12 border-b border-border pb-4">
          Configurações
        </h1>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Menu Lateral */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="flex flex-col gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-4 px-6 py-4 text-left transition-all duration-300 border-l-2 ${
                      isActive 
                        ? "border-[#DC2626] bg-card text-foreground" 
                        : "border-transparent text-muted-foreground hover:text-zinc-300 hover:bg-card/50"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="uppercase tracking-widest text-xs">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Área Principal (O Bento Grid) */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                
                {/* ABA: PERFIL */}
                {activeTab === "perfil" && (
                  <>
                    <div className="md:col-span-2 bg-card p-8 rounded-xl border border-border">
                      <h2 className="text-xl tracking-widest uppercase mb-6 text-foreground">Dados Pessoais</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-muted-foreground">Nome Completo</label>
                          <input type="text" defaultValue="João Guilherme" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:border-[#DC2626] outline-none transition-colors" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-muted-foreground">E-mail</label>
                          <input type="email" defaultValue="joao@gmail.com" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:border-[#DC2626] outline-none transition-colors" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-muted-foreground">Telefone</label>
                          <input type="text" defaultValue="(75) 9 9999-9999" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:border-[#DC2626] outline-none transition-colors" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-muted-foreground">Data de Nascimento</label>
                          <input type="text" defaultValue="00/00/0000" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:border-[#DC2626] outline-none transition-colors" />
                        </div>
                      </div>
                      <button className="mt-8 bg-background text-foreground px-8 py-3 uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors">
                        Salvar Alterações
                      </button>
                    </div>
                  </>
                )}

                {/* ABA: SEGURANÇA */}
                {activeTab === "seguranca" && (
                  <>
                    <div className="bg-card p-8 rounded-xl border border-border flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl tracking-widest uppercase mb-6 text-foreground">Alterar Senha</h2>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-muted-foreground">Senha Atual</label>
                            <input type="password" placeholder="••••••••" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:border-[#DC2626] outline-none transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-muted-foreground">Nova Senha</label>
                            <input type="password" placeholder="••••••••" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:border-[#DC2626] outline-none transition-colors" />
                          </div>
                        </div>
                      </div>
                      <button className="mt-8 bg-background text-foreground px-8 py-3 uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors w-fit">
                        Atualizar Senha
                      </button>
                    </div>

                    <div className="bg-card p-8 rounded-xl border border-border border-dashed flex flex-col items-center justify-center text-center">
                      <Shield className="w-12 h-12 text-zinc-700 mb-4" />
                      <h3 className="text-sm tracking-widest uppercase text-foreground mb-2">Autenticação em 2 Fatores</h3>
                      <p className="text-xs text-muted-foreground mb-6">Aumente a segurança da sua conta exigindo um código adicional no login.</p>
                      <button className="border border-zinc-700 text-foreground px-8 py-3 uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors">
                        Ativar 2FA
                      </button>
                    </div>
                  </>
                )}

              {/* ABA: GERAL */}
              {activeTab === "geral" && (
                <>
                  {/* Bloco de Endereço (Original) */}
                  <div className="md:col-span-2 bg-card p-8 rounded-xl border border-border">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl tracking-widest uppercase text-foreground flex items-center gap-3">
                        <MapPin size={20} className="text-accent"/> Endereço de Entrega
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">CEP</label>
                        <input type="text" placeholder="00000-000" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:border-[#DC2626] outline-none transition-colors" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Endereço</label>
                        <input type="text" placeholder="Nome da rua, Avenida" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:border-[#DC2626] outline-none transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Número</label>
                        <input type="text" placeholder="123" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:border-[#DC2626] outline-none transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Cidade</label>
                        <input type="text" placeholder="Sua Cidade" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:border-[#DC2626] outline-none transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Estado</label>
                        <input type="text" placeholder="UF" className="w-full bg-input border border-border p-4 text-sm text-foreground focus:border-[#DC2626] outline-none transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Novo Bloco: Preferências Visuais */}
                  <div className="md:col-span-2 bg-card p-8 rounded-xl border border-border">
                    <h2 className="text-xl tracking-widest uppercase text-foreground mb-6">Preferências Visuais</h2>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-foreground">Modo Escuro</p>
                        <p className="text-xs text-muted-foreground">Alterne entre o visual claro ou o modo escuro</p>
                      </div>
                      
                      {/* Toggle Switch */}
                      <button
                        onClick={toggleTheme}
                        className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                          theme === "dark" ? "bg-[#DC2626]" : "bg-zinc-700"
                        }`}
                      >
                        <motion.div
                          className="bg-background w-6 h-6 rounded-full shadow-md"
                          animate={{ x: theme === "dark" ? 24 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>
                  </div>
                </>
              )}

              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}