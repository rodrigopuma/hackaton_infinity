import { useState, useEffect } from 'react';

// O Modal recebe o usuário atual para preencher os campos
function EditProfileModal({ isOpen, onClose, onSave, user }) {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    // Preenche o formulário com os dados atuais do usuário quando o modal abre
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setBio(user.bio || '');
        }
    }, [user, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, bio });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-infinity-gray p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold text-infinity-text mb-4">Editar Perfil</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Nome</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 bg-infinity-dark border border-infinity-gray-light rounded-md text-infinity-text"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                        <textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full p-2 h-24 bg-infinity-dark border border-infinity-gray-light rounded-md text-infinity-text resize-none"
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded-md text-gray-400 hover:bg-infinity-gray-light">
                            Cancelar
                        </button>
                        <button type="submit" className="py-2 px-4 rounded-md bg-infinity-red text-white hover:brightness-110">
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfileModal;