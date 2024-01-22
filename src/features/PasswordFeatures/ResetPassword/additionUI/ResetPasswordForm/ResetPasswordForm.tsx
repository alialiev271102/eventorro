import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Stack } from 'rsuite';

import { inputStyle260px, inputStyle320px } from '@/features/Authorization/constants/InputStyles';
import { HookFormInput } from '@/shared/components/HookFormInput/ui/HookFormInput';
import { signUpPasswordSchema } from '@/shared/lib/constants/validation';
import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import { ResetPasswordFieldNames, ResetPasswordFields } from '../../model/ResetPassword.type';
import cls from '../additionUI.module.less';

export const ResetPasswordForm = () => {
    const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
    const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState<boolean>(false);

    const resetPasswordForm = useForm<ResetPasswordFields>({ mode: 'onBlur' });
    const { handleSubmit, formState: { errors }, setError } = resetPasswordForm;
    const { authorizationFunction } = useAuthorization();
    const { resetPassword } = authorizationFunction;

    const { mediaQueryMaxWidth400px } = useQueries();

    const inputStyles = mediaQueryMaxWidth400px ? inputStyle260px : inputStyle320px;
    const inputSize = mediaQueryMaxWidth400px ? 'md' : 'lg';

    const handleChangeNewPasswordVisible = useCallback(() => {
        setNewPasswordVisible((prevState) => !prevState);
    }, []);

    const handleChangeConfirmNewPasswordVisible = useCallback(() => {
        setConfirmNewPasswordVisible((prevState) => !prevState);
    }, []);

    const resetPasswordHandle = async (resetPasswordFields: ResetPasswordFields) : Promise<void> => {
        const { newPassword, confirmNewPassword } = resetPasswordFields;

        if (newPassword === confirmNewPassword) {
            await resetPassword(newPassword, confirmNewPassword);
        } else {
            setError(ResetPasswordFieldNames.CONFIRM_NEW_PASSWORD, { message: 'Пароли не совпадают' });
        }
    };

    return (
        <FormProvider {...resetPasswordForm}>
            <form onSubmit={handleSubmit(resetPasswordHandle)}>
                <Stack direction="column" spacing={10} alignItems="center">
                    <HookFormInput
                        name={ResetPasswordFieldNames.NEW_PASSWORD}
                        placeholder="Ведите новый пароль"
                        style={inputStyles}
                        inputSize={inputSize}
                        className={cls.inputBlock}
                        isError={errors[ResetPasswordFieldNames.NEW_PASSWORD] && true}
                        validationSchema={signUpPasswordSchema}
                        errorMessage={errors[ResetPasswordFieldNames.NEW_PASSWORD]?.message}
                        onClickEndIcon={handleChangeNewPasswordVisible}
                        type={newPasswordVisible ? 'text' : 'password'}
                        endIcon={newPasswordVisible ? EyeIcon : EyeSlashIcon}
                    />
                    <HookFormInput
                        name={ResetPasswordFieldNames.CONFIRM_NEW_PASSWORD}
                        placeholder="Подтвердите новый пароль"
                        style={inputStyles}
                        inputSize={inputSize}
                        className={cls.inputBlock}
                        isError={errors[ResetPasswordFieldNames.CONFIRM_NEW_PASSWORD] && true}
                        validationSchema={signUpPasswordSchema}
                        errorMessage={errors[ResetPasswordFieldNames.CONFIRM_NEW_PASSWORD]?.message}
                        onClickEndIcon={handleChangeConfirmNewPasswordVisible}
                        type={confirmNewPasswordVisible ? 'text' : 'password'}
                        endIcon={confirmNewPasswordVisible ? EyeIcon : EyeSlashIcon}
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
