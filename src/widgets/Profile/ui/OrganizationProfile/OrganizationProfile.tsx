import { FC, useState } from 'react';

import { Layout } from '@/shared/components/Layout';
import { eventModelSerializer } from '@/shared/lib/helpers/modelserializers';
import { OrganizationChangeForm } from '@/widgets/My-profile/additionUI/OrganizationChangeForm/OrganizationChangeForm';

import {
    OrganizationInformation,
    OrganizationPoster,
    OrganizationTabs,
    UserEvents,
} from '../../additionUI';
import { MyProfileProps, tabs } from '../../model/My-Profile.type';
import cls from './OrganizationProfile.module.less';

export const OrganizationProfile: FC<MyProfileProps> = (props) => {
    const { user } = props;

    const { userInformation, userImages, userEvents } = user;

    const [tabs, setTabs] = useState<tabs>('my-events');

    const { poster } = userImages;
    const { name } = userInformation;
    const { userCreatedEvents } = userEvents;

    const serializedCreatedEvents = userCreatedEvents.map((event) => eventModelSerializer(event));

    console.log(serializedCreatedEvents);

    return (
        <div>
            <OrganizationPoster poster={poster} alt={name} />
            <OrganizationChangeForm />
            <Layout>
                <OrganizationInformation information={userInformation} />
                <OrganizationTabs tabs={tabs} setTabs={setTabs} />
                <div className={cls.tabElement}>
                    {tabs === 'my-events'
                        && (
                            <UserEvents
                                withDrawer={false}
                                events={serializedCreatedEvents}
                                notEventText="У организатора нет ивентов"
                            />
                        )}
                </div>
            </Layout>
        </div>
    );
};
