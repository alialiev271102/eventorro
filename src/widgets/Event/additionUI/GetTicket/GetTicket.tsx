import {Button, Loader, Modal} from "rsuite";
import cls from "@/widgets/Event/additionUI/GetTicket/GetTicket.module.less";
import React, {useCallback, useState} from "react";
import {Typography} from "@/shared/components/Typography";
import {useQueries} from "@/shared/lib/hooks/useMediaQuery";
import {inputStyle260px, inputStyle320px} from "@/features/Authorization/constants/InputStyles";
import {useAuthorization} from "@/shared/lib/hooks/useAuthorization/useAuthorization";
import {useEvent} from "@/shared/lib/hooks/useEvent";
// ticketEventId: number,
// ticketEventReg: boolean,
// ticketEventName: string,

export const GetTicket = () => {
    const [dis, setDis] = useState<boolean>(false);
    const {mediaQueryMaxWidth400px} = useQueries();
    const inputStyles = mediaQueryMaxWidth400px ? inputStyle260px : inputStyle320px;
    const {authorizationSetStates, authorizationStates} = useAuthorization();
    const {eventFunctions} = useEvent()
    const {toggleRegisterToEventWithCount} = eventFunctions;
    const {getTicketModalState, getTicketLoading, count, ticketEventId, ticketEventName, ticketEventReg} = authorizationStates;
    const {setTicketModalState, setTicketEventReg} = authorizationSetStates;
    const onRegisterHandler = useCallback(async (): Promise<void> => {
        setDis(true);
        if (ticketEventReg) {
            await toggleRegisterToEventWithCount(ticketEventId, 0, setTicketEventReg);
        } else {
            await toggleRegisterToEventWithCount(ticketEventId, parseInt(count), setTicketEventReg);
        }
        setDis(false)
        handleClose();
    }, [ticketEventId, toggleRegisterToEventWithCount]);

    const handleClose = useCallback(() => {
        setTicketModalState(false);
    }, [setTicketModalState]);

    const handleOpen = useCallback(() => {
        setTicketModalState(true);
    }, [setTicketModalState]);

    return (
        <Modal
            keyboard
            open={getTicketModalState}
            onClose={handleClose}
            onOpen={handleOpen}
            size="lg"
            dialogClassName={cls.modalDialog}
            className={cls.modal}
            style={getTicketLoading ? {pointerEvents: 'none'} : {}}
        >
                <Typography tag="h3" variant="title-3" className={cls.title}>
                    {count !== '0'?`Вы уверены что хотите забронировать ${count} билетов на мероприятие ${ticketEventName}`:
                        `Вы уверены что хотите отменить бронь на мероприятие ${ticketEventName}`}
                </Typography>
                <Typography className={cls.authorizationType}>

                </Typography>
            <Button
                    style={inputStyles}
                    className={cls.submitButton}
                    block
                    type="button"
                    appearance="primary"
                    color="green"
                    disabled={dis}
                    onClick={onRegisterHandler}
                    size={mediaQueryMaxWidth400px ? 'sm' : 'md'}
                >
                    Да
                </Button>
                <Button
                    style={inputStyles}
                    className={cls.submitButton}
                    block
                    type="button"
                    appearance="primary"
                    color="red"
                    disabled={dis}
                    onClick={handleClose}
                    size={mediaQueryMaxWidth400px ? 'sm' : 'md'}
                >
                    Нет
                </Button>
        </Modal>
    )
}