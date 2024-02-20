import {CalendarIcon, HashtagIcon, MapPinIcon,} from '@heroicons/react/24/outline';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import {useRouter} from 'next/router';
import {FC, useCallback, useState} from 'react';
import {Button, Stack} from 'rsuite';

import {EventEditDrawer} from '@/entities/EventForm';
import {SomIcon} from '@/shared/assets/SomIcon';
import {ProgressiveImageLoader} from '@/shared/components/ProgressiveImageLoader';
import {Typography} from '@/shared/components/Typography';
import {useAuthorization} from '@/shared/lib/hooks/useAuthorization/useAuthorization';
import {useEvent} from '@/shared/lib/hooks/useEvent';
import {useQueries} from '@/shared/lib/hooks/useMediaQuery';

import {EventCardProps} from '../../model/EventCard.type';
import imageNotFound from '../assets/imageNotFound.jpeg';
import cls from './EventCardMobile.module.less';

export const EventCardMobile: FC<EventCardProps> = (props) => {
    const {event, withDrawer} = props;
    const {mediaQueryMaxWidth360px} = useQueries();
    const {authorizationStates} = useAuthorization();
    const {eventFunctions, eventStates} = useEvent();
    const {userState} = authorizationStates;
    const {isModerate} = event.eventInfo
    const {eventBookmarking} = eventStates;
    const {toggleEventSaveState} = eventFunctions;

    const [isEventCardDrawerOpen, setIsEventCardDrawerOpen] = useState<boolean>(false);

    const {eventInfo, eventProperties, eventContent} = event;

    const {
        priceTo, priceFrom, eventName, eventDates, locationName, eventId,
    } = eventInfo;

    const {categories} = eventProperties;

    const {push} = useRouter();

    const isBooked = userState?.userEvents.bookmarkedEvents
        .some((eventFromBackend) => eventFromBackend.id === eventId);

    // eslint-disable-next-line func-names
    const eventPrice: string = (function () {
        if (priceFrom === null) {
            return 'Вход свободный';
        }
        if (priceTo === null) {
            return `${priceFrom}c`;
        }
        return `${priceFrom}-${priceTo}c`;
    }());

    const eventDate = format(
        new Date(Date.parse(eventDates[0].dateTime)),
        'dd-MMMM в EEEEEE HH:mm',
        {
            locale: ru,
        },
    );

    const onEventClickHandler = useCallback(async (): Promise<void> => {
        await push(`/events/${eventId}`);
    }, [eventId, push]);

    const onSaveHandler = useCallback(async (): Promise<void> => {
        await toggleEventSaveState(eventId);
    }, [eventId, toggleEventSaveState]);

    return (
        <div className={cls.EventCard}>
            <EventEditDrawer
                onClose={() => setIsEventCardDrawerOpen(false)}
                isOpen={isEventCardDrawerOpen}
                event={event}
            />
            <div className={cls.cover}>
                <ProgressiveImageLoader
                    src={eventContent.eventCardImage}
                    alt={eventName}
                    className={cls.image}
                    width={mediaQueryMaxWidth360px ? 100 : 120}
                    height={mediaQueryMaxWidth360px ? 140 : 160}
                    errorImage={imageNotFound.src}
                    onClick={onEventClickHandler}
                />
                {userState && !withDrawer && (
                    <Button
                        disabled={eventBookmarking}
                        onClick={onSaveHandler}
                        color="green"
                        appearance="primary"
                        size="xs"
                        className={cls.bookmark}
                    >
                        {isBooked ? 'Удалить из избранных' : 'Добавить в избранные'}
                    </Button>
                )}

                {userState && withDrawer && (
                    <button
                        type="button"
                        className={cls.saveToBookmarkBlock}
                        disabled={isEventCardDrawerOpen}
                        onClick={() => setIsEventCardDrawerOpen(true)}
                    >
                        <Button
                            color="red"
                            appearance="primary"
                            size="xs"
                            className={cls.bookmark}
                        >
                            Настроить ивент
                        </Button>
                    </button>
                )}

            </div>
            <div className={cls.cardContent} onClick={onEventClickHandler}>
                <div className={cls.eventTitleBlock}>
                    <Typography
                        className={cls.eventTitle}
                        bold
                        tag="span"
                        variant="body-3"
                    >
                        {eventName}
                    </Typography>
                </div>
                <Stack
                    direction="column"
                    alignItems="flex-start"
                    spacing={10}
                    justifyContent="center"
                    className={cls.additionInfo}
                >
                    <Stack alignItems="center" spacing={10}>
                        <SomIcon className={cls.somIcon}/>
                        <Typography
                            className={cls.additionInfoValue}
                            bold
                            variant="body-4"
                        >
                            {eventPrice}
                        </Typography>
                    </Stack>
                    <Stack alignItems="center" spacing={10} justifyContent="center">
                        <CalendarIcon width={16} height={16}/>
                        <Typography
                            className={cls.additionInfoValue}
                            bold
                            variant="body-4"
                        >
                            {eventDate}
                        </Typography>
                    </Stack>
                    <Stack alignItems="center" spacing={10} justifyContent="center">
                        <MapPinIcon width={16} height={16}/>
                        <Typography
                            className={cls.additionInfoValue}
                            bold
                            variant="body-4"
                        >
                            {locationName}
                        </Typography>
                    </Stack>
                    <Stack
                        alignItems="center"
                        spacing={10}
                        justifyContent="center"
                    >
                        <HashtagIcon width={16} height={16}/>
                        <Typography
                            className={cls.additionInfoValue}
                            bold
                            variant="body-4"
                        >
                            {categories.map((category, index) => {
                                if (categories.length === 1) {
                                    return category.name;
                                }
                                if (index === 2) {
                                    return category.name;
                                }
                                return `${category.name}, `;
                            })}
                        </Typography>
                    </Stack>
                </Stack>
            </div>
        </div>
    );
};
