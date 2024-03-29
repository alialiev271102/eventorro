import { Dispatch, SetStateAction } from 'react';

import { User } from '@/app/types/global';

export type authorizationType = 'sign-in' | 'sign-up'
export type resetPasswordState = 'send-activation-code' | 'recover-password'

export interface AuthorizationContextProps {
    userState: User | null;
    setUserState: Dispatch<SetStateAction<User | null>>
    isAuthorized: boolean;
    setIsAuthorized: Dispatch<SetStateAction<boolean>>;
    editUserModalState: boolean;
    setEditUserModalState: Dispatch<SetStateAction<boolean>>
    userLoading: boolean;
    setUserLoading: Dispatch<SetStateAction<boolean>>;
    authorizationLoading: boolean;
    setAuthorizationLoading: Dispatch<SetStateAction<boolean>>
    authorizationModalState: boolean;
    changeRoleLoading: boolean,
    changeRoleModalState: boolean,
    count:string,
    setCount:Dispatch<SetStateAction<string>>,
    ticketEventId: number,
    setTicketEventId: Dispatch<SetStateAction<number>>;
    ticketEventReg: boolean,
    setTicketEventReg: Dispatch<SetStateAction<boolean>>;
    ticketEventName: string,
    setTicketEventName: Dispatch<SetStateAction<string>>;
    getTicketLoading: boolean,
    getTicketModalState: boolean,
    setChangeRoleLoading: Dispatch<SetStateAction<boolean>>;
    setChangeRoleModalState: Dispatch<SetStateAction<boolean>>;
    setTicketLoading: Dispatch<SetStateAction<boolean>>;
    setTicketModalState: Dispatch<SetStateAction<boolean>>;
    setAuthorizationModalState: Dispatch<SetStateAction<boolean>>;
    recoverPasswordModalState: boolean;
    setRecoverPasswordModalState: Dispatch<SetStateAction<boolean>>;
    resetPasswordModalState: boolean;
    setResetPasswordModalState: Dispatch<SetStateAction<boolean>>;
    authorizationType: authorizationType;
    setAuthorizationType: Dispatch<SetStateAction<authorizationType>>;
    recoverPasswordState: resetPasswordState;
    setRecoverPasswordState: Dispatch<SetStateAction<resetPasswordState>>
}
