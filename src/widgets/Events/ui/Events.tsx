import { Stack } from 'rsuite';

import {
    EventCardDesktop,
    EventCardDesktopSkeleton,
    EventCardMobile,
    EventCardMobileSkeleton,
} from '@/entities/EventCard';
import { NotFound } from '@/entities/NotFound/ui/NotFound';
import { EventMarkup } from '@/shared/components/EventMarkup';
import { useFilter } from '@/shared/lib/hooks/useFilter/useFilter';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import cls from './Events.module.less';

const loadingArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const Events = () => {
    const { mediaQueryMaxWidth750px } = useQueries();

    const { filterStates } = useFilter();

    const { events, eventLoading } = filterStates;

    if (!eventLoading && events.length === 0) {
        return (
            <NotFound
                className={cls.notFound}
                svgClassName={cls.notFoundImage}
                textClassName={cls.notFoundText}
                text="Извините, мероприятия по вашему запросу не найдены"
            />
        );
    }

    if (eventLoading) {
        return (
            <EventMarkup typeOfMarkup={mediaQueryMaxWidth750px ? 'column' : 'grid'}>
                {mediaQueryMaxWidth750px ? (
                    <>{loadingArray.map((num) => (<EventCardMobileSkeleton key={num} />))}</>
                ) : (
                    <>
                        {loadingArray.map((num) => (
                            <Stack justifyContent="center" key={num}>
                                <EventCardDesktopSkeleton />
                            </Stack>
                        ))}
                    </>
                )}
            </EventMarkup>
        );
    }

    return (
        <EventMarkup typeOfMarkup={mediaQueryMaxWidth750px ? 'column' : 'grid'}>
            {mediaQueryMaxWidth750px ? (
                <>{events.map((event) => (<EventCardMobile event={event} key={event.eventInfo.eventId} />))}</>
            ) : (
                <>
                    {events.map((event) => (
                        <Stack justifyContent="center" key={event.eventInfo.eventId}>
                            <EventCardDesktop event={event} />
                        </Stack>
                    ))}
                </>
            )}
        </EventMarkup>
    );
};
