// src/pages/RegisterPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggleButton from "../components/ThemeToggleButton";
import logo from "../assets/logo.png";

function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://organizainfinity.onrender.com/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, senha }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Erro no servidor.");
      }
      alert("Usuário cadastrado com sucesso!");
      navigate("/login");
    } catch (err) {
      console.error("Falha ao tentar cadastrar: " + err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-infinity-dark">
      <div className="absolute top-5 right-5">
        <ThemeToggleButton />
      </div>
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
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-infinity-gray p-8 rounded-lg shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-infinity-text">
            Criar Nova Conta
          </h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1"
            >
              Nome Completo
            </label>
            <input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-3 bg-gray-50 dark:bg-infinity-dark border border-gray-300 dark:border-infinity-gray-light rounded-md text-gray-800 dark:text-infinity-text focus:outline-none focus:ring-2 focus:ring-infinity-red"
              required
              disabled={isLoading}
            />
          </div>
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
            {isLoading ? "Criando conta..." : "Cadastrar"}
          </button>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </form>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-infinity-red hover:underline">
            Faça o login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
