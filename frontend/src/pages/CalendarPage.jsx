import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

function CalendarPage() {
    // Estado para armazenar os eventos (tarefas) do calendário
    const [events, setEvents] = useState([
        // Eventos de exemplo
        { title: 'Reunião de Planejamento', date: '2025-07-25' },
        { title: 'Entrega do Projeto X', date: '2025-07-28', color: '#E84A3F' } // Usando nossa cor!
    ]);

    // Esta função é chamada quando o usuário clica em uma data ou seleciona um período
    const handleDateSelect = (selectInfo) => {
        let title = prompt('Por favor, digite o nome da nova tarefa:');
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // Limpa a seleção da data

        if (title) {
            const newEvent = {
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            };
            // Adiciona o novo evento ao nosso estado de eventos
            setEvents(currentEvents => [...currentEvents, newEvent]);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-infinity-text mb-6">Meu Calendário</h1>
            <div className="p-4 bg-infinity-gray rounded-lg">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth'
                    }}
                    events={events}
                    selectable={true}      // Permite que o usuário selecione datas
                    select={handleDateSelect} // Função que é chamada ao selecionar
                    height="auto" // Ajusta a altura automaticamente
                // Em breve, vamos customizar o estilo para combinar com o tema...
                />
            </div>
        </div>
    );
}

export default CalendarPage;