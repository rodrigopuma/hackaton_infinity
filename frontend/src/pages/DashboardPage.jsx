// src/pages/DashboardPage.jsx

import { FiGrid, FiLink, FiCheckSquare, FiSmartphone } from "react-icons/fi";
import { Link } from 'react-router-dom'; // 1. Importe o <Link> para navegação interna
import QuickNotes from "../components/QuickNotes";
import { useAuth } from "../contexts/AuthContext";

function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-infinity-text">
            Bem-vindo, {user ? user.name.split(" ")[0] : 'Usuário'}!
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Aqui está um resumo da sua produtividade.
          </p>
        </div>
      </div>

      {/* Usamos grid-cols-2 no mobile e 4 no desktop para acomodar os 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Card 1: Planilhas (Link Externo) */}
        <Link to="/planilhas">
          <div className="bg-white dark:bg-infinity-gray p-6 rounded-lg shadow-lg h-full hover:shadow-xl dark:hover:bg-infinity-gray-light transition-all cursor-pointer">
            <FiGrid size={30} className="text-infinity-red" />
            <h2 className="mt-4 font-bold text-xl text-gray-800 dark:text-infinity-text">
              Planilhas
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Acesse o planejamento e outros docs.
            </p>
          </div>
        </Link>

        {/* Card 2: Portal do Aluno (Link Externo) */}
        <a href="https://infinityschool.eadplataforma.app/" target="_blank" rel="noopener noreferrer">
          <div className="bg-white dark:bg-infinity-gray p-6 rounded-lg shadow-lg h-full hover:shadow-xl dark:hover:bg-infinity-gray-light transition-all cursor-pointer">
            <FiLink size={30} className="text-infinity-red" />
            <h2 className="mt-4 font-bold text-xl text-gray-800 dark:text-infinity-text">
              Portal do Aluno
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Link rápido para o portal EAD.</p>
          </div>
        </a>

        {/* Card 3: Infinity App (Link Externo) */}
        <a href="https://www.infinityschool.app/" target="_blank" rel="noopener noreferrer">
          <div className="bg-white dark:bg-infinity-gray p-6 rounded-lg shadow-lg h-full hover:shadow-xl dark:hover:bg-infinity-gray-light transition-all cursor-pointer">
            <FiSmartphone size={30} className="text-infinity-red" />
            <h2 className="mt-4 font-bold text-xl text-gray-800 dark:text-infinity-text">
              Infinity App
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Acesse o app principal da escola.</p>
          </div>
        </a>

        {/* Card 4: Minhas Tarefas (Link INTERNO para o Calendário) */}
        <Link to="/calendario">
          <div className="bg-white dark:bg-infinity-gray p-6 rounded-lg shadow-lg h-full hover:shadow-xl dark:hover:bg-infinity-gray-light transition-all cursor-pointer">
            <FiCheckSquare size={30} className="text-infinity-red" />
            <h2 className="mt-4 font-bold text-xl text-gray-800 dark:text-infinity-text">
              Minhas Tarefas
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Veja seu calendário e checklists.
            </p>
          </div>
        </Link>

      </div>

      <QuickNotes />
    </>
  );
}

export default DashboardPage;