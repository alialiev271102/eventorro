import {
    BookmarkIcon,
    CalendarIcon, HashtagIcon, IdentificationIcon, MapIcon, MapPinIcon, TicketIcon, UserGroupIcon,
} from '@heroicons/react/24/outline';
import {
    FC, useCallback, useEffect, useState,
} from 'react';
import { Button, Panel, Stack } from 'rsuite';

import { SomIcon } from '@/shared/assets/SomIcon';
import { Typography } from '@/shared/components/Typography';
import { ACCESS_TOKEN_KEY } from '@/shared/lib/constants/localStorageKeys';
import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';
import { useDataNormalization } from '@/shared/lib/hooks/useDataNormalization';
import { useEvent } from '@/shared/lib/hooks/useEvent';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import { EventInformationProps } from '../../model/Event.type';
import cls from './EventInformation.module.less';

export const EventInformation: FC<EventInformationProps> = (props) => {
    
    const { eventInfo, eventProperties } = props;

    const [isRegistered, setIsRegistered] = useState<boolean>(false);

    const { mediaQueryMaxWidth900px, mediaQueryMinWidth600px } = useQueries();
    const { eventFunctions, eventStates } = useEvent();
    const { authorizationSetStates,authorizationStates, authorizationFunction } = useAuthorization();
    const { eventPrice, eventCategories, eventDate } = useDataNormalization();
    const { setAuthorizationModalState } = authorizationSetStates;
    const { userState } = authorizationStates;
    const { getUserData } = authorizationFunction;
    const { toggleEventSaveState, toggleRegisterToEvent } = eventFunctions;
    const { eventBookmarking, eventRegistering } = eventStates;
    const {
        typeOfLocation, ageLimits, audience, categories,
    } = eventProperties;
    const {
        priceTo, priceFrom, description, eventName, eventDates, locationName, eventId, ticketUsers, ticketsNumber,
    } = eventInfo;

    const isBooked = userState?.userEvents.bookmarkedEvents
        .some((eventFromBackend) => eventFromBackend.id === eventId);

    const onSaveHandler = useCallback(async ():Promise<void> => {
        await toggleEventSaveState(eventId);
    }, [eventId, toggleEventSaveState]);

    const onRegisterHandler = useCallback(async ():Promise<void> => {
        await toggleRegisterToEvent(eventId, setIsRegistered);
    }, [eventId, toggleRegisterToEvent]);
    const onUserRegisterhandler = () => {
        setAuthorizationModalState(true);
    }
    const currentDate = new Date();
    const dates = new Date(eventDates[0].dateTime);
    

    useEffect(() => {
        if (userState) {
            const isRegister = ticketUsers.some((ticketUser) => ticketUser.userId === userState.userInformation.id);
            setIsRegistered(isRegister);
        } else if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
            getUserData();
        }
    }, [getUserData, ticketUsers, userState]);

    if (typeof eventInfo === 'undefined' || typeof eventProperties === 'undefined') {
        return null;
    }
    return (
        <div className={cls.EventInformation}>
            <div className={cls.titleAndDescriptionBlock}>
                <Typography
                    bold
                    className={cls.title}
                    variant="title-2"
                >
                    {eventName}
                </Typography>
                {mediaQueryMaxWidth900px ? (
                    <Panel
                        className={cls.descriptionPanel}
                        bordered={mediaQueryMaxWidth900px}
                        header={mediaQueryMaxWidth900px && 'Описание'}
                        collapsible={mediaQueryMaxWidth900px}
                        defaultExpanded={mediaQueryMinWidth600px}
                    >
                        {description}
                    </Panel>
                ) : (
                    <Typography
                        tag="p"
                        variant="body-1"
                        className={cls.descriptionFullWidth}
                    >
                        {description}
                    </Typography>
                )}
            </div>

            <Panel bordered className={cls.informationPanel}>
                <Stack direction="column" spacing={10} alignItems="flex-start">
                    <Stack alignItems="center" justifyContent="center" spacing={5}>
                        <CalendarIcon className={cls.informationPanelIcon} />
                        <Typography variant="body-3">{eventDate(eventDates[0].dateTime)}</Typography>
                    </Stack>
                    <Stack alignItems="center" spacing={5}>
                        <SomIcon className={cls.informationPanelIcon} fill="#EF8A29" />
                        <Typography variant="body-3">{eventPrice(priceFrom, priceTo)}</Typography>
                    </Stack>
                    <Stack alignItems="center" spacing={5}>
                        <MapIcon className={cls.informationPanelIcon} />
                        <Typography variant="body-3">{locationName}</Typography>
                    </Stack>
                    <Stack alignItems="center" spacing={5}>
                        <MapPinIcon className={cls.informationPanelIcon} />
                        <Typography variant="body-3">{typeOfLocation}</Typography>
                    </Stack>
                    <Stack alignItems="center" spacing={5}>
                        <IdentificationIcon className={cls.informationPanelIcon} />
                        <Typography variant="body-3">{ageLimits}</Typography>
                    </Stack>
                    <Stack alignItems="center" spacing={5}>
                        <UserGroupIcon className={cls.informationPanelIcon} />
                        <Typography variant="body-3">{audience}</Typography>
                    </Stack>
                    <Stack alignItems="center" spacing={5}>
                        <HashtagIcon className={cls.informationPanelIcon} />
                        <Typography variant="body-3">
                            {eventCategories(categories)}
                        </Typography>
                    </Stack>
                    {
                    (<Stack alignItems="center" spacing={5}>
                        <TicketIcon className={cls.informationPanelIcon} />
                        <Typography variant="body-3">
                           {ticketsNumber? "Количество свободных мест: " + ticketsNumber: "Неограниченное количество мест"}
                        </Typography>                        
                    </Stack>)}
                </Stack>

                <div className={cls.informationPanelButtons}>
                    {(dates > currentDate)? 
                    ((userState !== null)?
                    <Button
                            block
                            appearance="primary"
                            className={cls.informationPanelButton}
                            onClick={onRegisterHandler}
                            loading={eventRegistering || userState === null}
                        >
                            {isRegistered ? 'Отменить бронь' : 'Забронировать'}
                            <TicketIcon width={18} height={18} />
                    </Button>
                    :
                    <Button
                            block
                            appearance="primary"
                            className={cls.informationPanelButton}
                            onClick={onUserRegisterhandler}
                        >
                            Забронировать asds
                            <TicketIcon width={18} height={18} />
                        </Button>): <div> </div>
                    }
                    
                    {userState !== null?
                        <Button
                        onClick={onSaveHandler}
                        loading={eventBookmarking || userState === null}
                        block
                        appearance="ghost"
                        color="yellow"
                        className={cls.informationPanelButton}
                    >
                        {isBooked ? 'Удалить из избранных' : 'Добавить в избранные'}
                        <BookmarkIcon
                            width={18}
                            height={18}
                        />
                    </Button>:
                    <Button
                    onClick={onUserRegisterhandler}
                    block
                    appearance="ghost"
                    color="yellow"
                    className={cls.informationPanelButton}
                >
                    Добавить в избранные
                    <BookmarkIcon
                        width={18}
                        height={18}
                    />
                </Button>
                    }
                </div>
            </Panel>
        </div>

    );
};
