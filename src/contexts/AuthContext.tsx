import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Tipagem do usuário que vem do seu Back-end
interface User {
  id: string;
  nome: string;
  email: string;
  role: 'admin' | 'customer';
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Quando o app abrir, ele busca no cache para ver se o usuário já estava logado
  useEffect(() => {
    const storedUser = localStorage.getItem("@Atelier:User");
    const storedToken = localStorage.getItem("@Atelier:Token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (userData: User, jwtToken: string) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("@Atelier:User", JSON.stringify(userData));
    localStorage.setItem("@Atelier:Token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("@Atelier:User");
    localStorage.removeItem("@Atelier:Token");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        isAuthenticated: !!user, 
        isAdmin: user?.role === 'admin',
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);