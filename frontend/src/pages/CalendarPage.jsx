// src/pages/CalendarPage.jsx

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from '../components/EventModal'; // 1. Importe o Modal

function CalendarPage() {
    const [events, setEvents] = useState([
        { title: 'Reunião de Planejamento', date: '2025-07-25', color: '#3174ad' },
        { title: 'Entrega do Projeto X', date: '2025-07-28', color: '#E84A3F' }
    ]);

    // 2. Estados para controlar o modal e a data selecionada
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDateInfo, setSelectedDateInfo] = useState(null);

    // 3. Modifica o handleDateSelect para ABRIR o modal
    const handleDateSelect = (selectInfo) => {
        setIsModalOpen(true);
        setSelectedDateInfo(selectInfo);
    };

    // 4. Cria a função para SALVAR o evento vindo do modal
    const handleSaveEvent = ({ title, category }) => {
        if (selectedDateInfo) {
            const calendarApi = selectedDateInfo.view.calendar;
            calendarApi.unselect(); // Limpa a seleção da data

            const newEvent = {
                title,
                start: selectedDateInfo.startStr,
                end: selectedDateInfo.endStr,
                allDay: selectedDateInfo.allDay,
                // Lógica de cores (exemplo simples)
                color: category === 'Entregas' ? '#E84A3F' : category === 'Eventos' ? '#f0ad4e' : '#3174ad'
            };
            setEvents(currentEvents => [...currentEvents, newEvent]);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-infinity-text mb-6">Meu Calendário</h1>
            <div className="p-4 bg-infinity-gray rounded-lg text-infinity-text">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
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

            {/* 5. Renderiza o Modal, passando os estados e funções como props */}
            <EventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEvent}
            />
        </div>
    );
}

export default CalendarPage;