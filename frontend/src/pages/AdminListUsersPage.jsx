import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function AdminListUsersPage() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verifica se o usuário é admin
    if (!user || user.role !== "admin") {
      setError("Acesso negado. Permissão de administrador necessária.");
      return;
    }

    fetch("http://localhost:5000/api/admin/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch(() => setError("Erro ao buscar usuários."));
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Lista de Usuários
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {usuarios.map((u) => (
            <div
              key={u.id}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-700">{u.name}</h2>
              <p className="text-gray-500">{u.email}</p>
              <p className="text-sm text-gray-400 mb-3">
                Função: {u.role || "Não definido"}
              </p>
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                  onClick={() => alert("Editar " + u.email)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
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
