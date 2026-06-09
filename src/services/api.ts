// src/services/api.ts

const BASE_URL = "https://atelier-back-end.onrender.com"; 
// const BASE_URL = "http://localhost:3000"; 


export interface ProductData {
  name: string;
  category: string;
  price: number;
  image: string;
  stock?: number;  
  sizes?: string[]; 
}

export interface Product extends ProductData {
  id: string;
}

export const api = {
  login: async (email: string, senha: string) => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao fazer login");
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Função de Cadastro
  register: async (nome: string, email: string, senha: string) => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao cadastrar");
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      
      if (!response.ok) {
        throw new Error(`Falha ao buscar os produtos. Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // O ESCUDO: Forçamos a criação da propriedade 'id' usando o '_id' do MongoDB
      const arrayTratado = data.map((item: any) => ({
        ...item,
        id: item.id || item._id // Se não tiver 'id', ele clona o '_id'
      }));

      return arrayTratado;
      
    } catch (error) {
      console.error("Erro na API (GET):", error);
      throw error;
    }
  },

  // Adicione logo abaixo do getProducts
  async getProductById(id: string): Promise<Product> {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      
      if (!response.ok) {
        throw new Error("Não foi possível carregar os detalhes da peça.");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Erro na API (GET BY ID):", error);
      throw error;
    }
  },

  async createProduct(productData: ProductData) {
    try {
      // 3. CORREÇÃO DO POST: Enviamos o dado direto, já que o Mongoose 
      // agora aceita 'name' e 'price' no lugar de 'nomeDoProduto'
      const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...productData,
          stock: 10,
          sizes: ["P", "M", "G"]
        }),
      });

      if (!response.ok) {
        throw new Error("Não foi possível cadastrar a nova peça.");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro na API (POST):", error);
      throw error;
    }
  },

  async deleteProduct(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao deletar produto");
      return await response.json();
    } catch (error) {
      console.error("Erro na API (DELETE):", error);
      throw error;
    }
  },

  async updateProduct(id: string, productData: Partial<ProductData>) {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error("Erro ao atualizar produto");
      return await response.json();
    } catch (error) {
      console.error("Erro na API (PUT):", error);
      throw error;
    }
  },

};