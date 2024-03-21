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
    const [getTicketModalState,setTicketModalState] = useState<boolean>(false);
    const [getTicketLoading,setTicketLoading] = useState<boolean>(false);
    const [count, setCount] = useState<string>('0')
    const [ticketEventId, setTicketEventId] = useState<number>(0)
    const [ticketEventReg, setTicketEventReg] = useState<boolean>(false)
    const [ticketEventName, setTicketEventName] = useState<string>(' ')

    const AuthorizationLoadingContextProps: AuthorizationContextProps = useMemo(() => ({
        ticketEventId,
        ticketEventReg,
        ticketEventName,
        setTicketEventId,
        setTicketEventReg,
        setTicketEventName,
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
        count,
        setCount,
        authorizationType,
        getTicketModalState,
        setTicketModalState,
        getTicketLoading,
        setTicketLoading,
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
        count,
        userState,
        getTicketModalState,
        getTicketLoading,
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
