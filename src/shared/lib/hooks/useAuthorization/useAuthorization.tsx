import {Dispatch, SetStateAction, useCallback, useContext} from 'react';
import { toast } from 'react-toastify';

import { User, UserFromBackend } from '@/app/types/global';
import { axiosInstanceWithBearer, axiosInstanceWithoutBearer } from '@/shared/lib/constants/axiosInstance';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_DATA_KEY } from '@/shared/lib/constants/localStorageKeys';
import { axiosErrorHandler } from '@/shared/lib/helpers/axiosErrorHandler';
import { userModelSerializer } from '@/shared/lib/helpers/modelserializers';
import { AuthorizationContext } from '@/shared/Providers/AuthorizationProvider';

import {
    activationCodeProps, editUserProps, loginProps, registerProps, useAuthorizationReturn,
} from './useAuthorization.type';

export const useAuthorization = (): useAuthorizationReturn => {
    const {
        setIsAuthorized,
        isAuthorized,
        setAuthorizationModalState,
        recoverPasswordState,
        resetPasswordModalState,
        authorizationModalState,
        setChangeRoleLoading,
        setChangeRoleModalState,
        setResetPasswordModalState,
        setUserState,
        getTicketModalState,
        getTicketLoading,
        setTicketModalState,
        setTicketLoading,
        changeRoleModalState,
        changeRoleLoading,
        setAuthorizationType,
        recoverPasswordModalState,
        authorizationType,
        setRecoverPasswordState,
        setRecoverPasswordModalState,
        authorizationLoading,
        setAuthorizationLoading,
        userLoading,
        setUserLoading,
        userState,
        editUserModalState,
        setEditUserModalState,
        count,
        setCount,
        ticketEventId,
        ticketEventReg,
        ticketEventName,
        setTicketEventId,
        setTicketEventReg,
        setTicketEventName,
    } = useContext(AuthorizationContext);

    const logout = (): void => {
        localStorage.removeItem(USER_DATA_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        setIsAuthorized(false);
        setUserState(null);
        setAuthorizationLoading(false);
        toast.success('Вы успешно вышли из акаунта', {
            autoClose: 1500
        });
    };

    const sendActivationCode = async (email: string): Promise<void> => {
        setAuthorizationLoading(true);
        await axiosInstanceWithoutBearer.post('/accounts/reset_password/', { email })
            .then(() => {
                setRecoverPasswordState('recover-password');
                toast.success('На вашу почту был отправлен код акстивации', {
                    autoClose: 1500
                });
            })
            .catch((error) => axiosErrorHandler(error))
            .finally(() => setAuthorizationLoading(false));
    };

    const recoverPassword = async (activateCodeFields: activationCodeProps): Promise<void> => {
        setAuthorizationLoading(true);
        const { activationCode, confirmNewPassword, newPassword } = activateCodeFields;
        await axiosInstanceWithoutBearer.post('/accounts/reset_password_complete/', {
            activation_code: activationCode,
            password: newPassword,
            password_confirm: confirmNewPassword,
        })
            .then(() => {
                setRecoverPasswordModalState(false);
                setRecoverPasswordState('send-activation-code');
                toast.success('Пароль успешно восстановлен', {
                    autoClose: 1500
                });
                setAuthorizationModalState(true);
                setAuthorizationType('sign-in');
            })
            .catch((error) => axiosErrorHandler(error))
            .finally(() => setAuthorizationLoading(false));
    };

    const resetPassword = async (newPassword: string, confirmNewPassword: string): Promise<void> => {
        setAuthorizationLoading(true);
        await axiosInstanceWithBearer.patch('/accounts/change_password/', {
            password: newPassword,
            password_confirm: confirmNewPassword,
        }).then(() => {
            toast.success('Пароль успешно обновлен', {
                autoClose: 1500
            });
            setResetPasswordModalState(false);
        }).finally(() => setAuthorizationLoading(false));
    };

    const register = async (registerFields: registerProps): Promise<void> => {
        const {
            role, name, lastName, password, email, confirmPassword, organizationName,phone,
        } = registerFields;
        setAuthorizationLoading(true);
        await axiosInstanceWithoutBearer.post<UserFromBackend>('accounts/register/', {
            email,
            password,
            password_confirm: confirmPassword,
            name,
            phone,
            last_name: lastName,
            is_guest: role === 'user',
            is_host: role !== 'user',
            organization_name: organizationName,
        }).then(() => {
            toast.success('Вы успешно зарегистрировались потвердите почту', {
                autoClose: 1500
            });
            setAuthorizationType('sign-in');
        }).catch((error) => axiosErrorHandler(error))
            .finally(() => setAuthorizationLoading(false));
    };

    const login = async (loginFields: loginProps): Promise<void> => {
        setAuthorizationLoading(true);
        await axiosInstanceWithoutBearer.post<UserFromBackend>('/accounts/login/', loginFields)
            .then((response) => {
                const serializedUser = userModelSerializer(response.data);
                setUserState(serializedUser);
                setIsAuthorized(true);
                localStorage.setItem(USER_DATA_KEY, JSON.stringify(serializedUser));
                localStorage.setItem(REFRESH_TOKEN_KEY, serializedUser.userTokens.refresh);
                localStorage.setItem(ACCESS_TOKEN_KEY, serializedUser.userTokens.access);
                toast.success('Вы успешно вошли', {
                    autoClose: 1500
                });
                setAuthorizationModalState(false);
            })
            .catch((error) => axiosErrorHandler(error))
            .finally(() => setAuthorizationLoading(false));
    };

    const editUser = useCallback(async (data: Partial<editUserProps>) => {
        await axiosInstanceWithBearer.put<UserFromBackend>('/accounts/profile/', data)
            .then((response) => {
                setUserState(userModelSerializer(response.data));
                toast.success('Вы успешно изменили данные', {
                    autoClose: 1500
                });
            })
            .catch((error) => axiosErrorHandler(error))
            .finally(() => setUserLoading(false));
    }, [setUserLoading, setUserState]);

    const checkAuthorization = async (): Promise<void> => {
        if (!userState) {
            setUserLoading(true);
            const userJsonFromLS = localStorage.getItem(USER_DATA_KEY);
            if (userJsonFromLS) {
                const userFromLocalStorage: User = JSON.parse(userJsonFromLS);
                if (userFromLocalStorage.userTokens.refresh && userFromLocalStorage.userTokens.access) {
                    setUserState(userFromLocalStorage);
                    setUserLoading(false);
                    await axiosInstanceWithBearer
                        .get<UserFromBackend>('/accounts/profile/')
                        .then((response) => {
                            const dataWithTokes: User = {
                                ...userModelSerializer(response.data),
                                userTokens: {
                                    access: userFromLocalStorage.userTokens.access,
                                    refresh: userFromLocalStorage.userTokens.refresh,
                                },
                            };

                            setUserState(dataWithTokes);
                            setIsAuthorized(true);
                            localStorage.setItem(USER_DATA_KEY, JSON.stringify(dataWithTokes));
                            localStorage.setItem(ACCESS_TOKEN_KEY, userFromLocalStorage.userTokens.access);
                            localStorage.setItem(REFRESH_TOKEN_KEY, userFromLocalStorage.userTokens.refresh);
                        }).finally(() => setUserLoading(false));
                } else {
                    setUserLoading(false);
                    setIsAuthorized(false);
                    localStorage.removeItem(USER_DATA_KEY);
                    localStorage.removeItem(ACCESS_TOKEN_KEY);
                    localStorage.removeItem(REFRESH_TOKEN_KEY);
                }
            } else {
                setUserLoading(false);
                setIsAuthorized(false);
                localStorage.removeItem(USER_DATA_KEY);
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                localStorage.removeItem(REFRESH_TOKEN_KEY);
            }
            setUserLoading(false);
        }
    };

    const getUserData = useCallback(async (): Promise<void> => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        setUserLoading(true);
        if (accessToken && refreshToken) {
            await axiosInstanceWithBearer
                .get<UserFromBackend>('/accounts/profile/')
                .then((response) => {
                    const dataWithTokes: User = {
                        ...userModelSerializer(response.data),
                        userTokens: {
                            access: accessToken,
                            refresh: refreshToken,
                        },
                    };
                    setUserState(dataWithTokes);
                    setIsAuthorized(true);
                    localStorage.setItem(USER_DATA_KEY, JSON.stringify(dataWithTokes));
                    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
                    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
                }).finally(() => setUserLoading(false));
        } else {
            setIsAuthorized(false);
            setUserState(null);
            localStorage.removeItem(USER_DATA_KEY);
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
        }
    }, [setIsAuthorized, setUserLoading, setUserState]);

    return {
        authorizationFunction: {
            editUser,
            checkAuthorization,
            login,
            resetPassword,
            logout,
            sendActivationCode,
            recoverPassword,
            register,
            getUserData,
        },
        authorizationSetStates: {
            setCount,
            setTicketEventId,
            setTicketEventReg,
            setTicketEventName,
            setTicketModalState,
            setTicketLoading,
            setIsAuthorized,
            setRecoverPasswordModalState,
            setResetPasswordModalState,
            setAuthorizationModalState,
            setAuthorizationLoading,
            setUserLoading,
            setChangeRoleModalState,
            setChangeRoleLoading,
            setAuthorizationType,
            setRecoverPasswordState,
            setEditUserModalState,
        },
        authorizationStates: {
            count,
            ticketEventId,
            ticketEventReg,
            ticketEventName,
            changeRoleLoading,
            changeRoleModalState,
            getTicketModalState,
            getTicketLoading,
            editUserModalState,
            userState,
            isAuthorized,
            recoverPasswordModalState,
            resetPasswordModalState,
            authorizationModalState,
            userLoading,
            authorizationLoading,
            authorizationType,
            recoverPasswordState,
        },
    };
};
