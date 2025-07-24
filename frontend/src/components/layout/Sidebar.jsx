// src/components/layout/Sidebar.jsx

import { NavLink } from 'react-router-dom';
import { FiHome, FiUser, FiCalendar, FiLogOut } from 'react-icons/fi';
import ThemeToggleButton from '../ThemeToggleButton';
import { useAuth } from '../../contexts/AuthContext'; // 1. Importe o useAuth

function Sidebar() {
    const { logout, user } = useAuth(); // 2. Pegue a função logout e os dados do usuário

    const activeLinkStyle = {
        backgroundColor: '#E84A3F',
        color: 'white',
    };

    return (
        <aside className="w-64 flex-shrink-0 bg-infinity-gray text-infinity-text p-6 flex flex-col justify-between">
            <div>
                <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold text-infinity-red">
                        Organiza<span className="font-light">Infinity</span>
                    </h1>
                    {/* Mostra o nome do usuário logado! */}
                    {user && <p className="text-sm text-gray-400 mt-1">Bem-vindo, {user.name}!</p>}
                </div>

                <nav className="flex flex-col gap-3">
                    {/* ...código dos NavLinks... */}
                    <NavLink
                        to="/"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-infinity-gray-light transition-colors"
                        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                    >
                        <FiHome size={20} />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/calendario"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-infinity-gray-light transition-colors"
                        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                    >
                        <FiCalendar size={20} />
                        Calendário
                    </NavLink>

                    <NavLink
                        to="/perfil"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-infinity-gray-light transition-colors"
                        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                    >
                        <FiUser size={20} />
                        Meu Perfil
                    </NavLink>
                </nav>
            </div>

            <div className="flex flex-col gap-4 border-t border-infinity-gray-light pt-4">
                <ThemeToggleButton />
                <button
                    onClick={logout} // 3. Adicione o onClick aqui
                    className="flex items-center w-full text-left gap-4 p-3 rounded-lg text-infinity-red hover:bg-infinity-red/20 transition-colors"
                >
                    <FiLogOut size={20} />
                    Sair
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;