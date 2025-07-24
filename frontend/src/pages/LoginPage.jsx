import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const resposta = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const json = await resposta.json();

      if (resposta.ok) {
        console.log("Resposta do servidor:", json);
        alert("Login realizado com sucesso!");
        navigate("/dashboard");

        const userData = json.user;
        const userToken = "abcdef123456"; // Token de exemplo

        // CHAME A FUNÇÃO login() DO CONTEXTO AQUI
        // Ela já cuida de salvar o estado, o localStorage e o redirecionamento.
        login(userData, userToken);
      } else {
        console.log("Resposta do servidor:", json);
        alert("Erro: " + json);
      }
    } catch (err) {
      setError("Falha na conexão ou na API.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-infinity-red mb-6 text-center">
          Organiza
          <span className="font-light text-infinity-text">Infinity</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-infinity-gray p-8 rounded-lg shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-infinity-text">
            Acessar Plataforma
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-infinity-dark border border-infinity-gray-light rounded-md text-infinity-text focus:outline-none focus:ring-2 focus:ring-infinity-red"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-3 bg-infinity-dark border border-infinity-gray-light rounded-md text-infinity-text focus:outline-none focus:ring-2 focus:ring-infinity-red"
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

          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        </form>

        <p className="text-center text-gray-400 mt-6">
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
