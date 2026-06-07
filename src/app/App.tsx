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
import { CartPage } from "./components/CartPage";import { SettingsPage } from "./components/SettingsPage";

export default function App() {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isLoginSuccessOpen, setIsLoginSuccessOpen] = useState(false);
  const [view, setView] = useState<"home" | "login" | "register" | "cart" | "products" | "favorites" | "collections" | "editorial" | "settings">("home");
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");


return (

    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        
        <Header 
          onCartClick={() => setView("cart")}
          onUserClick={() => isLoggedIn ? setView("settings") : setView("login")} 
        />
      
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
            onLoginSuccess={() => {
              // 3. ATUALIZADO: Quando o login der certo, mudamos o estado para true
              setIsLoggedIn(true);
              setIsLoginSuccessOpen(true);
            }}
            onRegisterClick={() => setView("register")}
          />
        ) : view === "register" ? (
          <RegisterPage onRegisterSuccess={() => setView("home")} />
        ) : view === "cart" ? (
          <CartPage 
            onBack={() => setView("home")} 
            // 4. ATUALIZADO: Interceptando o clique de finalizar compra
            onCheckout={() => {
              if (!isLoggedIn) {
                // Se não estiver logado, manda para o login!
                setView("login");
              } else {
                // Se estiver logado, segue o fluxo de pagamento (por enquanto só um alerta)
                alert("Redirecionando para o checkout protegido...");
              }
            }}
          />
        ) : view === "settings" ? (
          <SettingsPage 
            onBack={() => setView("home")} 
            theme={theme} 
            toggleTheme={toggleTheme} 
          />
        ) : null}
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
    </div>
  );
}
