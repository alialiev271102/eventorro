import { Dispatch, SetStateAction } from 'react';
import { DeepRequired, FieldErrorsImpl, GlobalError } from 'react-hook-form';

import { Event, EventInfo, EventProperties, ticketUser } from '@/app/types/global';

export interface EventFormBannerProps {
    className?: string;
    alt: string;
    image: File | null;
    setImage: Dispatch<SetStateAction<File | null>>;
}

type category = {
    name:string;
    slug: string;
}

export type carouselImage = {
    id: string;
    name: string;
    file?: File;
    localUrl: string;
}

export interface localStates {
    isFree: boolean;
    setIsFree: Dispatch<SetStateAction<boolean>>;
    registerHere: boolean;
    setRegisterHere: Dispatch<SetStateAction<boolean>>;
    localDescription: string;
    setLocalDescription: Dispatch<SetStateAction<string>>;
    localAge: string;
    setLocalAge: Dispatch<SetStateAction<string>>;
    localAudience: string;
    setLocalAudience: Dispatch<SetStateAction<string>>;
    localCategories: string[];
    setLocalCategories: Dispatch<SetStateAction<string[]>>;
    localTypeOfLocation: string;
    setLocalTypeOfLocation: Dispatch<SetStateAction<string>>;
    localCity: string;
    setLocalCity: Dispatch<SetStateAction<string>>;
}

export interface EventFormDrawerProps {
    onClose: () => void;
    isOpen: boolean;
    event: Event;
}

export interface EventFormTicketUsersProps {
    onClose: () => void;
    isOpen: boolean;
    ticketUsers: ticketUser[];
}

export interface EventFormCarouselProps {
    className?: string;
    carouselImages: carouselImage[];
    helperText?: boolean;
    setCarouselImages: Dispatch<SetStateAction<carouselImage[]>>;
}

export type eventDateTime = {
    date_time: string;
}

export interface EventFormFields {
    banner: FileList | string;
    name: string;
    city: string;
    description: string;
    ticketsNumber: number | null;
    priceFrom: number | null;
    priceTo: number | null;
    categories: category[];
    typeOfLocation: string;
    eventDates: eventDateTime[];
    eventLanguage: string;
    video: string;
    ageLimits: string;
    audience: string;
    locationLink: string;
    image1: FileList;
    image2: FileList;
    image3: FileList;
    image4: FileList;
    image5: FileList;
    locationName: string;
}

export interface EventFormFieldsProps {
    eventInfo: EventInfo;
    eventProperties: EventProperties;
    localStates: localStates;
    errors: Partial<FieldErrorsImpl<DeepRequired<EventFormFields>>> & {root?: Record<string, GlobalError> & GlobalError}
}

export interface EventFormBackendFields {
    poster: File | null | undefined;
    name: string;
    description: string;
    tickets_number: number | null;
    price_from: number | null;
    price_to: number | null;
    categories: string[];
    type_of_location: string;
    event_dates: eventDateTime[];
    event_language: string;
    video: string;
    age_limits: string;
    audience: string;
    location_link: string;
    image1: File | null;
    image2: File | null;
    image3: File | null;
    image4: File | null;
    image5: File | null;
    location_name: string;
    event_card_image: File | null;
}

export enum EventFormFieldsNames {
    BANNER = 'banner',
    DESCRIPTION = 'description',
    NAME = 'name',
    TICKET_NUMBER = 'ticketsNumber',
    PRICE_FROM = 'priceFrom',
    PRICE_TO = 'priceTo',
    CITY = 'citys',
    CATEGORIES = 'categories',
    TYPE_OF_LOCATION = 'typeOfLocation',
    EVENT_DATES = 'eventDates',
    VIDEO = 'video',
    EVENT_LANGUAGE = 'eventLanguage',
    AGE = 'ageLimits',
    AUDIENCE = 'audience',
    LOCATION_LINK = 'locationLink',
    LOCATION_NAME = 'locationName',
    IMAGE_1 = 'image1',
    IMAGE_2 = 'image2',
    IMAGE_3 = 'image3',
    IMAGE_4 = 'image4',
    IMAGE_5 = 'image5',
}
