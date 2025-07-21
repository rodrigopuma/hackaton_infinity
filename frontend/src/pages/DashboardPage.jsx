import { FiGrid, FiLink, FiCheckSquare, FiCalendar } from 'react-icons/fi';

function DashboardPage() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-infinity-blue dark:text-sky-400">
                Organiza Infinity
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                Sua central de produtividade.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Exemplo de Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <FiGrid className="text-3xl text-infinity-blue dark:text-sky-400" />
                    <h2 className="mt-4 font-bold text-xl">Planilhas</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Acesse o planejamento e outros docs.</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <FiLink className="text-3xl text-infinity-blue dark:text-sky-400" />
                    <h2 className="mt-4 font-bold text-xl">Portal do Aluno</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Link rápido para o portal.</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <FiCheckSquare className="text-3xl text-infinity-blue dark:text-sky-400" />
                    <h2 className="mt-4 font-bold text-xl">Minhas Tarefas</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Veja suas checklists e pendências.</p>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;