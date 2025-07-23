import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const texto = await resposta.text();

      if (resposta.ok) {
        console.log("Resposta do servidor:", texto);
        alert("Login realizado com sucesso!");
        navigate("/dashboard");
      } else {
        console.log("Resposta do servidor:", texto);
        alert("Erro: " + texto);
      }
    } catch (error) {
      alert("Erro na conexão: " + error.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Página de Login</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-4">Login</h2>

          {/* Os inputs são "componentes controlados", pois seu valor é gerenciado pelo estado do React. */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            required
            disabled={isLoading} // Desabilita o input durante o loading.
          />
          {/* ... inputs de email e senha com disabled={isLoading} também ... */}

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            required
            disabled={isLoading} // Desabilita o input durante o loading.
          />
          {/* ... inputs de email e senha com disabled={isLoading} também ... */}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={isLoading} // O botão é desabilitado se isLoading for true.
          >
            {/* Texto do botão muda para indicar o carregamento. */}
            {isLoading ? "Entrando..." : "Entrar"}
          </button>

          {/* Exibe a mensagem de erro na tela, se houver. */}
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
