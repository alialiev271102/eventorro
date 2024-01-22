import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { User, UserFromBackend } from '@/app/types/global';
import { NotFound } from '@/entities/NotFound/ui/NotFound';
import cls from '@/pages/events/eventId.module.less';
import { axiosInstanceWithoutBearer } from '@/shared/lib/constants/axiosInstance';
import { axiosErrorHandler } from '@/shared/lib/helpers/axiosErrorHandler';
import { userModelSerializer } from '@/shared/lib/helpers/modelserializers';
import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';
import { OrganizationProfile } from '@/widgets/Profile';

export default function () {
    const { query, push } = useRouter();

    const { authorizationFunction } = useAuthorization();
    const { getUserData } = authorizationFunction;
    const [user, setUser] = useState<User| null>(null);
    const [userLoading, setUserLoading] = useState<boolean>(false);
    const [userNotFound, _setUserNotFound] = useState<boolean>(false);

    const email = typeof query.email === 'string'
    && query.email ? query.email : null;

    useEffect(() => {
        if (email) {
            setUserLoading(true);
            axiosInstanceWithoutBearer.get<UserFromBackend>(`/accounts/events_by/${email}/`)
                .then((response) => {
                    setUser(userModelSerializer(response.data));
                })
                .catch((error) => axiosErrorHandler(error))
                .finally(() => setUserLoading(false));
        }
    }, [email]);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    const onRouteBack = useCallback(() => {
        push('/');
    }, [push]);

    if (user === null && !userNotFound && !userLoading) {
        return (
            <NotFound
                onClickOnButton={onRouteBack}
                className={cls.notFound}
                svgClassName={cls.notFoundImage}
                text="К сожелению такого организатора нет"
                withBackButton
                textClassName={cls.notFoundText}
                buttonClassName={cls.notFoundButton}
            />
        );
    }

    return (
        <div>{user && <OrganizationProfile user={user} />}</div>
    );
}
