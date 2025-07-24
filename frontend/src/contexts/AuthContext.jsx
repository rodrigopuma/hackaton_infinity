import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // Estado para guardar os dados do usuário e o token.
    // Tentamos carregar do localStorage para manter o usuário logado ao recarregar a página.
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    // Usamos o useNavigate para redirecionar o usuário após login/logout
    const navigate = useNavigate();

    // Função de Login: será chamada pela LoginPage após uma resposta bem-sucedida da API.
    const login = (userData, userToken) => {
        // Salva os dados no estado do React
        setUser(userData);
        setToken(userToken);

        // Salva os dados no localStorage para persistir a sessão
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userToken);

        // Redireciona o usuário para o dashboard
        navigate('/');
    };

    // Função de Logout: será chamada pelo botão "Sair" na Sidebar.
    const logout = () => {
        // Limpa os dados do estado do React
        setUser(null);
        setToken(null);

        // Limpa os dados do localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        // Redireciona o usuário para a página de login
        navigate('/login');
    };

    // O valor que será compartilhado com todos os componentes.
    // O !!token transforma a string do token (ou null) em um booleano (true/false).
    const value = {
        isAuthenticated: !!token,
        user,
        token,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}