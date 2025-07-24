// src/components/layout/Sidebar.jsx

import { NavLink } from 'react-router-dom';
import { FiHome, FiUser, FiCalendar, FiLogOut } from 'react-icons/fi';
import ThemeToggleButton from '../ThemeToggleButton';

function Sidebar() {

    const activeLinkStyle = {
        backgroundColor: '#E84A3F', // Usando nosso infinity-red.
        color: 'white',
    };

    return (
        // Usando as cores do Tailwind.
        <aside className="w-64 flex-shrink-0 bg-infinity-gray text-infinity-text p-6 flex flex-col justify-between">
            <div>
                <h1 className="text-2xl font-bold text-infinity-red mb-10 text-center">
                    Organiza<span className="font-light">Infinity</span>
                </h1>

                <nav className="flex flex-col gap-3">
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
                <button className="flex items-center w-full text-left gap-4 p-3 rounded-lg text-infinity-red hover:bg-infinity-red/20 transition-colors">
                    <FiLogOut size={20} />
                    Sair
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;