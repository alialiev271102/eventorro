import { FC, memo } from 'react';

import { clsxMods } from '@/app/types/global';
import { clsx } from '@/shared/lib/helpers/clsx';

import type { TypographyProps } from '../model/Typography.type';
import cls from './Typography.module.less';

export const Typography: FC<TypographyProps> = memo<TypographyProps>((props: TypographyProps) => {
    const {
        variant = 'body-2',
        tag: Tag = 'p',
        className,
        children,
        bold = false,
        error = false,
    } = props;

    const typographyMods: clsxMods = {
        [cls.bold]: bold,
        [cls.error]: error,
    };

    return (
        <Tag
            data-testid="typography"
            className={clsx(
                className,
                cls.typography,
                typographyMods,
                cls[variant],
            )}
        >
            {children}
        </Tag>
    );
});

Typography.displayName = 'shared/memo/typography';
