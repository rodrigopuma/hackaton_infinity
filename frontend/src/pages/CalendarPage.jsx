import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from '../components/EventModal';
// 1. Importe as funções do nosso gerenciador de notificações
import { requestNotificationPermission, scheduleNotification } from '../utils/notificationManager';


const CATEGORY_COLORS = {
    'Reuniões': '#3174ad',
    'Entregas': '#E84A3F',
    'Eventos': '#f0ad4e',
    'Pessoal': '#5cb85c'
};

const initialEvents = [
    { title: 'Reunião de Planejamento', date: '2025-07-25', color: CATEGORY_COLORS['Reuniões'] },
    { title: 'Entrega do Hackathon', date: '2025-07-27', color: CATEGORY_COLORS['Entregas'] }
];

function CalendarPage() {
    const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem('calendarEvents');
        return savedEvents ? JSON.parse(savedEvents) : initialEvents;
    });

    useEffect(() => {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    }, [events]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDateInfo, setSelectedDateInfo] = useState(null);

    const handleDateSelect = (selectInfo) => {
        setIsModalOpen(true);
        setSelectedDateInfo(selectInfo);
    };

    // 2. Modifique a função para receber o 'wantsReminder' e se tornar 'async'
    const handleSaveEvent = async ({ title, category, wantsReminder, time }) => {
        if (selectedDateInfo) {
            const calendarApi = selectedDateInfo.view.calendar;
            calendarApi.unselect();

            const startDateTime = `${selectedDateInfo.startStr}T${time}`;

            const newEvent = {
                title,
                start: startDateTime, // Usa a nova data com hora
                allDay: false, // Define que o evento NÃO é de dia inteiro
                color: CATEGORY_COLORS[category] || '#3174ad'
            };
            setEvents(currentEvents => [...currentEvents, newEvent]);

            // 3. Adicione a lógica para agendar a notificação
            if (wantsReminder) {
                const hasPermission = await requestNotificationPermission();
                if (hasPermission) {
                    scheduleNotification(
                        `Lembrete: ${title}`,
                        `Sua tarefa "${title}" está começando agora!`,
                        startDateTime // Passa a data com a hora para a notificação
                    );
                } else {
                    alert("Você precisa permitir as notificações no seu navegador para ser lembrado!");
                }
            }
        }
    };

    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-infinity-text mb-6">Meu Calendário</h1>

            {/* Adicionamos padding responsivo aqui */}
            <div className="p-2 md:p-4 bg-white dark:bg-infinity-gray rounded-lg shadow-lg text-gray-800 dark:text-infinity-red">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale='pt-br'
                    buttonText={{ today: 'Hoje' }}

                    // MUDANÇA PRINCIPAL: Cabeçalho mais simples
                    headerToolbar={{
                        left: 'prev',
                        center: 'title',
                        right: 'next'
                    }}
                    // O FullCalendar já tem uma boa responsividade interna,
                    // mas simplificar o header ajuda muito no mobile.

                    events={events}
                    selectable={true}
                    select={handleDateSelect}
                    height="auto" // 'auto' ajuda na adaptação a diferentes alturas de tela
                />
            </div>

            <EventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEvent}
            />
        </div>
    );
}

export default CalendarPage;