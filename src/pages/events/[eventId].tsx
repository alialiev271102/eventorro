import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { NotFound } from '@/entities/NotFound/ui/NotFound';
import { useEvent } from '@/shared/lib/hooks/useEvent';
import { Event, EventLoading } from '@/widgets/Event';

import cls from './eventId.module.less';

export default function () {
    const { query, push } = useRouter();
    const { eventStates, eventFunctions } = useEvent();
    const [localLoading, setIsLocalLoading] = useState(true);

    const { event, eventLoading } = eventStates;
    const { getEventById } = eventFunctions;

    const parsedId = typeof query.eventId === 'string'
    && /^\d+$/.test(query.eventId) ? parseInt(query.eventId, 10) : null;

    const onRouteBack = useCallback(() => {
        push('/');
    }, [push]);

    useEffect(() => {
        if (parsedId) {
            getEventById(parsedId).finally(() => setIsLocalLoading(false));
        }
    }, [getEventById, parsedId]);

    if (eventLoading || localLoading) {
        return <EventLoading />;
    }

    return (
        <div>
            {event && <Event event={event} />}
            {event === null && !eventLoading && !localLoading && (
                <NotFound
                    onClickOnButton={onRouteBack}
                    className={cls.notFound}
                    svgClassName={cls.notFoundImage}
                    text="К сожелению такого ивента нет"
                    withBackButton
                    textClassName={cls.notFoundText}
                    buttonClassName={cls.notFoundButton}
                />
            )}
        </div>
    );
}
