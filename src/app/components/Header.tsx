import { ShoppingBag, Search, Menu, Heart, User } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Left Menu */}
          <button className="lg:hidden p-2 hover:bg-gray-50 transition-colors">
            <Menu className="w-5 h-5" />
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-sm tracking-wide hover:text-[#DC2626] transition-colors">
              Novo
            </a>
            <a href="#" className="text-sm tracking-wide hover:text-[#DC2626] transition-colors">
              Coleções
            </a>
            <a href="#" className="text-sm tracking-wide hover:text-[#DC2626] transition-colors">
              Editorial
            </a>
          </nav>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-2xl tracking-[0.3em] font-light">ATELIER</h1>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-50 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-50 transition-colors hidden lg:block">
              <User className="w-5 h-5" />
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
