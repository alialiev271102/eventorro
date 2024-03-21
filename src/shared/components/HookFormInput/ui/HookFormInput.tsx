import { FC, memo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Typography } from '@/shared/components/Typography';
import { clsx } from '@/shared/lib/helpers/clsx';

import { HookFormInputProps } from '../model/HookFormInput.type';
import cls from './HookFormInput.module.less';

export const HookFormInput: FC<HookFormInputProps> = memo<HookFormInputProps>((props: HookFormInputProps) => {
    const { register } = useFormContext();

    const {
        startIcon: StartIcon,
        placeholder,
        endIcon: EndIcon,
        onClickEndIcon,
        spanClassName,
        inputClassName,
        buttonClassName,
        className,
        name,
        inputSize = 'md',
        isError,
        isRequired,
        errorMessage = '',
        validationSchema,
        ...otherProps
    } = props;

    return (
        <div className={className}>
            <div className={clsx(`rs-input-group rs-input-group-${inputSize} rs-input-group-inside`)}>
                {StartIcon && (
                    <span className={clsx('rs-input-group-addon', spanClassName)}>
                        <StartIcon width={16} height={16} />
                    </span>
                )}
                <input
                    required={isRequired}
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    {...register(name, validationSchema)}
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    {...otherProps}
                    placeholder={placeholder}
                    className={clsx('rs-input', inputClassName)}
                />
                {EndIcon && (
                    <button
                        type="button"
                        onClick={onClickEndIcon}
                        className={
                            clsx('rs-input-group-addon rs-input-group-btn rs-btn rs-btn-default', buttonClassName)
                        }
                    >
                        <EndIcon />
                    </button>
                )}
            </div>
            {isError && <Typography tag="span" className={cls.error} variant="body-4" error>{errorMessage}</Typography>}
        </div>
    );
});

HookFormInput.displayName = 'shared/memo/HookFormInput';
