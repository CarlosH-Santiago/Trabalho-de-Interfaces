import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
// Importe o Provider que acabamos de criar (ajuste o caminho se necessário)
import { CartProvider } from "./contexts/CartContext.tsx"; 

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <App />
  </CartProvider>
);