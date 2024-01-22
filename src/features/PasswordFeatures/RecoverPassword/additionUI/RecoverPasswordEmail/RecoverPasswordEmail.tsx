import { FormProvider, useForm } from 'react-hook-form';
import { Button, Stack } from 'rsuite';

import { inputStyle260px, inputStyle320px } from '@/features/Authorization/constants/InputStyles';
import { HookFormInput } from '@/shared/components/HookFormInput/ui/HookFormInput';
import { emailSchema } from '@/shared/lib/constants/validation';
import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import { RecoverPasswordEmailFieldNames, RecoverPasswordEmailFields } from '../../model/RecoverPassword.type';
import cls from '../additionUI.module.less';

export const RecoverPasswordEmail = () => {
    const recoverPasswordEmailForm = useForm<RecoverPasswordEmailFields>({ mode: 'onBlur' });

    const { mediaQueryMaxWidth400px } = useQueries();

    const { authorizationFunction } = useAuthorization();
    const { sendActivationCode } = authorizationFunction;

    const { handleSubmit, formState: { errors } } = recoverPasswordEmailForm;

    const inputStyles = mediaQueryMaxWidth400px ? inputStyle260px : inputStyle320px;
    const inputSize = mediaQueryMaxWidth400px ? 'md' : 'lg';

    const sendActivationCodeHandler = async (data: RecoverPasswordEmailFields) => {
        await sendActivationCode(data.email);
    };

    return (
        <FormProvider {...recoverPasswordEmailForm}>
            <form onSubmit={handleSubmit(sendActivationCodeHandler)}>
                <Stack direction="column" spacing={10} alignItems="center">
                    <HookFormInput
                        name={RecoverPasswordEmailFieldNames.EMAIL}
                        placeholder="Ведите почту"
                        style={inputStyles}
                        inputSize={inputSize}
                        isError={errors[RecoverPasswordEmailFieldNames.EMAIL]! && true}
                        validationSchema={emailSchema}
                        errorMessage={errors[RecoverPasswordEmailFieldNames.EMAIL]?.message as string}
                    />
                    <Button
                        style={inputStyles}
                        className={cls.submitButton}
                        block
                        type="submit"
                        appearance="ghost"
                        size={mediaQueryMaxWidth400px ? 'sm' : 'md'}
                    >
                        Отправить код
                    </Button>
                </Stack>
            </form>
        </FormProvider>
    );
};
