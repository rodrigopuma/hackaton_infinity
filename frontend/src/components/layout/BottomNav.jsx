// src/components/layout/BottomNav.jsx

import { NavLink } from 'react-router-dom';
import { FiHome, FiCalendar, FiUser, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext'; // Importamos o hook do tema

function BottomNav() {
    const { theme, toggleTheme } = useTheme(); // Pegamos o tema e a função de toggle

    // Estilo aprimorado para o link ativo: a cor da marca!
    const activeStyle = {
        color: '#E84A3F' // infinity-red
    };

    return (
        // md:hidden esconde este menu em telas maiores
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-infinity-gray border-t border-gray-200 dark:border-infinity-gray-light p-2 flex justify-around items-center">

            {/* Links de navegação com cor de texto ajustada para melhor legibilidade */}
            <NavLink
                to="/"
                className="flex flex-col items-center text-gray-600 dark:text-gray-400"
                style={({ isActive }) => isActive ? activeStyle : undefined}
            >
                <FiHome size={22} />
                <span className="text-xs mt-1">Dashboard</span>
            </NavLink>

            <NavLink
                to="/calendario"
                className="flex flex-col items-center text-gray-600 dark:text-gray-400"
                style={({ isActive }) => isActive ? activeStyle : undefined}
            >
                <FiCalendar size={22} />
                <span className="text-xs mt-1">Calendário</span>
            </NavLink>

            <NavLink
                to="/perfil"
                className="flex flex-col items-center text-gray-600 dark:text-gray-400"
                style={({ isActive }) => isActive ? activeStyle : undefined}
            >
                <FiUser size={22} />
                <span className="text-xs mt-1">Perfil</span>
            </NavLink>

            {/* Botão para trocar o tema, com a mesma estrutura dos outros itens */}
            <button
                onClick={toggleTheme}
                className="flex flex-col items-center text-gray-600 dark:text-gray-400"
            >
                {theme === 'light' ? <FiMoon size={22} /> : <FiSun size={22} />}
                <span className="text-xs mt-1">Tema</span>
            </button>

        </nav>
    );
}

export default BottomNav;