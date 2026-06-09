# Atelier — Curadoria Digital de Alta Costura

## Visão Geral
O **Atelier** é uma plataforma de e-commerce de alto padrão, desenhada para oferecer uma experiência de compra minimalista e sofisticada. O projeto foca na gestão estruturada de catálogo, utilizando uma arquitetura modular que combina a precisão da engenharia de software com a estética da moda de luxo.

> "A tecnologia atua como o tecido de uma peça de alfaiataria: estruturada, precisa e invisivelmente complexa."

---

## ⚠️ Nota Importante: Escopo do Projeto
Este projeto encontra-se em uma fase de desenvolvimento focada em **Gestão de Conteúdo (CMS) e Backoffice**. 
*   **Não há sistema de checkout ou processamento de pagamentos** implementado.
*   O objetivo principal é demonstrar o controle de estoque, a gestão de produtos e o fluxo de autenticação com hierarquia (RBAC).

---

## 🛠 Funcionalidades para Teste
Como administrador, você pode validar as seguintes operações:
1. **Autenticação:** Login seguro com persistência de sessão.
2. **Dashboard Administrativo:** Acesso restrito ao painel de controle (apenas para perfis Admin).
3. **Gestão de Catálogo:**
   - **Adicionar:** Cadastro de novas peças no catálogo (Nome, Categoria, Preço, Imagem).
   - **Listar:** Visualização de todo o estoque cadastrado.
   - **Excluir:** Remoção segura de itens do inventário.

---

## 🧪 Guia de Testes (Acesso Admin)
Para avaliar a arquitetura do painel administrativo, você pode utilizar a conta de testes configurada abaixo. 

*Certifique-se de que o servidor e o banco de dados estejam rodando localmente.*

### Credenciais de Administrador
| Campo | Valor |
| :--- | :--- |
| **E-mail** | `caos@teste.com` |
| **Senha** | `senha-segura-123` |

**Passo a passo:**
1. Realize o login na página principal com as credenciais acima.
2. Acesse a página de **Configurações/Perfil**.
3. Observe a nova aba **"Admin"** (que só aparece para usuários com a role `admin`).
4. Clique em "Gerenciar Estoque" para listar os itens ou em "Nova Peça" para testar a criação de produtos.

---

## Stack Tecnológica
*   **Front-end:** React, TypeScript, Vite, TailwindCSS, Framer Motion (para transições fluidas), Lucide React (ícones).
*   **Back-end:** Node.js, Express, TypeScript.
*   **Banco de Dados:** MongoDB (Modelagem modular).
*   **Segurança:** JWT (JSON Web Tokens) e BCrypt para hashing.

---

## Como rodar o projeto

1. Clone o repositório: `git clone https://github.com/joaopinn/atelier-back-end.git`
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente (`.env`).
4. Inicie o Back-end: `npm run dev`
5. Inicie o Front-end: `npm run dev`

ou acesse esse link: https://atelier-puce-xi.vercel.app/

---

## Arquitetura
O projeto utiliza um **Monólito Modular**, o que nos permite manter a coesão das regras de negócio enquanto garantimos uma separação clara entre as responsabilidades de Autenticação, Produtos e Usuários. 

**Desenvolvido com foco em escalabilidade e organização visual.**

---

### Dica para o Avaliador:
*O sistema está configurado para que o banco de dados responda de forma assíncrona. Caso note algum atraso na listagem após a exclusão de um produto, o `useEffect` está encarregado de re-buscar os dados automaticamente.*
