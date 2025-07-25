/**
 * Pede permissão ao usuário para mostrar notificações.
 * @returns {Promise<boolean>} Retorna true se a permissão for concedida, false caso contrário.
 */
export async function requestNotificationPermission() {
    if (!('Notification' in window)) {
        alert('Este navegador não suporta notificações.');
        return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
}

/**
 * Agenda uma notificação para uma data e hora específicas.
 * @param {string} title - O título da notificação.
 * @param {string} body - O corpo da notificação.
 * @param {Date | string} date - A data e hora em que a notificação deve aparecer.
 */
export function scheduleNotification(title, body, date) {
    const notificationTime = new Date(date).getTime();
    const now = new Date().getTime();
    const delay = notificationTime - now;

    // Só agenda se a notificação for no futuro
    if (delay > 0) {
        setTimeout(() => {
            // Cria e exibe a notificação
            new Notification(title, { body });
        }, delay);
        console.log(`Notificação para "${title}" agendada em ${delay / 1000} segundos.`);
    } else {
        console.log(`Não foi possível agendar notificação para "${title}" pois a data já passou.`);
    }
}