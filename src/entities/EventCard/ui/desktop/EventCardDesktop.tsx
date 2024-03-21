import {
    BookmarkIcon, CalendarIcon, Cog6ToothIcon, HashtagIcon, MapPinIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import {
    FC, useCallback, useState,
} from 'react';
import { Stack } from 'rsuite';

import { EventEditDrawer } from '@/entities/EventForm';
import { SomIcon } from '@/shared/assets/SomIcon';
import { ProgressiveImageLoader } from '@/shared/components/ProgressiveImageLoader';
import { Typography } from '@/shared/components/Typography';
import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';
import { useDataNormalization } from '@/shared/lib/hooks/useDataNormalization';
import { useEvent } from '@/shared/lib/hooks/useEvent';

import { EventCardProps } from '../../model/EventCard.type';
import imageNotFound from '../assets/imageNotFound.jpeg';
import cls from './EventCardDesktop.module.less';

export const EventCardDesktop: FC<EventCardProps> = (props) => {
    const { event, withDrawer } = props;
    const { authorizationStates } = useAuthorization();
    const { eventFunctions, eventStates } = useEvent();
    const { push } = useRouter();
    const { eventCategories, eventDate, eventPrice } = useDataNormalization();
    const [isEventCardDrawerOpen, setIsEventCardDrawerOpen] = useState<boolean>(false);

    const { userState } = authorizationStates;
    const { eventInfo, eventProperties, eventContent } = event;
    const { eventBookmarking } = eventStates;
    const { toggleEventSaveState } = eventFunctions;

    const {
        priceTo, priceFrom, eventName, eventDates, locationName, eventId,
    } = eventInfo;
    const { categories } = eventProperties;

    const isBooked = userState?.userEvents.bookmarkedEvents
        .some((eventFromBackend) => eventFromBackend.id === eventId);

    const onEventClickHandler = useCallback(async ():Promise<void> => {
        await push(`/events/${eventId}`);
    }, [eventId, push]);

    const onSaveHandler = useCallback(async ():Promise<void> => {
        await toggleEventSaveState(eventId);
    }, [eventId, toggleEventSaveState]);

    return (
        <div className={cls.EventCard}>
            <EventEditDrawer
                onClose={() => setIsEventCardDrawerOpen(false)}
                isOpen={isEventCardDrawerOpen}
                event={event}
            />
            <div className={cls.imageBlock}>
                <ProgressiveImageLoader
                    src={eventContent.eventCardImage}
                    alt={eventName}
                    className={cls.image}
                    width={230}
                    height={290}
                    errorImage={imageNotFound.src}
                    onClick={onEventClickHandler}
                />
                {userState && !withDrawer && (
                    <button
                        type="button"
                        className={cls.saveToBookmarkBlock}
                        disabled={eventBookmarking}
                        onClick={onSaveHandler}
                    >
                        <BookmarkIcon className={cls.bookmarkIcon} fill={isBooked ? '#fff' : 'none'} />
                    </button>
                )}
                {userState && withDrawer && (
                    <button
                        type="button"
                        className={cls.saveToBookmarkBlock}
                        disabled={isEventCardDrawerOpen}
                        onClick={() => setIsEventCardDrawerOpen(true)}
                    >
                        <Cog6ToothIcon className={cls.bookmarkIcon} />
                    </button>
                )}
            </div>
            <div className={cls.contentBlock} onClick={onEventClickHandler}>
                <div className={cls.eventTitleBlock}>
                    <Typography
                        className={cls.eventTitle}
                        bold
                        tag="span"
                        variant="body-3"
                    >
                        {eventInfo.eventName}
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
                        <SomIcon className={cls.somIcon} />
                        <Typography
                            className={cls.additionInfoValue}
                            bold
                            variant="body-4"
                        >
                            {eventPrice(priceFrom, priceTo)}
                        </Typography>
                    </Stack>
                    <Stack alignItems="center" spacing={10} justifyContent="center">
                        <CalendarIcon width={16} height={16} />
                        <Typography
                            className={cls.additionInfoValue}
                            bold
                            variant="body-4"
                        >
                            {eventDates.length !== 0
                                ? eventDate(eventDates[0]?.dateTime!) : eventDate(new Date().toISOString()) }
                        </Typography>
                    </Stack>
                    <Stack alignItems="center" spacing={10} justifyContent="center">
                        <MapPinIcon width={16} height={16} />
                        <Typography
                            className={cls.additionInfoValue}
                            bold
                            variant="body-4"
                        >
                            {locationName}
                        </Typography>
                    </Stack>
                    <Stack alignItems="center" spacing={10} justifyContent="center">
                        <HashtagIcon width={16} height={16} />
                        <Typography
                            className={cls.additionInfoValue}
                            bold
                            variant="body-4"
                        >
                            {eventCategories(categories)}
                        </Typography>
                    </Stack>
                </Stack>
            </div>
        </div>
    );
};
