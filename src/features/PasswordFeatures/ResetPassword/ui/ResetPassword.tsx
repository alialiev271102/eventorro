import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCallback } from 'react';
import { IconButton, Loader, Modal } from 'rsuite';

import { Typography } from '@/shared/components/Typography';
import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';

import { ResetPasswordForm } from '../additionUI';
import cls from './ResetPassword.module.less';

export const ResetPassword = () => {
    const { authorizationSetStates, authorizationStates } = useAuthorization();

    const { resetPasswordModalState, authorizationLoading } = authorizationStates;
    const { setResetPasswordModalState } = authorizationSetStates;

    const handleOpen = useCallback(() => {
        setResetPasswordModalState(true);
    }, [setResetPasswordModalState]);

    const handleClose = useCallback(() => {
        setResetPasswordModalState(false);
    }, [setResetPasswordModalState]);

    return (
        <Modal
            keyboard
            open={resetPasswordModalState}
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
                Сменить пароль
                <IconButton onClick={handleClose} icon={<XMarkIcon className={cls.xMarkIcon} />} />
            </Typography>
            <div className={cls.inputs}>
                <ResetPasswordForm />
            </div>

        </Modal>
    );
};
