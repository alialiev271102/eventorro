import { FC } from 'react';
import { Stack } from 'rsuite';

import {
    EventCardDesktop,
    EventCardDesktopSkeleton,
    EventCardMobile,
    EventCardMobileSkeleton,
} from '@/entities/EventCard';
import { EventMarkup } from '@/shared/components/EventMarkup';
import { Typography } from '@/shared/components/Typography';
import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';
import cls from '@/widgets/Events/ui/Events.module.less';

import { OrganizationEventsProps } from '../../model/My-Profile.type';

export const UserEvents: FC<OrganizationEventsProps> = (props) => {
    const { events, notEventText, withDrawer } = props;
    const { authorizationStates } = useAuthorization();
    const { mediaQueryMaxWidth750px } = useQueries();

    const { userState, userLoading } = authorizationStates;
    const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8];

    if (userState === null) {
        return null;
    }

    if (events.length === 0) {
        return (
            <Typography className={cls.eventNone} bold variant="body-1">
                {notEventText}
            </Typography>
        );
    }

    if (userLoading) {
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
                <>
                    {events
                        .map((event) => (
                            <EventCardMobile
                                withDrawer={withDrawer}
                                event={event}
                                key={event.eventInfo.eventId}
                            />
                        ))}
                </>
            ) : (
                <>
                    {events.map((event) => (
                        <Stack justifyContent="center" key={event.eventInfo.eventId}>
                            <EventCardDesktop withDrawer={withDrawer} event={event} />
                        </Stack>
                    ))}
                </>
            )}
        </EventMarkup>
    );
};
