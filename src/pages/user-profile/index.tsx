import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';
import { UserProfile } from '@/widgets/My-profile';

export default function UserHome() {
    const { authorizationStates, authorizationFunction } = useAuthorization();
    const { push } = useRouter();
    const { userState, isAuthorized, userLoading } = authorizationStates;
    const { getUserData } = authorizationFunction;

    useEffect(() => {
        if (userState === null && !isAuthorized && !userLoading) {
            push('/');
        }
    }, [isAuthorized, push, userLoading, userState]);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    return (
        <div>
            {userState && <UserProfile user={userState} />}
        </div>
    );
}
