export declare type clsxMods = Record<string, boolean>;

type EventCategory = {name: string};
type EventImage = {image: string};
type EventDate = {date_time: string};

export interface ticketUserFromBackend {
    id: number;
    event: string;
    count: number;
    phone: string;
    name: string;
    last_name: string;
    user_id: number;
    email: string;
}

export interface ticketUser {
    id: number;
    event: string;
    count: number;
    phone: string;
    name: string;
    lastName: string;
    userId: number;
    email: string;
}

export interface EventFromBackend {
    readonly id: number
    readonly name: string;
    readonly isModerate: boolean
    readonly city: string;
    readonly poster:string;
    readonly price_from:number | null;
    readonly price_to:number | null;
    readonly video:string;
    readonly description: string;
    readonly event_language: string;
    readonly tickets_number: number | null;
    readonly location_link:string;
    readonly location_name: string;
    readonly images: EventImage[];
    readonly ticket_users: ticketUserFromBackend[];
    readonly event_dates: EventDate[];
    readonly event_card_image: string;
    readonly author: string;
    readonly audience: string;
    readonly age_limits: string;
    readonly type_of_location: string;
    readonly categories: EventCategory[];
}

export interface UserFromBackend {
    readonly user_id: number
    readonly email: string;
    readonly is_guest:boolean;
    readonly is_host:boolean;
    readonly last_name:string;
    readonly name:string;
    readonly refresh: string;
    readonly access: string;
    readonly poster: string;
    readonly bio: string;
    readonly phone: string;
    readonly avatar: string;
    readonly organization_name: string;
    readonly events_by_user: EventFromBackend[];
    readonly saved: {event: EventFromBackend}[];
    readonly tickets: [];
}

interface EventDates {
    dateTime: string
}

export interface EventInfo {
    readonly eventId: number
    readonly isModerate: boolean
    readonly eventName: string;
    readonly priceFrom: number | null;
    readonly priceTo: number | null;
    readonly description: string;
    readonly ticketsNumber: number | null;
    readonly locationLink:string;
    readonly locationName: string;
    readonly author: string;
    readonly eventLanguage: string;
    readonly eventDates: EventDates[];
    readonly ticketUsers: ticketUser[];
}

export interface EventProperties {
    readonly audience: string;
    readonly ageLimits: string;
    readonly city: string;
    readonly typeOfLocation: string;
    readonly categories: EventCategory[];
}

export interface EventContent {
    readonly poster: string;
    readonly images: EventImage[];
    readonly eventCardImage: string;
    readonly video:string;
}

export interface Event {
    eventInfo: EventInfo;
    eventProperties: EventProperties;
    eventContent: EventContent;
}

interface userTokens {
    readonly refresh: string;
    readonly access: string;
}

interface userImages {
    readonly poster:string;
    readonly avatar: string;
}

export interface userInformation {
    readonly id: number
    readonly email: string;
    readonly organizationName: string;
    readonly lastName:string;
    readonly name:string;
    readonly isHost:boolean;
    readonly bio: string;
    readonly phone: string;
}

type userEventsEvent = {event: EventFromBackend}

interface userEvents {
    readonly userCreatedEvents: EventFromBackend[];
    readonly bookmarkedEvents: EventFromBackend[];
    readonly registeredEvents: ticketUser[]
}

export interface User {
    userInformation: userInformation;
    userTokens: userTokens;
    userEvents: userEvents;
    userImages: userImages
}
