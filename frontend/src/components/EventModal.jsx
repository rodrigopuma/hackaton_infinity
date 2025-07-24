import { useState } from 'react';

// O Modal recebe 3 props:
// isOpen: um booleano que diz se ele está visível ou não.
// onClose: uma função para fechá-lo.
// onSave: uma função para salvar o novo evento.
function EventModal({ isOpen, onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Reuniões'); // Categoria padrão

    // Se não estiver aberto, não renderiza nada.
    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            alert('Por favor, digite um título para a tarefa.');
            return;
        }
        onSave({ title, category });
        onClose(); // Fecha o modal após salvar
        setTitle(''); // Limpa o formulário para a próxima vez
        setCategory('Reuniões');
    };

    return (
        // Fundo semi-transparente que cobre a tela inteira (o "backdrop")
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* O conteúdo do modal */}
            <div className="bg-infinity-gray p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold text-infinity-text mb-4">Adicionar Nova Tarefa</h2>

                <form onSubmit={handleSubmit}>
                    {/* Campo de Título */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">Título da Tarefa</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 bg-infinity-dark border border-infinity-gray-light rounded-md text-infinity-text"
                            autoFocus // Foca no input assim que o modal abre
                        />
                    </div>

                    {/* Campo de Categoria */}
                    <div className="mb-6">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">Categoria</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 bg-infinity-dark border border-infinity-gray-light rounded-md text-infinity-text"
                        >
                            <option value="Reuniões">Reuniões</option>
                            <option value="Entregas">Entregas</option>
                            <option value="Eventos">Eventos</option>
                            <option value="Pessoal">Pessoal</option>
                        </select>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded-md text-gray-400 hover:bg-infinity-gray-light">
                            Cancelar
                        </button>
                        <button type="submit" className="py-2 px-4 rounded-md bg-infinity-red text-white hover:brightness-110">
                            Salvar Tarefa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EventModal;