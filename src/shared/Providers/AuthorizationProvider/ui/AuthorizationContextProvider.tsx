import {
    FC,
    ReactNode, useMemo, useState,
} from 'react';

import { User } from '@/app/types/global';

import { AuthorizationContext } from '../lib/AuthorizationContext';
import { AuthorizationContextProps, authorizationType, resetPasswordState } from '../model/AuthorizationContext.type';

interface AuthorizationContextProviderProps {
    children: ReactNode;
}

export const AuthorizationContextProvider: FC<AuthorizationContextProviderProps> = (props) => {
    const { children } = props;

    const [userLoading, setUserLoading] = useState<boolean>(false);
    const [authorizationLoading, setAuthorizationLoading] = useState<boolean>(false);
    const [userState, setUserState] = useState<User | null>(null);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [authorizationModalState, setAuthorizationModalState] = useState<boolean>(false);
    const [changeRoleModalState, setChangeRoleModalState] = useState<boolean>(false);
    const [authorizationType, setAuthorizationType] = useState<authorizationType>('sign-in');
    const [recoverPasswordModalState, setRecoverPasswordModalState] = useState<boolean>(false);
    const [recoverPasswordState, setRecoverPasswordState] = useState<resetPasswordState>('send-activation-code');
    const [resetPasswordModalState, setResetPasswordModalState] = useState<boolean>(false);
    const [editUserModalState, setEditUserModalState] = useState<boolean>(false);
    const [changeRoleLoading,setChangeRoleLoading] = useState<boolean>(false);

    const AuthorizationLoadingContextProps: AuthorizationContextProps = useMemo(() => ({
        userState,
        setUserState,
        isAuthorized,
        setIsAuthorized,
        editUserModalState,
        setEditUserModalState,
        authorizationModalState,
        setAuthorizationModalState,
        recoverPasswordModalState,
        setRecoverPasswordModalState,
        resetPasswordModalState,
        setResetPasswordModalState,
        authorizationType,
        changeRoleModalState,
        setChangeRoleModalState,
        changeRoleLoading,
        setChangeRoleLoading,
        setAuthorizationType,
        recoverPasswordState,
        setRecoverPasswordState,
        authorizationLoading,
        setAuthorizationLoading,
        userLoading,
        setUserLoading,
    }), [
        userState,
        changeRoleModalState,
        changeRoleLoading,
        isAuthorized,
        authorizationModalState,
        recoverPasswordModalState,
        resetPasswordModalState,
        authorizationType,
        recoverPasswordState,
        authorizationLoading,
        editUserModalState,
        userLoading,
    ]);

    return (
        <AuthorizationContext.Provider value={AuthorizationLoadingContextProps}>
            {children}
        </AuthorizationContext.Provider>
    );
};
