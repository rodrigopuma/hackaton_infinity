import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

        try {
            const resposta = await fetch('http://localhost:5000/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

            const texto = await resposta.text();

            if (resposta.ok) {
                alert('Login realizado com sucesso!');
                navigate('/dashboard');
            } else {
                alert('Erro: ' + texto);
            }
        } catch (error) {
            alert('Erro na conexão: ' + error.message);
        }
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Página de Login</h1>
                <p className="mt-4">Em construção...</p>
            </div>
        </div>
    );
}

export default LoginPage;