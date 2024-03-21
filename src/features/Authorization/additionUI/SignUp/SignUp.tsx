import {
    AtSymbolIcon, BuildingOffice2Icon, EyeIcon, EyeSlashIcon, LockClosedIcon, PhoneIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import React, { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, InputPicker, Stack } from 'rsuite';

import { HookFormInput } from '@/shared/components/HookFormInput/ui/HookFormInput';
import { Typography } from '@/shared/components/Typography';
import {
    emailSchema, nicknameSchema, organizationSchema, phoneSchema, signUpPasswordSchema,
} from '@/shared/lib/constants/validation';
import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import { inputStyle260px, inputStyle320px } from '../../constants/InputStyles';
import { UserTypes } from '../../constants/UserTypes';
import { SignUpFields, SignUpFieldsNames } from '../../model/Authorization.type';
import cls from '../AdditionUI.module.less';

export const SignUp = () => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
    const [signUpType, setSignUpType] = useState<'user' | 'host' | null>(null);

    const { mediaQueryMaxWidth400px } = useQueries();

    const { authorizationFunction } = useAuthorization();
    const { register } = authorizationFunction;

    const signUpForm = useForm<SignUpFields>({ mode: 'onBlur' });

    const { handleSubmit, setError, formState: { errors } } = signUpForm;

    const inputStyles = mediaQueryMaxWidth400px ? inputStyle260px : inputStyle320px;
    const inputSize = mediaQueryMaxWidth400px ? 'md' : 'lg';

    const registerHandle = async (fieldData: SignUpFields): Promise<void> => {
        if (fieldData.password === fieldData.confirmPassword) {
            await register({
                ...fieldData,
                role: signUpType || 'user',
            });
        } else {
            setError(SignUpFieldsNames.CONFIRM_PASSWORD, { message: 'Пароли не совподают' });
        }
    };

    const handleChangePasswordVisible = useCallback(() => {
        setPasswordVisible((prevState) => !prevState);
    }, []);

    const handleChangeConfirmPasswordVisible = useCallback(() => {
        setConfirmPasswordVisible((prevState) => !prevState);
    }, []);

    return (
        <FormProvider {...signUpForm}>
            <form onSubmit={handleSubmit(registerHandle)}>
                <Stack direction="column" spacing={10} alignItems="center">
                    <InputPicker
                        style={inputStyles}
                        data={UserTypes}
                        placeholder="Организатор / Гость    *"
                        size={inputSize}
                        value={signUpType}
                        onChange={setSignUpType}
                    />
                    <HookFormInput
                        placeholder="Имя *"
                        name={SignUpFieldsNames.NAME}
                        style={inputStyles}
                        startIcon={UserIcon}
                        inputSize={inputSize}
                        isError={errors[SignUpFieldsNames.NAME]! && true}
                        validationSchema={nicknameSchema}
                        errorMessage={errors[SignUpFieldsNames.NAME]?.message as string}
                    />
                    <HookFormInput
                        placeholder="Фамилия *"
                        name={SignUpFieldsNames.LAST_NAME}
                        style={inputStyles}
                        startIcon={UserIcon}
                        inputSize={inputSize}
                        isError={errors[SignUpFieldsNames.LAST_NAME]! && true}
                        validationSchema={nicknameSchema}
                        errorMessage={errors[SignUpFieldsNames.LAST_NAME]?.message as string}
                    />

                    <HookFormInput
                        placeholder="Почта *"
                        name={SignUpFieldsNames.EMAIL}
                        style={inputStyles}
                        inputMode="email"
                        startIcon={AtSymbolIcon}
                        inputSize={inputSize}
                        isError={errors[SignUpFieldsNames.EMAIL]! && true}
                        validationSchema={emailSchema}
                        errorMessage={errors[SignUpFieldsNames.EMAIL]?.message as string}
                    />
                    <HookFormInput
                        placeholder="Телефон: +996 (XXX) XXX XXX *"
                        name={SignUpFieldsNames.PHONE}
                        style={inputStyles}
                        startIcon={PhoneIcon}
                        inputSize={inputSize}
                        isError={errors[SignUpFieldsNames.PHONE]! && true}
                        validationSchema={phoneSchema}
                        errorMessage={errors[SignUpFieldsNames.PHONE]?.message as string}
                    />
                    {signUpType === 'host' && (
                        <HookFormInput
                            placeholder="Имя организации *"
                            name={SignUpFieldsNames.ORGANIZATION_NAME}
                            style={inputStyles}
                            startIcon={BuildingOffice2Icon}
                            inputSize={inputSize}
                            isError={errors[SignUpFieldsNames.ORGANIZATION_NAME]! && true}
                            validationSchema={organizationSchema}
                            errorMessage={errors[SignUpFieldsNames.ORGANIZATION_NAME]?.message as string}
                        />
                    )}
                    <HookFormInput
                        placeholder="Пароль *"
                        name={SignUpFieldsNames.PASSWORD}
                        style={inputStyles}
                        startIcon={LockClosedIcon}
                        onClickEndIcon={handleChangePasswordVisible}
                        type={passwordVisible ? 'text' : 'password'}
                        endIcon={passwordVisible ? EyeIcon : EyeSlashIcon}
                        inputSize={inputSize}
                        isError={errors[SignUpFieldsNames.PASSWORD]! && true}
                        validationSchema={signUpPasswordSchema}
                        errorMessage={errors[SignUpFieldsNames.PASSWORD]?.message as string}
                    />
                    <HookFormInput
                        placeholder="Подтвердите пароль *"
                        name={SignUpFieldsNames.CONFIRM_PASSWORD}
                        style={inputStyles}
                        startIcon={LockClosedIcon}
                        onClickEndIcon={handleChangeConfirmPasswordVisible}
                        type={confirmPasswordVisible ? 'text' : 'password'}
                        endIcon={confirmPasswordVisible ? EyeIcon : EyeSlashIcon}
                        inputSize={inputSize}
                        isError={errors[SignUpFieldsNames.CONFIRM_PASSWORD]! && true}
                        validationSchema={signUpPasswordSchema}
                        errorMessage={errors[SignUpFieldsNames.CONFIRM_PASSWORD]?.message as string}
                    />
                    <Typography
                        className={cls.eventFormCheckBox}
                        variant="body-2"
                    >
                        <input
                            type="checkbox"
                            required
                            style={{
                                marginRight: '10px',
                            }}
                        />
                        Я согласен с отказом от ответственности
                    </Typography>
                    <Button
                        style={inputStyles}
                        className={cls.submitButton}
                        block
                        type="submit"
                        appearance="ghost"
                        size={mediaQueryMaxWidth400px ? 'sm' : 'md'}
                        disabled={signUpType === null}
                    >
                        Регистрация
                    </Button>
                </Stack>
            </form>
        </FormProvider>

    );
};
