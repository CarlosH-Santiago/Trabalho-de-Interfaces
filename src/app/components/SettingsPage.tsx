import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, Shield, Settings as SettingsIcon, ArrowLeft, 
  MapPin, Package, PlusCircle, LogOut, Loader2, CheckCircle, Trash2, Edit2, Globe, Hash, FileText, Map
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext"; 
import { api } from "../../services/api";

type Tab = "geral" | "perfil" | "seguranca" | "admin"; 

interface SettingsPageProps {
  onBack: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function SettingsPage({ onBack, theme, toggleTheme }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>("perfil");
  
  // Estados do Admin
  const [adminView, setAdminView] = useState<"menu" | "nova-peca" | "estoque">("menu");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    image: ""
  });

  const { user, isAdmin, logout } = useAuth();

  const baseTabs: { id: Tab; label: string; icon: any }[] = [
    { id: "geral", label: "Geral", icon: SettingsIcon },
    { id: "perfil", label: "Perfil", icon: User },
    { id: "seguranca", label: "Segurança", icon: Shield },
  ];

  const tabs = isAdmin
    ? [...baseTabs, { id: "admin" as Tab, label: "Admin", icon: Package }]
    : baseTabs;

  const handleLogout = () => {
    logout();
    onBack(); 
  };

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    if (adminView === "estoque") fetchProducts();
  }, [adminView]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta peça?")) {
      await api.deleteProduct(id);
      fetchProducts();
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg("");

    try {
      await api.createProduct({
        name: productForm.name,
        category: productForm.category,
        price: Number(productForm.price),
        image: productForm.image,
      });

      setSuccessMsg("Peça adicionada ao catálogo com sucesso!");
      setProductForm({ name: "", category: "", price: "", image: "" });

      setTimeout(() => {
        setSuccessMsg("");
        setAdminView("menu");
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar a peça.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-input text-foreground p-8 md:p-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-12 transition-colors">
          <ArrowLeft size={20} />
          <span className="uppercase tracking-widest text-xs">Voltar</span>
        </button>

        <h1 className="text-3xl tracking-widest uppercase mb-12 border-b border-border pb-4">Configurações</h1>

        <div className="flex flex-col md:flex-row gap-12">
          <aside className="w-full md:w-64 shrink-0 flex flex-col justify-between">
            <nav className="flex flex-col gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const activeColor = tab.id === "admin" ? "border-[#DC2626] text-[#DC2626]" : "border-foreground text-foreground";
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (tab.id === "admin") setAdminView("menu");
                    }}
                    className={`flex items-center gap-4 px-6 py-4 text-left transition-all duration-300 border-l-2 ${
                      isActive ? `${activeColor} bg-card` : "border-transparent text-muted-foreground hover:text-foreground hover:bg-card/50"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="uppercase tracking-widest text-xs">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
            <button onClick={handleLogout} className="flex items-center gap-4 px-6 py-4 text-left transition-all duration-300 border-l-2 border-transparent text-muted-foreground hover:text-[#DC2626] hover:bg-[#DC2626]/10 mt-12">
              <LogOut size={18} />
              <span className="uppercase tracking-widest text-xs">Encerrar Sessão</span>
            </button>
          </aside>

          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + adminView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                
                {/* ABA: PERFIL */}
                {activeTab === "perfil" && (
                  <div className="md:col-span-2 bg-card p-8 rounded-xl border border-border">
                    <h2 className="text-xl tracking-widest uppercase mb-6 text-foreground">Dados Pessoais</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">Nome Completo</label>
                        <input type="text" defaultValue={user?.nome || ""} className="w-full bg-input border border-border p-4 text-sm text-foreground focus:border-[#DC2626] outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground">E-mail</label>
                        <input type="email" defaultValue={user?.email || ""} disabled className="w-full bg-input border border-border p-4 text-sm text-foreground opacity-70 cursor-not-allowed" />
                      </div>
                    </div>
                  </div>
                )}

                {/* ABA: ADMIN */}
                {activeTab === "admin" && isAdmin && (
                  <div className="md:col-span-2 bg-card border border-[#DC2626]/30 p-8 rounded-xl relative overflow-hidden min-h-[400px]">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#DC2626]"></div>
                    
                    {adminView === "menu" && (
                      <>
                        <h2 className="text-xl tracking-widest uppercase text-[#DC2626] mb-8 flex items-center gap-3"><Package size={22} /> Painel Administrativo</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <button onClick={() => setAdminView("nova-peca")} className="bg-input border border-border p-8 rounded-xl hover:border-[#DC2626] text-left group">
                            <PlusCircle className="w-8 h-8 mb-4 group-hover:text-[#DC2626]" />
                            <p className="text-sm uppercase tracking-widest font-semibold">Nova Peça</p>
                          </button>
                          <button onClick={() => setAdminView("estoque")} className="bg-input border border-border p-8 rounded-xl hover:border-[#DC2626] text-left group">
                            <Package className="w-8 h-8 mb-4 group-hover:text-[#DC2626]" />
                            <p className="text-sm uppercase tracking-widest font-semibold">Gerenciar Estoque</p>
                          </button>
                        </div>
                      </>
                    )}

                    {adminView === "nova-peca" && (
                      <>
                        <div className="flex items-center justify-between mb-8">
                          <h2 className="text-xl tracking-widest uppercase text-[#DC2626] flex items-center gap-3"><PlusCircle size={22} /> Cadastrar Nova Peça</h2>
                          <button onClick={() => setAdminView("menu")} className="text-xs underline text-muted-foreground">Cancelar</button>
                        </div>
                        {successMsg && <div className="mb-6 p-4 bg-green-500/10 text-green-500 text-sm rounded">{successMsg}</div>}
                        <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <input type="text" required value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} placeholder="Nome" className="md:col-span-2 bg-input border border-border p-4 text-sm" />
                          <input type="text" required value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})} placeholder="Categoria" className="bg-input border border-border p-4 text-sm" />
                          <input type="number" step="0.01" required value={productForm.price} onChange={(e) => setProductForm({...productForm, price: e.target.value})} placeholder="Preço" className="bg-input border border-border p-4 text-sm" />
                          <input type="url" required value={productForm.image} onChange={(e) => setProductForm({...productForm, image: e.target.value})} placeholder="URL Imagem" className="md:col-span-2 bg-input border border-border p-4 text-sm" />
                          <button type="submit" className="md:col-span-2 bg-[#DC2626] text-white p-4 uppercase text-xs">{isSubmitting ? "Salvando..." : "Finalizar"}</button>
                        </form>
                      </>
                    )}

                    {adminView === "estoque" && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl tracking-widest uppercase text-[#DC2626]"><Package size={22} /> Estoque</h2>
                          <button onClick={() => setAdminView("menu")} className="text-xs underline">Voltar</button>
                        </div>
                        <div className="bg-input border border-border rounded-xl overflow-hidden">
                          <table className="w-full text-left text-xs uppercase">
                            <thead className="bg-card text-muted-foreground">
                              <tr><th className="p-4">Peça</th><th className="p-4">Preço</th><th className="p-4 text-center">Ações</th></tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {products.map((prod) => (
                                <tr key={prod.id}>
                                  <td className="p-4">{prod.name}</td>
                                  <td className="p-4">R$ {prod.price.toFixed(2)}</td>
                                  <td className="p-4 flex justify-center gap-4">
                                    <button onClick={() => handleDelete(prod.id)} className="hover:text-red-500"><Trash2 size={16}/></button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* SEGURANÇA */}
                {activeTab === "seguranca" && (
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card p-8 rounded-xl border border-border">
                        <h2 className="text-xl tracking-widest uppercase mb-6">Alterar Senha</h2>
                        <div className="space-y-4">
                            <input type="password" placeholder="Senha Atual" className="w-full bg-input border border-border p-4 text-sm" />
                            <input type="password" placeholder="Nova Senha" className="w-full bg-input border border-border p-4 text-sm" />
                            <button className="bg-background border border-border px-8 py-3 text-xs uppercase">Atualizar</button>
                        </div>
                    </div>
                    <div className="bg-card p-8 rounded-xl border border-border border-dashed flex flex-col items-center justify-center text-center">
                        <Shield className="w-12 h-12 mb-4" />
                        <h3 className="text-sm uppercase tracking-widest mb-2">Autenticação 2FA</h3>
                        <button className="border border-border px-8 py-3 text-xs uppercase">Ativar</button>
                    </div>
                  </div>
                )}

                {/* GERAL */}
                {activeTab === "geral" && (
                  <div className="md:col-span-2 space-y-6">
                    <div className="bg-card p-8 rounded-xl border border-border">
                      <h2 className="text-xl tracking-widest uppercase mb-6 flex items-center gap-3"><MapPin size={20} /> Endereço</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <input type="text" placeholder="CEP" className="bg-input border border-border p-4 text-sm" />
                        <input type="text" placeholder="Endereço" className="col-span-2 bg-input border border-border p-4 text-sm" />
                        <input type="text" placeholder="Número" className="bg-input border border-border p-4 text-sm" />
                        <input type="text" placeholder="Cidade" className="bg-input border border-border p-4 text-sm" />
                        <input type="text" placeholder="Estado" className="bg-input border border-border p-4 text-sm" />
                      </div>
                    </div>
                    <div className="bg-card p-8 rounded-xl border border-border flex items-center justify-between">
                        <div>
                            <p className="text-sm">Modo Escuro</p>
                            <p className="text-xs text-muted-foreground">Alternar tema visual</p>
                        </div>
                        <button onClick={toggleTheme} className={`w-14 h-8 rounded-full p-1 transition-colors ${theme === "dark" ? "bg-[#DC2626]" : "bg-zinc-700"}`} />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}