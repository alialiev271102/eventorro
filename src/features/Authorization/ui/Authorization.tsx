import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCallback } from 'react';
import { IconButton, Loader, Modal } from 'rsuite';

import { Typography } from '@/shared/components/Typography';
import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';

import { AuthorizationType, SignIn, SignUp } from '../additionUI';
import cls from './Authorization.module.less';

export const Authorization = () => {
    const { authorizationSetStates, authorizationStates } = useAuthorization();

    const {
        authorizationModalState, authorizationType, authorizationLoading, userState,
    } = authorizationStates;
    const { setAuthorizationModalState } = authorizationSetStates;

    const handleClose = useCallback(() => {
        setAuthorizationModalState(false);
    }, [setAuthorizationModalState]);

    const handleOpen = useCallback(() => {
        setAuthorizationModalState(true);
    }, [setAuthorizationModalState]);

    if (userState !== null) {
        return null;
    }

    return (
        <Modal
            keyboard
            open={authorizationModalState}
            onClose={handleClose}
            onOpen={handleOpen}
            size="xs"
            dialogClassName={cls.modalDialog}
            className={cls.modal}
            style={authorizationLoading ? { pointerEvents: 'none' } : {}}
        >
            {authorizationLoading
                && <Loader backdrop content="Загрузка..." size="md" vertical inverse className={cls.loader} />}
            <Typography tag="h3" variant="title-3" className={cls.title}>
                {authorizationType === 'sign-in' ? 'Вход' : 'Регистрация'}
                <IconButton onClick={handleClose} icon={<XMarkIcon className={cls.xMarkIcon} />} />
            </Typography>
            <AuthorizationType className={cls.authorizationType} />
            {authorizationType === 'sign-in' ? <SignIn /> : <SignUp />}
        </Modal>
    );
};
