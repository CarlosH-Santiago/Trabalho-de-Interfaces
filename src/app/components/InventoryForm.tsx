import { motion, AnimatePresence } from "motion/react";
import { Camera, X } from "lucide-react";
import { useState } from "react";
import { api } from "../../services/api"; 

interface InventoryFormProps {
  onClose: () => void;
}

export function InventoryForm({ onClose }: InventoryFormProps) {
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const availableSizes = ["PP", "P", "M", "G", "GG", "U"];
  const availableColors = [
    { name: "Branco", hex: "#FFFFFF", border: true },
    { name: "Preto", hex: "#000000" },
    { name: "Areia", hex: "#F5F5DC" },
    { name: "Marinho", hex: "#000080" },
    { name: "Terracota", hex: "#E2725B" },
  ];

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");


  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const toggleColor = (color: string) => {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // Impede a página de recarregar
  console.log("Tentando enviar:", { name, price });
  
  try {
    await api.createProduct({
      name: name,
      category: "Geral", // Placeholder, já que o form não tem esse campo
      price: Number(price),
      image: "https://images.unsplash.com/photo-1626987937686-e8806e7bc8fc?q=80&w=1080" // Placeholder
    });
    
    alert("Produto cadastrado com sucesso!");
    onClose(); // Fecha o modal após sucesso
  } catch (err) {
    console.error(err);
    alert("Erro ao cadastrar. Verifique se a API do João está rodando.");
  }
};

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative bg-background w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="p-8 md:p-12">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 transition-colors group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 text-accent">
              Gestão de Estoque
            </p>
            <h2
              className="text-4xl lg:text-5xl font-light"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
              }}
            >
              Adicionar Novo Produto
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs tracking-widest uppercase text-muted-foreground">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-0 py-3 border-b border-gray-200 focus:border-black outline-none transition-colors bg-transparent text-foreground"
                  placeholder="Ex: Blazer Alfaiataria Lã"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-widest uppercase text-muted-foreground">
                  Marca
                </label>
                <input
                  type="text"
                  className="w-full px-0 py-3 border-b border-gray-200 focus:border-black outline-none transition-colors bg-transparent"
                  placeholder="Ex: Atelier Minimal"
                />
              </div>
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <label className="text-xs tracking-widest uppercase text-muted-foreground">
                Descrição do Produto
              </label>
              <textarea
                rows={3}
                className="w-full px-0 py-3 border-b border-gray-200 focus:border-black outline-none transition-colors bg-transparent resize-none font-light"
                placeholder="Descreva os detalhes, caimento e tecidos da peça..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs tracking-widest uppercase text-muted-foreground">
                  Valor (R$)
                </label>
                {/* Valor (R$) */}
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-0 py-3 border-b border-gray-200 focus:border-black outline-none transition-colors bg-transparent text-foreground"
                  placeholder="0,00"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs tracking-widest uppercase text-muted-foreground">
                  Fotos do Produto
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="w-20 h-20 border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-black hover:text-foreground transition-all gap-1"
                  >
                    <Camera className="w-5 h-5" />
                    <span className="text-[10px] uppercase tracking-tighter">
                      Adicionar
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <label className="text-xs tracking-widest uppercase text-muted-foreground">
                Tamanhos Disponíveis
              </label>
              <div className="flex flex-wrap gap-3">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`w-12 h-12 flex items-center justify-center text-xs tracking-widest border transition-all ${
                      sizes.includes(size)
                        ? "bg-black text-foreground border-black"
                        : "bg-background text-gray-600 border-gray-200 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Cores */}
            <div className="space-y-4">
              <label className="text-xs tracking-widest uppercase text-muted-foreground">
                Cores Disponíveis
              </label>
              <div className="flex flex-wrap gap-8">
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => toggleColor(color.name)}
                    className="group flex flex-col items-center gap-2"
                  >
                    <div
                      className={`w-10 h-10 rounded-full border transition-all duration-300 ${colors.includes(color.name) ? "scale-110 ring-1 ring-black ring-offset-4" : "scale-100"} ${color.border ? "border-gray-200" : "border-transparent"}`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <span
                      className={`text-[10px] uppercase tracking-widest transition-colors ${colors.includes(color.name) ? "text-foreground font-semibold" : "text-gray-400"}`}
                    >
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-12 border-t border-black/5">
              <button
                type="submit"
                className="group relative bg-black text-foreground px-12 py-5 overflow-hidden transition-all hover:bg-[#DC2626]"
              >
                <span className="relative z-10 text-xs tracking-[0.3em] uppercase">
                  Cadastrar Produto
                </span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
