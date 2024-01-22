import { FC } from 'react';
import { Stack } from 'rsuite';

import {
    EventCardDesktop,
    EventCardMobile,
} from '@/entities/EventCard';
import { EventMarkup } from '@/shared/components/EventMarkup';
import { Typography } from '@/shared/components/Typography';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';
import cls from '@/widgets/Events/ui/Events.module.less';

import { OrganizationEventsProps } from '../../model/My-Profile.type';

export const UserEvents: FC<OrganizationEventsProps> = (props) => {
    const { events, notEventText, withDrawer } = props;
    const { mediaQueryMaxWidth750px } = useQueries();

    if (events.length === 0) {
        return (
            <Typography className={cls.eventNone} bold variant="body-1">
                {notEventText}
            </Typography>
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
