import { Dispatch, SetStateAction } from 'react';

import {
    Event, ticketUser, User, userInformation,
} from '@/app/types/global';

export type tabs = 'tickets' | 'bookmarks' | 'my-events' | 'create-event';

export interface MyProfileProps {
    user: User;
}

export interface EditOrganizationFormFields {
    name:string;
    surname: string;
    organizationName: string;
    poster:FileList | null;
    avatar: FileList | null;
    bio: string;
    phone: string;
}

export interface OrganizationPosterProps {
    poster: string;
    alt: string;
}

export interface OrganizationInformationProps {
    information: userInformation;
}

export interface OrganizationTabsProps {
    tabs: tabs;
    setTabs: Dispatch<SetStateAction<tabs>>
}

export interface OrganizationEventsProps {
    events: Event[];
    notEventText: string;
    withDrawer: boolean;
}

export interface UserTicketsProps {
    userTickets: ticketUser[];
}
