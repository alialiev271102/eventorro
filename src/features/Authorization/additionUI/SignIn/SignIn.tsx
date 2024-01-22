import {
    AtSymbolIcon, EyeIcon, EyeSlashIcon, LockClosedIcon,
} from '@heroicons/react/24/outline';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Stack } from 'rsuite';

import { HookFormInput } from '@/shared/components/HookFormInput/ui/HookFormInput';
import { emailSchema, signInPasswordSchema } from '@/shared/lib/constants/validation';
import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import { inputStyle260px, inputStyle320px } from '../../constants/InputStyles';
import { SignInFields, SignInFieldsNames } from '../../model/Authorization.type';
import cls from '../AdditionUI.module.less';

export const SignIn = () => {
    const { authorizationFunction, authorizationSetStates } = useAuthorization();

    const { login } = authorizationFunction;
    const { setAuthorizationModalState, setRecoverPasswordModalState } = authorizationSetStates;

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const { mediaQueryMaxWidth400px } = useQueries();

    const signInForm = useForm<SignInFields>({ mode: 'onBlur' });

    const { handleSubmit, formState: { errors } } = signInForm;

    const inputStyles = mediaQueryMaxWidth400px ? inputStyle260px : inputStyle320px;
    const inputSize = mediaQueryMaxWidth400px ? 'md' : 'lg';

    const onClickForgetPasswordHandler = () => {
        setAuthorizationModalState(false);
        setRecoverPasswordModalState(true);
    };

    const loginHandle = async (fieldData: SignInFields): Promise<void> => {
        await login(fieldData);
    };

    const handleChangePasswordVisible = useCallback(() => {
        setPasswordVisible((prevState) => !prevState);
    }, []);

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormProvider {...signInForm}>
            <form onSubmit={handleSubmit(loginHandle)}>
                <Stack direction="column" spacing={10} alignItems="flex-start">
                    <HookFormInput
                        placeholder="Почта *"
                        name={SignInFieldsNames.EMAIL}
                        inputMode="email"
                        style={inputStyles}
                        startIcon={AtSymbolIcon}
                        inputSize={inputSize}
                        className={cls.inputBlock}
                        isError={errors[SignInFieldsNames.EMAIL] && true}
                        validationSchema={emailSchema}
                        errorMessage={errors[SignInFieldsNames.EMAIL]?.message}
                    />
                    <HookFormInput
                        placeholder="Пароль *"
                        name={SignInFieldsNames.PASSWORD}
                        style={inputStyles}
                        startIcon={LockClosedIcon}
                        inputSize={inputSize}
                        className={cls.inputBlock}
                        onClickEndIcon={handleChangePasswordVisible}
                        type={passwordVisible ? 'text' : 'password'}
                        endIcon={passwordVisible ? EyeIcon : EyeSlashIcon}
                        validationSchema={signInPasswordSchema}
                        isError={errors[SignInFieldsNames.PASSWORD] && true}
                        errorMessage={errors[SignInFieldsNames.PASSWORD]?.message}
                    />
                    <Button
                        appearance="link"
                        className={cls.forgetPasswordButton}
                        onClick={onClickForgetPasswordHandler}
                    >
                        Забыли пароль?
                    </Button>
                    <Button
                        style={inputStyles}
                        className={cls.submitButton}
                        block
                        type="submit"
                        appearance="ghost"
                        size={mediaQueryMaxWidth400px ? 'sm' : 'md'}
                    >
                        Вход
                    </Button>
                </Stack>
            </form>
        </FormProvider>
    );
};
