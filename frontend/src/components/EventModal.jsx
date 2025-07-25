// src/components/EventModal.jsx

import { useState, useEffect } from 'react';

function EventModal({ isOpen, onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Reuniões');
    const [time, setTime] = useState('09:00'); // 1. Adicione estado para a hora
    const [wantsReminder, setWantsReminder] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setCategory('Reuniões');
            setWantsReminder(false);
            setTime('09:00'); // Limpa a hora também
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            alert('Por favor, digite um título para a tarefa.');
            return;
        }
        // 2. Passe a 'hora' para a função onSave
        onSave({ title, category, wantsReminder, time });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-infinity-gray p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold text-infinity-text mb-4">Adicionar Nova Tarefa</h2>
                <form onSubmit={handleSubmit}>
                    {/* ... Campo de Título ... */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">Título da Tarefa</label>
                        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 bg-infinity-dark border border-infinity-gray-light rounded-md text-infinity-text" autoFocus />
                    </div>

                    <div className="flex gap-4 mb-4">
                        {/* Campo de Categoria */}
                        <div className="flex-1">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">Categoria</label>
                            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 bg-infinity-dark border border-infinity-gray-light rounded-md text-infinity-text">
                                <option>Reuniões</option>
                                <option>Entregas</option>
                                <option>Eventos</option>
                                <option>Pessoal</option>
                            </select>
                        </div>

                        {/* 3. Adicione o campo de HORA aqui */}
                        <div className="flex-1">
                            <label htmlFor="time" className="block text-sm font-medium text-gray-400 mb-1">Hora</label>
                            <input
                                id="time"
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full p-2 bg-infinity-dark border border-infinity-gray-light rounded-md text-infinity-text"
                            />
                        </div>
                    </div>

                    {/* ... Checkbox de Lembrete ... */}
                    <div className="mb-6">
                        <label className="flex items-center gap-3 text-gray-400 cursor-pointer">
                            <input type="checkbox" checked={wantsReminder} onChange={(e) => setWantsReminder(e.target.checked)} className="w-4 h-4 rounded bg-infinity-dark border-infinity-gray-light text-infinity-red focus:ring-infinity-red" />
                            Lembrar-me com uma notificação
                        </label>
                    </div>

                    {/* ... Botões de Ação ... */}
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded-md text-gray-400 hover:bg-infinity-gray-light">Cancelar</button>
                        <button type="submit" className="py-2 px-4 rounded-md bg-infinity-red text-white hover:brightness-110">Salvar Tarefa</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EventModal;