import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductGrid } from "./components/ProductGrid";
import { ExclusiveCollection } from "./components/ExclusiveCollection";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { InventoryForm } from "./components/InventoryForm";
import { CartNotification } from "./components/CartNotification";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { LoginSuccessNotification } from "./components/LoginSuccessNotification";

export default function App() {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isLoginSuccessOpen, setIsLoginSuccessOpen] = useState(false);
  const [view, setView] = useState<"home" | "login" | "register">("home");

  return (
    <div className="min-h-screen bg-white">
      {/* Botão temporário para você alternar entre as páginas enquanto desenvolve */}
      {view === "home" && (
        <button
          onClick={() => setIsInventoryOpen(true)}
          className="fixed bottom-8 right-8 z-[60] bg-black text-white text-[10px] tracking-[0.2em] uppercase px-4 py-2 hover:bg-[#DC2626] transition-colors shadow-2xl"
        >
          Adicionar Produto
        </button>
      )}

      <Header onUserClick={() => setView(view === "home" ? "login" : "home")} />
      <main>
        {view === "home" ? (
          <>
            <Hero />
            <ProductGrid onAddToCart={() => setIsCartModalOpen(true)} />
            <ExclusiveCollection />
            <Newsletter />
          </>
        ) : view === "login" ? (
          <LoginPage
            onLoginSuccess={() => setIsLoginSuccessOpen(true)}
            onRegisterClick={() => setView("register")}
          />
        ) : (
          <RegisterPage onRegisterSuccess={() => setView("home")} />
        )}
      </main>
      <Footer isMinimal={view !== "home"} />

      {/* Modal de Inventário */}
      <AnimatePresence>
        {isInventoryOpen && (
          <InventoryForm onClose={() => setIsInventoryOpen(false)} />
        )}
      </AnimatePresence>

      {/* Notificação de Carrinho */}
      <AnimatePresence>
        {isCartModalOpen && (
          <CartNotification onClose={() => setIsCartModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* Notificação de Login com Sucesso */}
      <AnimatePresence>
        {isLoginSuccessOpen && (
          <LoginSuccessNotification
            onClose={() => {
              setIsLoginSuccessOpen(false);
              setView("home");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
