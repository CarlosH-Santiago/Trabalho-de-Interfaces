import { ShoppingBag, Search, Menu, Heart, User, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onUserClick?: () => void;
}

export function Header({ onUserClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Left Menu */}
          <button className="lg:hidden p-2 hover:bg-gray-50 transition-colors">
            <Menu className="w-5 h-5" />
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="#"
              className="text-sm tracking-wide hover:text-[#DC2626] transition-colors"
            >
              Novo
            </a>
            <a
              href="#"
              className="text-sm tracking-wide hover:text-[#DC2626] transition-colors"
            >
              Coleções
            </a>
            <a
              href="#"
              className="text-sm tracking-wide hover:text-[#DC2626] transition-colors"
            >
              Editorial
            </a>
          </nav>

          {/* Logo / Container de Pesquisa */}
          <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-[600px] md:max-w-xl flex justify-center px-4">
            {/* ^ ALTERE A LARGURA ACIMA (ex: max-w-2xl ou max-w-[600px]) */}
            <AnimatePresence mode="wait">
              {!isSearchOpen ? (
                <motion.h1
                  key="logo"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                  className="text-2xl tracking-[0.3em] font-light"
                >
                  ATELIER
                </motion.h1>
              ) : (
                <motion.div
                  key="search-input"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full flex items-center bg-gray-100/80 px-12 py-4 border-b border-black/20 shadow-md backdrop-blur-md"
                  // ^ ALTERE A ALTURA NO 'py-6' (ex: py-8 para mais alto, py-4 para mais baixo)
                >
                  <input
                    autoFocus
                    type="text"
                    placeholder="O QUE VOCÊ PROCURA?"
                    className="w-full bg-transparent text-center text-xs tracking-[0.4em] outline-none placeholder:text-gray-400 uppercase font-light"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              {isSearchOpen ? (
                <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
            </button>
            <button
              onClick={onUserClick}
              className="p-2 hover:bg-gray-50 transition-colors hidden lg:block cursor-pointer group"
            >
              <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="p-2 hover:bg-gray-50 transition-colors hidden lg:block">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-50 transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
