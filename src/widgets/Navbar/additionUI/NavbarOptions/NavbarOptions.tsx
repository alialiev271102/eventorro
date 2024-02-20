import {
    ArrowLeftOnRectangleIcon, BuildingOfficeIcon,
    Cog6ToothIcon,
    IdentificationIcon,
    LockClosedIcon,
    PencilIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import {useRouter} from 'next/router';
import React, {useCallback} from 'react';
import {toast} from 'react-toastify';
import {Button, Dropdown, InputPicker, Stack} from 'rsuite';

import {Authorization} from '@/features/Authorization';
import {RecoverPasswordModal} from '@/features/PasswordFeatures/RecoverPassword';
import {ResetPassword} from '@/features/PasswordFeatures/ResetPassword';
import {useAuthorization} from '@/shared/lib/hooks/useAuthorization/useAuthorization';
import {useQueries} from '@/shared/lib/hooks/useMediaQuery';

import cls from '../additionUI.module.less';
import {ChangeRole} from "@/features/ChangeRole";
import {useEvent} from "@/shared/lib/hooks/useEvent";
import {useFilter} from "@/shared/lib/hooks/useFilter/useFilter";

export const NavbarOptions = () => {
    const {mediaQueryMaxWidth768px} = useQueries();
    const { filterStates, filterSetStates } = useFilter();
    const {events} = filterStates;

    const {
        citys, city, filterLoading,
    } = filterStates;
    const {setCity} = filterSetStates;

    const {authorizationSetStates, authorizationStates, authorizationFunction} = useAuthorization();
    const {push, pathname} = useRouter();



    const {
        setAuthorizationModalState,
        setResetPasswordModalState,
        setEditUserModalState,
        setChangeRoleLoading,
        setChangeRoleModalState,
        setAuthorizationLoading,
    } = authorizationSetStates;
    // const [ changeRoleModalState, setChangeRoleModalState] = useState();
    const {userState} = authorizationStates;
    const {logout} = authorizationFunction;

    const onCreateEventHandler = useCallback(async () => {
        if (userState) {
            if (userState.userInformation.isHost) {
                await push('/my-profile');
            } else {
                setChangeRoleLoading(false)
                setChangeRoleModalState(true);
            }
        } else {
            toast.error('Для начала войдите в аккаунт', {
                autoClose: 1500
            });
        }
    }, [push, setChangeRoleLoading, setChangeRoleModalState, userState]);

    const onAccountHandler = useCallback(async (): Promise<void> => {
        if (userState !== null) {
            if (userState.userInformation.isHost) {
                await push('/my-profile');
            } else {
                await push('/user-profile');
            }
        } else {
            setAuthorizationLoading(false);
            setAuthorizationModalState(true);
        }
    }, [push, setAuthorizationLoading, setAuthorizationModalState, userState]);

    const onChangePasswordHandler = useCallback(() => {
        setResetPasswordModalState(true);
    }, [setResetPasswordModalState]);

    const onEditUserHandler = useCallback(() => {
        setEditUserModalState(true);
    }, [setEditUserModalState]);

    const onLogoutHandler = useCallback(async () => {
        logout();
        await push('/');
    }, [logout, push]);

    if (mediaQueryMaxWidth768px && pathname === '/') {
        return (
            <div>
                <Dropdown
                    title="Меню"
                    appearance="primary"
                    placement="bottomEnd"
                    noCaret
                    size="md"
                >
                    <Dropdown.Item
                        icon={<IdentificationIcon width={18} height={18}/>}
                        onClick={onAccountHandler}
                        className={cls.dropDownItem}
                    >
                        {userState !== null ? 'Профиль' : 'Войти'}
                    </Dropdown.Item>
                    <Dropdown.Item
                        className={cls.dropDownItem}
                        icon={<PlusIcon width={18} height={18}/>}
                        onClick={onCreateEventHandler}
                    >
                        {userState?.userInformation.isHost ? "Создать событие" : userState?.userInformation.isHost === false ? "Регистрация как Организатор" : "Создать событие"}
                    </Dropdown.Item>
                    {pathname === '/' ?<InputPicker
                        style={{width: 228}}
                        onChange={setCity}
                        value={city}
                        data={citys}
                        disabled={filterLoading}
                        placeholder={filterLoading ? 'Загрузка...' : 'Выберите город'}
                    />:''}
                </Dropdown>
                <Authorization/>
                <ChangeRole/>
                <RecoverPasswordModal/>
                <ResetPassword/>
            </div>
        );
    }

    return (
        <div>
            <Stack spacing={5}>
                {   pathname === '/'?
                    <InputPicker
                    style={{width: 228}}
                    onChange={setCity}
                    value={city}
                    data={citys}
                    disabled={filterLoading}
                    placeholder={filterLoading ? 'Загрузка...' : 'Выберите город'}
                />:''}
                {
                    pathname === '/' && (
                        <Button
                            appearance="primary"
                            size={mediaQueryMaxWidth768px ? 'xs' : 'md'}
                            className={cls.dropDownItem}
                            startIcon={<PlusIcon width={18} height={18} />}
                            onClick={onCreateEventHandler}
                        >
                            {userState?.userInformation.isHost ? "Создать событие" : userState?.userInformation.isHost === false ? "Регистрация как Организатор" : "Создать событие"}
                        </Button>
                    )
                }
                {
                    (pathname === '/my-profile' || pathname === '/user-profile') ? (
                        <Dropdown
                            icon={<Cog6ToothIcon className={cls.cogIcon} width={22} height={22}/>}
                            title=""
                            appearance="primary"
                            placement="bottomEnd"
                            className={cls.profileSettings}
                            noCaret
                            size="md"
                        >
                            <div onClick={onEditUserHandler}>
                                <Dropdown.Item
                                    icon={<PencilIcon width={18} height={18}/>}
                                    onClick={onAccountHandler}
                                    className={cls.dropDownItem}
                                >
                                    Настроить аккаунт
                                </Dropdown.Item>
                            </div>
                            {userState?.userInformation.isHost ? "" :
                                <Dropdown.Item
                                    className={cls.dropDownItem}
                                    icon={<PlusIcon width={18} height={18}/>}
                                    onClick={onCreateEventHandler}
                                >
                                    Регистрация как Организатор
                                </Dropdown.Item>}
                            <div onClick={onChangePasswordHandler}>
                                <Dropdown.Item
                                    icon={<LockClosedIcon width={18} height={18}/>}
                                    onClick={onAccountHandler}
                                    className={cls.dropDownItem}
                                    onSelect={onChangePasswordHandler}
                                >
                                    Изменить пароль
                                </Dropdown.Item>
                            </div>
                            <div onClick={onLogoutHandler}>
                                <Dropdown.Item
                                    icon={<ArrowLeftOnRectangleIcon width={18} height={18}/>}
                                    onClick={onAccountHandler}
                                    className={cls.dropDownItem}
                                >
                                    Выйти
                                </Dropdown.Item>
                            </div>
                        </Dropdown>
                    ) : (
                        <Button
                            onClick={onAccountHandler}
                            appearance="primary"
                            startIcon={<IdentificationIcon width={20} height={20}/>}
                            size={mediaQueryMaxWidth768px ? 'xs' : 'md'}
                        >
                            {userState !== null ? 'Профиль' : 'Войти'}
                        </Button>
                    )
                }
            </Stack>
            <Authorization/>
            <ChangeRole/>
            <RecoverPasswordModal/>
            <ResetPassword/>
        </div>
    );
};
