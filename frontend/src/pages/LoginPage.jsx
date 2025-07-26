// src/pages/LoginPage.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggleButton from "../components/ThemeToggleButton"; // Importa o botão de tema
import logo from "../assets/logo.png"; // Importa o logo

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const resposta = await fetch(
        "https://organizainfinity.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha }),
        }
      );
      const data = await resposta.json();
      if (!resposta.ok)
        throw new Error(data.message || "Erro de autenticação.");
      if (data.user && data.token) {
        login(data.user, data.token);
      } else {
        throw new Error("Resposta da API inválida.");
      }
    } catch (err) {
      console.error("Falha no login:", err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    // O 'p-4' aqui garante um respiro geral da página
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-infinity-dark">
      <div className="absolute top-5 right-5">
        <ThemeToggleButton />
      </div>

      {/* Este container é a chave da responsividade:
          w-full -> ocupa 100% da largura disponível
          max-w-md -> mas não passa de um limite máximo (medium) em telas grandes
      */}
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <img src={logo} alt="Infinity School Logo" className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-infinity-red">
            Organiza
            <span className="font-light text-gray-700 dark:text-infinity-text">
              Infinity
            </span>
          </h1>
        </div>

        {/* Padding responsivo: p-6 em telas pequenas, sm:p-8 em telas maiores */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-infinity-gray p-6 sm:p-8 rounded-lg shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-infinity-text">
            Acessar Plataforma
          </h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-50 dark:bg-infinity-dark border border-gray-300 dark:border-infinity-gray-light rounded-md text-gray-800 dark:text-infinity-text focus:outline-none focus:ring-2 focus:ring-infinity-red"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-3 bg-gray-50 dark:bg-infinity-dark border border-gray-300 dark:border-infinity-gray-light rounded-md text-gray-800 dark:text-infinity-text focus:outline-none focus:ring-2 focus:ring-infinity-red"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-infinity-red text-white font-bold py-3 rounded-lg hover:brightness-110 transition-all disabled:bg-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </form>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-infinity-red hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
