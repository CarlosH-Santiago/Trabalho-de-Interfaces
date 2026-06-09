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
import { ProductPage } from "./components/ProductPage";
import { Product } from "../services/api";
import { FavoritesPage } from "./components/FavoritesPage";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import { CartProvider } from '../contexts/CartContext';
import { AuthProvider } from "../contexts/AuthContext";

export default function App() {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isLoginSuccessOpen, setIsLoginSuccessOpen] = useState(false);
  const [view, setView] = useState<"home" | "login" | "register" | "cart" | "products" | "product" | "favorites" | "collections" | "editorial" | "settings">("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

return (
  <AuthProvider>
    <CartProvider>
        <FavoritesProvider>

        <div className={theme === "dark" ? "dark" : ""}>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            
            <Header 
              onCartClick={() => setView("cart")}
              onUserClick={() => isLoggedIn ? setView("settings") : setView("login")} 
              // O botão de voltar aparece se não estivermos na tela 'home'
              showBackButton={view !== "home"} 
              // Função que limpa o produto selecionado e volta pra home
              onBackClick={() => {
                if (view === "product") setSelectedProduct(null);
                setView("home");
              }}
              onFavoritesClick={() => setView("favorites")}
              />
          

          <main>
            {view === "home" ? (
              <>
                <Hero />
                <ProductGrid 
                  onAddToCart={() => setIsCartModalOpen(true)} 
                  onProductClick={(product) => {
                    setSelectedProduct(product); // Salva o objeto inteiro!
                    setView("product");
                  }}
                />
                <ExclusiveCollection />
                <Newsletter />
              </>
            ) : view === "product" && selectedProduct ? (
              // 5. A nova rota para o produto isolado
              <ProductPage 
                product={selectedProduct} // Passa o objeto inteiro!
                onBack={() => {
                  setSelectedProduct(null);
                  setView("home");
                }} 
                onAddToCart={() => setIsCartModalOpen(true)}
        />
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
          <RegisterPage 
            onRegisterSuccess={() => {
              setIsLoggedIn(true);
              setView("home");
              setIsLoginSuccessOpen(true); // Exibe o modal de boas-vindas
            }} 
            onLoginClick={() => setView("login")} // Conecta o novo botão
          />
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
            ) : view === "favorites" ? (      // <--- ADICIONE ESTE BLOCO
              <FavoritesPage 
                onBack={() => setView("home")} 
                onProductClick={(product) => {
                  setSelectedProduct(product);
                  setView("product");
                }} 
                onAddToCart={() => setIsCartModalOpen(true)}
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
        </FavoritesProvider>
    </CartProvider>
</AuthProvider>
  );
}
