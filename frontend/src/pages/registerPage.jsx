// pages/RegisterPage.jsx (sugestão: renomear para PascalCase e adicionar 'Page')

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// DICA: Mover a URL da API para uma variável de ambiente é uma ótima prática.
// Ex: const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Register() {
    // Estados para controlar os valores dos inputs.
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    // Estados para controlar a UI durante a requisição.
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página.
        setIsLoading(true); // Inicia o carregamento, desabilita o botão.
        setError(null);     // Limpa erros anteriores.

        try {
            const response = await fetch('http://localhost:5000/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha }),
            });

            const data = await response.json(); // É mais comum receber JSON do que texto puro.

            if (!response.ok) {
                // Se a resposta não for 2xx, lançamos um erro para ser pego pelo catch.
                throw new Error(data.message || 'Erro no servidor.');
            }

            alert('Usuário cadastrado com sucesso!');
            navigate('/login');

        } catch (err) {
            // Captura erros de rede (API offline) ou erros lançados por nós (resposta.ok === false).
            console.error("Falha no cadastro:", err);
            setError(err.message); // Guarda a mensagem de erro para exibir na tela.
            alert('Erro ao cadastrar: ' + err.message);

        } finally {
            // O bloco `finally` sempre executa, dando certo ou errado.
            // Perfeito para reativar o botão.
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Cadastro</h2>

                {/* Os inputs são "componentes controlados", pois seu valor é gerenciado pelo estado do React. */}
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    required
                    disabled={isLoading} // Desabilita o input durante o loading.
                />
                {/* ... inputs de email e senha com disabled={isLoading} também ... */}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={isLoading} // O botão é desabilitado se isLoading for true.
                >
                    {/* Texto do botão muda para indicar o carregamento. */}
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                </button>

                {/* Exibe a mensagem de erro na tela, se houver. */}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </form>
        </div>
    );
}

export default Register;