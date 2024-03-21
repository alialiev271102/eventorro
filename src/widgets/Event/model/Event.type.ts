import {
    Event, EventContent, EventInfo, EventProperties,
} from '@/app/types/global';

export interface EventProps {
    event: Event;
}

export interface EventPosterProps {
    imageLink: string;
    alt: string;
}

export interface EventInformationProps {
    eventInfo: EventInfo;
    eventProperties: EventProperties;
}

export interface YoutubeFrameProps {
    link: string;
}

export interface OrganizationProps {
    email: string;
    avatar: string;
    organizationName: string;
}

export type CarouselImagesProps = Pick<EventContent, 'images'>
