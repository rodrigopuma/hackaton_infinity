// src/pages/DashboardPage.jsx

import { FiGrid, FiLink, FiCheckSquare } from "react-icons/fi";
import QuickNotes from "../components/QuickNotes"; // 1. Importe o componente
import { useAuth } from "../contexts/AuthContext"; // Importe para pegar o nome do usuário
import { useState } from "react";

function DashboardPage() {
  const { user } = useAuth();
  const [name, setName] = useState("");

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-infinity-text">
            {/* Usa o nome do usuário do contexto */}
            Bem-vindo, {user.name.split(" ")[0]}!
          </h1>
          <p className="mt-1 text-gray-400">
            Aqui está um resumo da sua produtividade.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ... Seus cards ... */}
        <div className="bg-infinity-gray p-6 rounded-lg shadow-lg hover:bg-infinity-gray-light transition-colors cursor-pointer">
          <FiGrid size={30} className="text-infinity-red" />
          <h2 className="mt-4 font-bold text-xl text-infinity-text">
            Planilhas
          </h2>
          <p className="mt-2 text-gray-400">
            Acesse o planejamento e outros docs.
          </p>
        </div>

        <div className="bg-infinity-gray p-6 rounded-lg shadow-lg hover:bg-infinity-gray-light transition-colors cursor-pointer">
          <FiLink size={30} className="text-infinity-red" />
          <h2 className="mt-4 font-bold text-xl text-infinity-text">
            Portal do Aluno
          </h2>
          <p className="mt-2 text-gray-400">Link rápido para o portal.</p>
        </div>

        <div className="bg-infinity-gray p-6 rounded-lg shadow-lg hover:bg-infinity-gray-light transition-colors cursor-pointer">
          <FiCheckSquare size={30} className="text-infinity-red" />
          <h2 className="mt-4 font-bold text-xl text-infinity-text">
            Minhas Tarefas
          </h2>
          <p className="mt-2 text-gray-400">
            Veja suas checklists e pendências.
          </p>
        </div>
      </div>

      {/* 2. Adicione o componente de anotações aqui */}
      <QuickNotes />
    </>
  );
}

export default DashboardPage;
