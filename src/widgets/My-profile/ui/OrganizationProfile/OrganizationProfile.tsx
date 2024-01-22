import { FC, useEffect, useState } from 'react';

import { EventFormTab } from '@/entities/EventForm';
import { Layout } from '@/shared/components/Layout';
import { eventModelSerializer } from '@/shared/lib/helpers/modelserializers';
import { useFilter } from '@/shared/lib/hooks/useFilter/useFilter';
import { OrganizationChangeForm } from '@/widgets/My-profile/additionUI/OrganizationChangeForm/OrganizationChangeForm';

import {
    OrganizationInformation,
    OrganizationPoster,
    OrganizationTabs,
    UserEvents,
    UserTickets,
} from '../../additionUI';
import { MyProfileProps, tabs } from '../../model/My-Profile.type';
import cls from './OrganizationProfile.module.less';

export const OrganizationProfile: FC<MyProfileProps> = (props) => {
    const { user } = props;

    const { userInformation, userImages, userEvents } = user;

    const { filterFunctions, filterStates} = useFilter();
    const { events } = filterStates
    const { getFilterValues } = filterFunctions;
    const [tabs, setTabs] = useState<tabs>('create-event');

    const { poster } = userImages;
    const { name } = userInformation;
    const { userCreatedEvents, bookmarkedEvents, registeredEvents } = userEvents;

    const serializedCreatedEvents = userCreatedEvents ? userCreatedEvents.map((event) => eventModelSerializer(event)) : [];
    const serializedBookmarkedEvents = bookmarkedEvents.map((event) => eventModelSerializer(event));

    useEffect(() => {
        getFilterValues();
    }, []);

    return (
        <div>
            <OrganizationPoster poster={poster} alt={name} />
            <OrganizationChangeForm />
            <Layout>
                <OrganizationInformation information={userInformation} />
                <OrganizationTabs tabs={tabs} setTabs={setTabs} user={userInformation}/>
                <div className={cls.tabElement}>
                    {tabs === 'my-events'
                        && (
                            <UserEvents
                                withDrawer
                                events={serializedCreatedEvents}
                                notEventText="Вы пока не создали ни одного ивента"
                            />
                        )}
                    {tabs === 'bookmarks'
                        && (
                            <UserEvents
                                withDrawer={false}
                                events={serializedBookmarkedEvents}
                                notEventText="У вас нет избранных ивентов"
                            />
                        )}
                    {tabs === 'tickets' && <UserTickets userTickets={registeredEvents} events={events} />}
                    {tabs === 'create-event' && <EventFormTab />}
                </div>
            </Layout>
        </div>
    );
};
