import { Button, Modal } from "rsuite"
import cls from './EventTicketUsers.module.less';
import { FC, useState } from "react";
import { EventFormTicketUsersProps } from "../../model/EventForm.type";


const EventTicketUsers: FC<EventFormTicketUsersProps> = (props) => {
    const { isOpen, onClose, ticketUsers } = props;

    return (
        <Modal
        backdrop="static"
        open={isOpen}
        onClose={onClose}
        size="lg"
        >
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
            <Button
                onClick={onClose}
            >
                Закрыть
            </Button>
        </Modal>
    );
}

export default EventTicketUsers;