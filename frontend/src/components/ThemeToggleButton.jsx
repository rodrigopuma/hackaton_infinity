import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext'; // Importa nosso hook customizado

// Este é um componente "presentacional", focado apenas em exibir a UI do botão.
function ThemeToggleButton() {
    // A lógica fica no contexto, aqui a gente só consome os dados.
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme} // CORRIGIDO: Atributo de evento em camelCase.
            className="p-2 rounded-full bg-infinity-gray-light hover:bg-opacity-75"
            aria-label="Toggle theme" // CORRIGIDO: Atributo de acessibilidade.
        >
            {/* Renderização condicional: mostra um ícone diferente baseado no tema ativo. */}
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>
    );
}

export default ThemeToggleButton;