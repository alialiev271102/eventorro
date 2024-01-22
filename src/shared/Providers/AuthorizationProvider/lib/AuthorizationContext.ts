import { createContext } from 'react';

import { AuthorizationContextProps } from '../model/AuthorizationContext.type';

export const AuthorizationContext = createContext<AuthorizationContextProps>({
    userState: null,
    setUserState: () => {},
    userLoading: false,
    setUserLoading: () => {},
    editUserModalState: false,
    setEditUserModalState: () => {},
    authorizationLoading: false,
    setAuthorizationLoading: () => {},
    authorizationModalState: false,
    setAuthorizationModalState: () => {},
    changeRoleModalState: false,
    setChangeRoleModalState: () => {},
    changeRoleLoading: false,
    setChangeRoleLoading: () => {},
    resetPasswordModalState: false,
    setResetPasswordModalState: () => {},
    recoverPasswordModalState: false,
    setRecoverPasswordModalState: () => {},
    isAuthorized: false,
    setIsAuthorized: () => {},
    authorizationType: 'sign-in',
    setAuthorizationType: () => {},
    recoverPasswordState: 'send-activation-code',
    setRecoverPasswordState: () => {},
});
