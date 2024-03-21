import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Stack } from 'rsuite';

import { inputStyle260px, inputStyle320px } from '@/features/Authorization/constants/InputStyles';
import { HookFormInput } from '@/shared/components/HookFormInput/ui/HookFormInput';
import {
    activationCodeForForgetPasswordSchema,
    signUpPasswordSchema,
} from '@/shared/lib/constants/validation';
import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import { RecoverPasswordFieldNames, RecoverPasswordFields } from '../../model/RecoverPassword.type';
import cls from '../additionUI.module.less';

export const RecoverPassword = () => {
    const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
    const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState<boolean>(false);

    const sendActivationCodeForm = useForm<RecoverPasswordFields>({ mode: 'onBlur' });

    const { mediaQueryMaxWidth400px } = useQueries();

    const { authorizationFunction } = useAuthorization();
    const { recoverPassword } = authorizationFunction;

    const { handleSubmit, formState: { errors } } = sendActivationCodeForm;

    const inputStyles = mediaQueryMaxWidth400px ? inputStyle260px : inputStyle320px;
    const inputSize = mediaQueryMaxWidth400px ? 'md' : 'lg';

    const recoverPasswordHandler = async (data: RecoverPasswordFields) => {
        await recoverPassword(data);
    };

    const handleChangeNewPasswordVisible = useCallback(() => {
        setNewPasswordVisible((prevState) => !prevState);
    }, []);

    const handleChangeConfirmNewPasswordVisible = useCallback(() => {
        setConfirmNewPasswordVisible((prevState) => !prevState);
    }, []);

    return (
        <FormProvider {...sendActivationCodeForm}>
            <form onSubmit={handleSubmit(recoverPasswordHandler)}>
                <Stack direction="column" spacing={10} alignItems="center">
                    <HookFormInput
                        name={RecoverPasswordFieldNames.ACTIVATION_CODE}
                        placeholder="Ведите код активации"
                        style={inputStyles}
                        inputMode="numeric"
                        inputSize={inputSize}
                        isError={errors[RecoverPasswordFieldNames.ACTIVATION_CODE]! && true}
                        validationSchema={activationCodeForForgetPasswordSchema}
                        errorMessage={errors[RecoverPasswordFieldNames.ACTIVATION_CODE]?.message as string}
                        autoComplete="off"
                    />
                    <HookFormInput
                        name={RecoverPasswordFieldNames.NEW_PASSWORD}
                        placeholder="Ведите новый пароль"
                        style={inputStyles}
                        inputSize={inputSize}
                        isError={errors[RecoverPasswordFieldNames.NEW_PASSWORD]! && true}
                        validationSchema={signUpPasswordSchema}
                        onClickEndIcon={handleChangeNewPasswordVisible}
                        type={newPasswordVisible ? 'text' : 'password'}
                        endIcon={newPasswordVisible ? EyeIcon : EyeSlashIcon}
                        errorMessage={errors[RecoverPasswordFieldNames.NEW_PASSWORD]?.message as string}
                    />
                    <HookFormInput
                        name={RecoverPasswordFieldNames.CONFIRM_NEW_PASSWORD}
                        placeholder="Подтвердите новый пароль"
                        style={inputStyles}
                        inputSize={inputSize}
                        onClickEndIcon={handleChangeConfirmNewPasswordVisible}
                        type={confirmNewPasswordVisible ? 'text' : 'password'}
                        endIcon={confirmNewPasswordVisible ? EyeIcon : EyeSlashIcon}
                        isError={errors[RecoverPasswordFieldNames.CONFIRM_NEW_PASSWORD]! && true}
                        validationSchema={signUpPasswordSchema}
                        errorMessage={errors[RecoverPasswordFieldNames.CONFIRM_NEW_PASSWORD]?.message as string}
                    />
                    <Button
                        style={inputStyles}
                        className={cls.submitButton}
                        block
                        type="submit"
                        appearance="ghost"
                        size={mediaQueryMaxWidth400px ? 'sm' : 'md'}
                    >
                        Сменить пароль
                    </Button>
                </Stack>
            </form>
        </FormProvider>
    );
};
