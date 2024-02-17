import { Dispatch, SetStateAction } from 'react';

import { Event } from '@/app/types/global';

export interface AuthorData {
    avatar: string;
    organizationName: string;
}

export interface CreateEventProps{
    poster: File | null;
    event_card_image: File | null;
    name: string;
    city: string;
    description: string;
    tickets_number: number | null;
    price_from: number | null;
    price_to: number | null;
    event_language: string;
    categories: string[];
    type_of_location: string;
    event_dates: string[];
    video?: string;
    age_limits: string;
    audience: string;
    location_link: string;
    image1?: File | null;
    image2?: File | null;
    image3?: File | null;
    image4?: File | null;
    image5?: File | null;
    location_name: string
}
export interface UseEventReturn {
    eventStates: {
        notSuchEvent: boolean;
        eventBookmarking: boolean;
        event: Event | null;
        eventLoading: boolean;
        authorData: AuthorData | null;
        authorDataLoading: boolean;
        eventRegistering: boolean;
        updatingEvent: boolean;
        eventDeleting:boolean;
        eventCreating: boolean;
    };

    eventFunctions: {
        deleteEvent: (id: number) => Promise<void>;
        createEvent:(data: Partial<CreateEventProps>) => Promise<void>;
        updateEvent: (id: number, data: Partial<CreateEventProps>) => Promise<void>;
        getEventById: (eventId: number) => Promise<void>;
        toggleRegisterToEvent: (eventId: number, setIsRegistered: Dispatch<SetStateAction<boolean>>) => Promise<void>;
        toggleEventSaveState: (id: number) => Promise<void>;
        getEventAuthorDateByEmail: (email: string) => Promise<void>;
    };
}
