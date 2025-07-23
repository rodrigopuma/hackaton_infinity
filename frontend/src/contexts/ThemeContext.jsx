// src/contexts/ThemeContext.jsx

import { createContext, useState, useEffect, useContext } from 'react';

// 1. Cria o Contexto para ser o "canal" de comunicação do nosso tema.
const ThemeContext = createContext();

// 2. Cria o Componente Provedor, que vai fornecer o estado (tema) e as ações (função de toggle)
// para todos os componentes filhos que estiverem dentro dele.
export function ThemeProvider({ children }) {
    // 3. Estado que armazena o tema atual ('light' ou 'dark').
    // A função no useState é para inicializar o tema com o valor do localStorage, se existir.
    // Isso faz com que a escolha do usuário seja lembrada entre as sessões.
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    // 4. useEffect para realizar "efeitos colaterais", ou seja, ações que interagem
    // com o mundo fora do React, como manipular o DOM diretamente.
    useEffect(() => {
        const root = window.document.documentElement; // Acessa a tag <html>

        // Adiciona ou remove a classe 'dark' do HTML, que o Tailwind usa para aplicar os estilos do modo escuro.
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Salva a preferência de tema do usuário no armazenamento local do navegador.
        localStorage.setItem('theme', theme);
    }, [theme]); // Este efeito roda toda vez que a variável 'theme' muda.

    // 5. Função que alterna o tema entre 'light' e 'dark'.
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light')); // CORRIGIDO: usa a string 'light'
    };

    // 6. Objeto que será compartilhado via contexto.
    const value = {
        theme,
        toggleTheme, // CORRIGIDO: nome da função consistente
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// 7. Hook customizado para facilitar o uso do contexto.
// Em vez de importar `useContext` e `ThemeContext` em todo componente,
// importamos apenas `useTheme()` para ter acesso ao tema e à função de toggle.
export function useTheme() {
    return useContext(ThemeContext); // CORRIGIDO: usa o hook correto
}