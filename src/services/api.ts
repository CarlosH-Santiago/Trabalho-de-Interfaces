// src/services/api.ts

const BASE_URL = "http://localhost:3000";

// O que usamos para enviar ao back-end (POST)
export interface ProductData {
  name: string;
  category: string;
  price: number;
  image: string;
}

// O que a interface visual precisa receber (GET)
export interface Product extends ProductData {
  id: string;
}

export const api = {
  // 1. CORREÇÃO: Tipando explicitamente o retorno como Promise<Product[]>
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${BASE_URL}/produtos`);
      
      if (!response.ok) {
        throw new Error("Falha ao buscar os produtos da coleção.");
      }
      
      const data = await response.json();
      // Adicione isso antes do .map
      console.log("DADO QUE CHEGOU DO BACKEND:", data);
      return data.map((backendProduct: any) => ({
        id: backendProduct._id,
        name: backendProduct.nomeDoProduto, 
        price: backendProduct.preco,
        category: "Exclusivo", 
        image: "https://images.unsplash.com/photo-1626987937686-e8806e7bc8fc?q=80&w=1080",
      }));
      
    } catch (error) {
      console.error("Erro na API (GET):", error);
      throw error;
    }
  },

  async createProduct(productData: ProductData) {
    try {
      const payloadBackend = {
        nomeDoProduto: productData.name,
        preco: productData.price,
        estoque: 10,
        tamanho: ["P", "M", "G"], 
      };

      const response = await fetch(`${BASE_URL}/produtos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadBackend),
      });

      if (!response.ok) {
        throw new Error("Não foi possível cadastrar a nova peça.");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro na API (POST):", error);
      throw error;
    }
  }
};