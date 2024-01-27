import { TicketIcon } from '@heroicons/react/24/outline';
import {FC, useCallback} from 'react';
import { List, Stack } from 'rsuite';

import { Typography } from '@/shared/components/Typography';

import { UserTicketsProps } from '../../model/My-Profile.type';
import cls from './UserTickets.module.less';
import Link from "next/link";
import {useFilter} from "@/shared/lib/hooks/useFilter/useFilter";

export const UserTickets: FC<UserTicketsProps> = (props) => {
    const { userTickets, events } = props;

    if (userTickets.length === 0) {
        return (
            <Typography className={cls.ticketNone} bold variant="body-1">
                У вас покак нету бронирований
            </Typography>
        );
    }

    let mergedTickets;
    mergedTickets = userTickets.map(ticket => {
        for (let i = 0; i < events.length; i++) {
            if (ticket.event === events[i].eventInfo.eventName) {
                return {...ticket, id: events[i].eventInfo.eventId, orgAuthor: events[i].eventInfo.author}
            }
        }
        return ticket;
    });

    return (
        <List bordered hover>
            {mergedTickets.map((userTicket) => (
                <List.Item>
                    <Link href={`/events/${userTicket.id}`}>
                        <Stack alignItems="center" spacing={10} className={cls.eventElement}>
                            <TicketIcon height={25} width={25} />
                            <div className={cls.eventTextBlock} >
                                <Typography bold className={cls.eventName}>
                                   {userTicket.event}
                                </Typography>
                                <Typography className={cls.eventEmail}>
                                    {userTicket.orgAuthor}
                                </Typography>
                            </div>
                        </Stack>
                    </Link>
                </List.Item>
            ))}
        </List>
    );
};
