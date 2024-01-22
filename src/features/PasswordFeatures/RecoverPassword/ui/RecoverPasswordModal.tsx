import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCallback } from 'react';
import { IconButton, Loader, Modal } from 'rsuite';

import { Typography } from '@/shared/components/Typography';
import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';

import { RecoverPassword, RecoverPasswordEmail } from '../additionUI';
import cls from './RecoverPasswordModal.module.less';

export const RecoverPasswordModal = () => {
    const { authorizationSetStates, authorizationStates } = useAuthorization();
    const { setRecoverPasswordModalState, setRecoverPasswordState } = authorizationSetStates;
    const { recoverPasswordModalState, recoverPasswordState, authorizationLoading } = authorizationStates;

    const handleOpen = useCallback(() => {
        setRecoverPasswordModalState(true);
    }, [setRecoverPasswordModalState]);

    const handleClose = useCallback(() => {
        setRecoverPasswordModalState(false);
        setRecoverPasswordState('send-activation-code');
    }, [setRecoverPasswordModalState, setRecoverPasswordState]);

    return (
        <Modal
            keyboard
            open={recoverPasswordModalState}
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
                Восстановление пароля
                <IconButton onClick={handleClose} icon={<XMarkIcon className={cls.xMarkIcon} />} />
            </Typography>
            <div className={cls.inputs}>
                {recoverPasswordState === 'send-activation-code' ? <RecoverPasswordEmail /> : <RecoverPassword />}
            </div>
        </Modal>
    );
};
