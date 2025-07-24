import { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';

function QuickNotes() {
    // Estado para guardar o texto das anotações.
    // Ele já começa carregando o que estiver salvo no localStorage.
    const [notes, setNotes] = useState(() => localStorage.getItem('quickNotes') || '');
    const [status, setStatus] = useState(''); // Estado para mostrar o status "Salvo!"

    // Este useEffect roda toda vez que o estado 'notes' muda.
    // Ele espera um pouco e depois salva o conteúdo no localStorage.
    // Isso se chama "debouncing" e evita salvar a cada letra digitada.
    useEffect(() => {
        // Define um temporizador para salvar as notas
        const handler = setTimeout(() => {
            localStorage.setItem('quickNotes', notes);
            if (notes) { // Só mostra "Salvo!" se houver texto
                setStatus('Salvo!');
                // Faz a mensagem "Salvo!" desaparecer depois de 2 segundos
                setTimeout(() => setStatus(''), 2000);
            }
        }, 1000); // Salva 1 segundo depois que o usuário para de digitar

        // Função de limpeza: se o componente for desmontado, o temporizador é cancelado.
        return () => {
            clearTimeout(handler);
        };
    }, [notes]);

    return (
        <div className="bg-infinity-gray p-6 rounded-lg shadow-lg mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-infinity-text">Anotações Rápidas</h2>
                {/* Mostra o status de salvamento */}
                {status && <span className="text-sm text-green-400 flex items-center gap-2"><FiSave /> {status}</span>}
            </div>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Digite suas anotações aqui... Elas serão salvas automaticamente."
                className="w-full h-48 p-3 bg-infinity-dark border border-infinity-gray-light rounded-md text-infinity-text focus:outline-none focus:ring-2 focus:ring-infinity-red resize-none"
            />
        </div>
    );
}

export default QuickNotes;