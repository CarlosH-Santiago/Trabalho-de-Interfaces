/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Isso aqui é o que habilita o Dark Mode via classe
  darkMode: 'class', 
  
  // 2. Isso garante que o Tailwind leia todos os seus arquivos dentro da pasta src
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}