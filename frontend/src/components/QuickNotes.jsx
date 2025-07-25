import { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';

function QuickNotes() {
    const [notes, setNotes] = useState(() => localStorage.getItem('quickNotes') || '');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            localStorage.setItem('quickNotes', notes);
            if (notes) {
                setStatus('Salvo!');
                setTimeout(() => setStatus(''), 2000);
            }
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [notes]);

    return (
        // MUDANÇA: Container branco no modo claro
        <div className="bg-white dark:bg-infinity-gray p-6 rounded-lg shadow-lg mt-8">
            <div className="flex justify-between items-center mb-4">
                {/* MUDANÇA: Texto escuro no modo claro */}
                <h2 className="text-xl font-bold text-gray-800 dark:text-infinity-text">Anotações Rápidas</h2>
                {status && <span className="text-sm text-green-500 dark:text-green-400 flex items-center gap-2"><FiSave /> {status}</span>}
            </div>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Digite suas anotações aqui... Elas serão salvas automaticamente."
                // MUDANÇA: Estilo do textarea para o modo claro
                className="w-full h-48 p-3 bg-gray-100 dark:bg-infinity-dark border border-gray-200 dark:border-infinity-gray-light rounded-md text-gray-800 dark:text-infinity-text focus:outline-none focus:ring-2 focus:ring-infinity-red resize-none"
            />
        </div>
    );
}

export default QuickNotes;