import { FC } from 'react';

import cls from '@/shared/components/HookFormInput/ui/HookFormInput.module.less';
import { Typography } from '@/shared/components/Typography';
import { clsx } from '@/shared/lib/helpers/clsx';

import { TextareaProps } from '../model/Textarea.type';

export const Textarea: FC<TextareaProps> = (props) => {
    const {
        errorText, inputSize, className, ...otherProps
    } = props;
    return (
        <div>
            <textarea
                rows={5}
                className={clsx('rs-input', `rs-input-${inputSize}`, className)}
                {...otherProps}
            />
            {errorText && <Typography tag="span" className={cls.error} variant="body-4" error>{errorText}</Typography>}
        </div>
    );
};
