import {FC, useEffect, useState} from 'react';

import { Layout } from '@/shared/components/Layout';

import { MyProfileProps, tabs} from '../../model/My-Profile.type';
import {useFilter} from "@/shared/lib/hooks/useFilter/useFilter";
import {eventModelSerializer} from "@/shared/lib/helpers/modelserializers";
import {OrganizationChangeForm} from "@/widgets/My-profile/additionUI/OrganizationChangeForm/OrganizationChangeForm";
import {OrganizationInformation, OrganizationTabs, UserEvents, UserTickets} from "@/widgets/My-profile/additionUI";
import cls from "@/widgets/My-profile/ui/UserProfile/UserProfile.module.less";


export const UserProfile: FC<MyProfileProps> = (props) => {
    const { user } = props;
    const { userInformation, userEvents } = user;
    const { filterFunctions, filterStates} = useFilter();
    const { getFilterValues } = filterFunctions;
    const [tabs, setTabs] = useState<tabs>('bookmarks');
    const { events } = filterStates
    const { bookmarkedEvents, registeredEvents } = userEvents;

    const serializedBookmarkedEvents = bookmarkedEvents.map((event) => eventModelSerializer(event));

    useEffect(() => {
        getFilterValues();
    }, []);

    return (
        <div>
            <OrganizationChangeForm />
            <Layout>
                <OrganizationInformation information={userInformation} />
                <OrganizationTabs tabs={tabs} setTabs={setTabs} user={userInformation} />
                <div className={cls.tabElement}>
                    {tabs === 'bookmarks'
                        && (
                            <UserEvents
                                withDrawer={false}
                                events={serializedBookmarkedEvents}
                                notEventText="У вас нет избранных ивентов"
                            />
                        )}
                    {tabs === 'tickets' && <UserTickets userTickets={registeredEvents} events={events} />}
                </div>
            </Layout>
        </div>
    );
};
