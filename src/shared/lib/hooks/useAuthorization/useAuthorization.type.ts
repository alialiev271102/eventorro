import { Dispatch, SetStateAction } from 'react';

import { User } from '@/app/types/global';
import {
    authorizationType,
    resetPasswordState,
} from '@/shared/Providers/AuthorizationProvider/model/AuthorizationContext.type';

export interface loginProps {
    email: string;
    password: string;
}

export interface registerProps {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    organizationName: string;
    role: 'host' | 'user'
}

export interface activationCodeProps {
    activationCode: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface editUserProps {
    poster: File | null;
    avatar: File | null;
    name: string;
    last_name: string;
    organization_name: string;
    bio: string;
    phone: string;
}

export interface useAuthorizationReturn {
    authorizationFunction: {
        logout: () => void;
        sendActivationCode: (email: string) => Promise<void>;
        recoverPassword: (activateCodeFields: activationCodeProps) => Promise<void>;
        resetPassword: (newPassword: string, confirmNewPassword: string) => Promise<void>;
        register: (registerFields: registerProps) => Promise<void>;
        login: (loginFields: loginProps) => Promise<void>;
        checkAuthorization: () => Promise<void>;
        getUserData: () => Promise<void>;
        editUser: (data: Partial<editUserProps>) => Promise<void>
    };
    authorizationStates: {
        userState: User | null;
        isAuthorized: boolean;
        recoverPasswordModalState: boolean,
        resetPasswordModalState: boolean,
        editUserModalState: boolean;
        authorizationModalState: boolean,
        changeRoleLoading: boolean,
        changeRoleModalState: boolean,
        userLoading: boolean,
        authorizationLoading: boolean,
        authorizationType: authorizationType,
        recoverPasswordState: resetPasswordState,
    };
    authorizationSetStates: {
        setEditUserModalState: Dispatch<SetStateAction<boolean>>
        setIsAuthorized: Dispatch<SetStateAction<boolean>>
        setUserLoading: Dispatch<SetStateAction<boolean>>;
        setAuthorizationLoading: Dispatch<SetStateAction<boolean>>
        setAuthorizationModalState: Dispatch<SetStateAction<boolean>>;
        setChangeRoleLoading: Dispatch<SetStateAction<boolean>>;
        setChangeRoleModalState: Dispatch<SetStateAction<boolean>>;
        setRecoverPasswordModalState: Dispatch<SetStateAction<boolean>>;
        setResetPasswordModalState: Dispatch<SetStateAction<boolean>>;
        setAuthorizationType: Dispatch<SetStateAction<authorizationType>>;
        setRecoverPasswordState: Dispatch<SetStateAction<resetPasswordState>>
    }
}
