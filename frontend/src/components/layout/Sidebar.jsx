import { NavLink } from 'react-router-dom';
import { FiHome, FiUser, FiCalendar, FiLogOut, FiGrid } from 'react-icons/fi';
import ThemeToggleButton from '../ThemeToggleButton';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png'; // caminho da logo

function Sidebar() {
    const { logout, user } = useAuth();

    const activeLinkStyle = {
        backgroundColor: '#E84A3F',
        color: 'white',
    };

    return (
        // MUDANÇA 1: Adicionamos 'hidden md:flex' para a responsividade
        <aside className="w-64 flex-shrink-0 bg-white dark:bg-infinity-gray text-gray-700 dark:text-infinity-text p-6 flex-col justify-between hidden md:flex">
            <div>
                {/* MUDANÇA 2: Substituímos o <h1> antigo por esta div com a imagem do logo e o texto */}
                <div className="flex items-center justify-center gap-2 mb-10">
                    <img src={logo} alt="Infinity School Logo" className="w-8 h-8" />
                    <h1 className="text-xl font-bold text-infinity-red">
                        Organiza<span className="font-light text-gray-600 dark:text-infinity-text">Infinity</span>
                    </h1>
                </div>

                {user && <p className="text-sm text-center text-gray-500 dark:text-gray-400 -mt-6 mb-8">Bem-vindo, {user.name.split(' ')[0]}!</p>}

                <nav className="flex flex-col gap-3">
                    <NavLink
                        to="/"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-infinity-gray-light transition-colors"
                        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                    >
                        <FiHome size={20} />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/calendario"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-infinity-gray-light transition-colors"
                        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                    >
                        <FiCalendar size={20} />
                        Calendário

                    </NavLink>

                    <NavLink
                        to="/planilhas"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-infinity-gray-light transition-colors"
                        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                    >
                        <FiGrid size={20} />
                        Planilhas
                    </NavLink>

                    <NavLink
                        to="/perfil"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-infinity-gray-light transition-colors"
                        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                    >
                        <FiUser size={20} />
                        Meu Perfil
                    </NavLink>
                </nav>
            </div>

            <div className="flex flex-col gap-4 border-t border-gray-200 dark:border-infinity-gray-light pt-4">
                <ThemeToggleButton />
                <button
                    onClick={logout}
                    className="flex items-center w-full text-left gap-4 p-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-infinity-red/20 transition-colors"
                >
                    <FiLogOut size={20} />
                    Sair
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;