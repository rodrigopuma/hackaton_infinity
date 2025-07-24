import { useAuth } from '../contexts/AuthContext';
import { FiMail, FiBriefcase, FiEdit } from 'react-icons/fi';

function ProfilePage() {
    // Pega os dados do usuário do nosso contexto de autenticação
    const { user } = useAuth();

    // Se por algum motivo os dados do usuário ainda não carregaram, mostramos um loading.
    if (!user) {
        return <div>Carregando perfil...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-infinity-text mb-8">Meu Perfil</h1>

            <div className="bg-infinity-gray p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-8">
                {/* Foto do Usuário */}
                <div className="flex-shrink-0">
                    <img
                        src={user.photoUrl}
                        alt={`Foto de perfil de ${user.name}`}
                        className="w-32 h-32 rounded-full border-4 border-infinity-red"
                    />
                </div>

                {/* Informações do Usuário */}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-infinity-text">{user.name}</h2>
                    <p className="text-infinity-red font-semibold text-lg">{user.role}</p>
                    <p className="text-gray-400 mt-2 italic">"{user.bio}"</p>

                    <div className="flex items-center justify-center md:justify-start gap-4 mt-4 text-gray-300">
                        <FiMail />
                        <span>{user.email}</span>
                    </div>
                </div>

                {/* Botão de Ação */}
                <div>
                    <button className="flex items-center gap-2 py-2 px-4 rounded-md bg-infinity-gray-light hover:bg-infinity-red transition-colors">
                        <FiEdit />
                        Editar Perfil
                    </button>
                </div>
            </div>

            {/* Aqui poderiam entrar outras seções, como "Minhas Conquistas", "Cursos", etc. */}
        </div>
    );
}

export default ProfilePage;