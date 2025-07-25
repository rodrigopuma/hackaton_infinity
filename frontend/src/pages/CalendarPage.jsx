import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from '../components/EventModal';

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

    const handleSaveEvent = ({ title, category }) => {
        if (selectedDateInfo) {
            const calendarApi = selectedDateInfo.view.calendar;
            calendarApi.unselect();

            const newEvent = {
                title,
                start: selectedDateInfo.startStr,
                end: selectedDateInfo.endStr,
                allDay: selectedDateInfo.allDay,
                color: CATEGORY_COLORS[category] || '#3174ad'
            };
            setEvents(currentEvents => [...currentEvents, newEvent]);
        }
    };

    return (
        <div>
            {/* Título da página com cores de tema */}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-infinity-text mb-6">Meu Calendário</h1>

            {/* Container do calendário com cores de tema */}
            <div className="p-4 bg-white dark:bg-infinity-gray rounded-lg shadow-lg text-gray-800 dark:text-infinity-text">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale='pt-br'
                    buttonText={{ today: 'Hoje' }}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth'
                    }}
                    events={events}
                    selectable={true}
                    select={handleDateSelect}
                    height="75vh"
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