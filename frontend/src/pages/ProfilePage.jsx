import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiMail, FiEdit } from 'react-icons/fi';
import EditProfileModal from '../components/EditProfileModal'; // 1. Importe o novo modal

function ProfilePage() {
    const { user, token, login } = useAuth(); // Pegamos o token e a função login
    const [isModalOpen, setIsModalOpen] = useState(false); // 2. Estado para controlar o modal

    // 3. Função para salvar as alterações
    const handleUpdateProfile = async (updatedData) => {
        try {
            const response = await fetch('http://localhost:5000/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Envia o token para autenticação
                },
                body: JSON.stringify(updatedData)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Falha ao atualizar.');
            }

            // TRUQUE: Usamos a função login() para atualizar o usuário globalmente!
            // Ela já atualiza o estado e o localStorage com os novos dados.
            login(data.user, token);
            setIsModalOpen(false); // Fecha o modal
            alert('Perfil atualizado com sucesso!');

        } catch (error) {
            alert('Erro: ' + error.message);
        }
    };

    if (!user) {
        return <div>Carregando perfil...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-infinity-text mb-8">Meu Perfil</h1>

            <div className="bg-white dark:bg-infinity-gray p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                    <img src={user.photoUrl} alt={`Foto de ${user.name}`} className="w-32 h-32 rounded-full border-4 border-infinity-red" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-infinity-text">{user.name}</h2>
                    <p className="text-infinity-red font-semibold text-lg">{user.role}</p>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 italic">"{user.bio}"</p>
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-4 text-gray-600 dark:text-gray-300">
                        <FiMail />
                        <span>{user.email}</span>
                    </div>
                </div>
                <div>
                    {/* 4. Botão agora abre o modal */}
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 py-2 px-4 rounded-md text-gray-700 dark:text-infinity-text bg-gray-200 dark:bg-infinity-gray-light hover:bg-gray-300 dark:hover:bg-infinity-red transition-colors">
                        <FiEdit />
                        Editar Perfil
                    </button>
                </div>
            </div>

            {/* 5. Renderiza o modal */}
            <EditProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleUpdateProfile}
                user={user}
            />
        </div>
    );
}

export default ProfilePage;