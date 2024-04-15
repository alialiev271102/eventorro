import { Button, Modal } from "rsuite"; // импорт компонентов модального окна и кнопки из библиотеки RSuite
import { FC, useState } from "react"; // импорт React хука useState для работы с состоянием
import { EventFormTicketUsersProps } from "../../model/EventForm.type"; // импорт типов для свойств компонента
import ExcelJS from 'exceljs'; // импорт библиотеки для работы с Excel

// Определение типа для свойств компонента
const EventTicketUsers: FC<EventFormTicketUsersProps> = (props) => {
    const { isOpen, onClose, ticketUsers } = props; // извлечение свойств из props

    // Функция для создания и экспорта Excel файла
    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Ticket Users');
    
        worksheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Last Name', key: 'lastName', width: 20 },
            { header: 'Count', key: 'count', width: 10 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Email', key: 'email', width: 30 }
        ];
    
        ticketUsers.forEach(user => {
            worksheet.addRow({
                name: user.name,
                lastName: user.lastName,
                count: user.count,
                phone: user.phone,
                email: user.email
            });
        });
    
        const buffer: any = await workbook.xlsx.writeBuffer();    
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ticket_users.xlsx';
        a.click();
        URL.revokeObjectURL(url);
    };
    

    // Возвращаем JSX компонента Modal
    return (
        <Modal
            backdrop="static" // статичный фон (закрытие модального окна только по кнопке)
            open={isOpen} // состояние открытия модального окна
            onClose={onClose} // функция закрытия модального окна
            size="lg" // размер модального окна (large)
        >
            {/* Отображение данных о пользователях */}
            {
                ticketUsers.map(user => {
                    let ticketWord = user.count === 1 ? "билет" : (user.count >= 2 && user.count <= 4) ? "билета" : "билетов";

                    return (
                        <p>
                            {user.name} {user.lastName} забронировал {user.count} {ticketWord} <br/>Контакты: {user.phone} {user.email}
                        </p>
                    )
                })
            }
            {/* Кнопка "Экспорт в Excel", вызывающая функцию exportToExcel */}
            <Button onClick={exportToExcel}>Экспорт в Excel</Button>
            {/* Кнопка "Закрыть", вызывающая функцию onClose */}
            <Button onClick={onClose}>Закрыть</Button>
        </Modal>
    );
}

export default EventTicketUsers; // экспорт компонента EventTicketUsers
