import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function AdminListUsersPage() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Adicionamos um estado de loading
  const [error, setError] = useState(null);

  useEffect(() => {
    // 🛡️ CORREÇÃO DE ROBUSTEZ: Verifica se o 'user' já carregou antes de checar a role
    if (!user) {
      setIsLoading(false); // Para o loading se não houver usuário
      return;
    }

    if (user.role !== "admin") {
      setError("Acesso negado. Permissão de administrador necessária.");
      setIsLoading(false);
      return;
    }

    // A lógica de fetch continua a mesma
    fetch("https://organizainfinity.onrender.com/api/admin/usuarios")
      .then((res) => {
        if (!res.ok) throw new Error("Falha na resposta da rede");
        return res.json();
      })
      .then((data) => setUsuarios(data))
      .catch(() => setError("Erro ao buscar usuários."))
      .finally(() => setIsLoading(false)); // Para o loading no final, dando certo ou errado
  }, [user]);

  // Se estiver carregando, mostra uma mensagem
  if (isLoading) {
    return <p className="text-center mt-8">Carregando usuários...</p>;
  }

  return (
    // ✨ CORREÇÃO DE ESTILO: Removemos o fundo, pois o App.jsx já o fornece
    <div>
      <div className="max-w-4xl mx-auto">
        {/* ✨ CORREÇÃO DE ESTILO: Usando cores do tema */}
        <h1 className="text-3xl font-bold mb-6 text-center text-infinity-text">
          Lista de Usuários
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {!error && usuarios.length === 0 && (
          <p className="text-center text-gray-400">
            Nenhum usuário encontrado.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {usuarios.map((u) => (
            <div
              key={u.id}
              // ✨ CORREÇÃO DE ESTILO: Usando cores do tema
              className="bg-infinity-gray p-4 rounded-xl shadow-md hover:bg-infinity-gray-light transition"
            >
              <h2 className="text-xl font-semibold text-infinity-text">
                {u.name}
              </h2>
              <p className="text-gray-400">{u.email}</p>
              <p className="text-sm text-gray-500 mb-3">
                Função: {u.role || "Não definido"}
              </p>
              <div className="flex gap-2">
                <button
                  // ✨ CORREÇÃO DE ESTILO: Usando cores do tema
                  className="bg-infinity-gray-light hover:brightness-125 text-white px-4 py-1 rounded-md text-sm"
                  onClick={() => alert("Editar " + u.email)}
                >
                  Editar
                </button>
                <button
                  // ✨ CORREÇÃO DE ESTILO: Usando cores do tema
                  className="bg-infinity-red hover:brightness-110 text-white px-4 py-1 rounded-md text-sm"
                  onClick={() => alert("Excluir " + u.email)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminListUsersPage;
