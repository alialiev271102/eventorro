import { FC, useEffect } from 'react';

import { Layout } from '@/shared/components/Layout';
import { useEvent } from '@/shared/lib/hooks/useEvent';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import {
    CarouselImages,
    EventInformation,
    HorizontalPoster,
    Organization,
    OrganizationLoader,
    VerticalPoster,
    YoutubeFrame,
} from '../additionUI';
import { EventProps } from '../model/Event.type';
import cls from './Event.module.less';

export const Event: FC<EventProps> = ({ event }) => {
    const { eventInfo, eventProperties, eventContent } = event;
    const { mediaQueryMaxWidth900px } = useQueries();
    const { eventFunctions, eventStates } = useEvent();
    const { getEventAuthorDateByEmail } = eventFunctions;

    const { authorData, authorDataLoading } = eventStates;

    const { eventName, author } = eventInfo;
    const {
        poster, images, video, eventCardImage,
    } = eventContent;

    useEffect(() => {
        getEventAuthorDateByEmail(author);
    }, [author, getEventAuthorDateByEmail]);

    return (
        <div className={cls.Event}>
            {mediaQueryMaxWidth900px
                ? (
                    <VerticalPoster
                        alt={eventName}
                        imageLink={eventCardImage}
                    />
                )
                :( poster !== "https://back.eventorro.comImage Not Found"
                ?(
                    <HorizontalPoster
                        alt={eventName}
                        imageLink={poster}
                    />
                ) : (''))}
            <Layout>
                {authorData === null || authorDataLoading
                    ? <OrganizationLoader />
                    : (
                        <Organization
                            email={author}
                            avatar={authorData.avatar}
                            organizationName={authorData.organizationName}
                        />
                    )}
                <EventInformation
                    eventInfo={eventInfo}
                    eventProperties={eventProperties}
                />
                {images.length ? (<CarouselImages images={images} />):('')}
                {video && <YoutubeFrame link={video} />}
            </Layout>
        </div>
    );
};
