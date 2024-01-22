import { FC } from 'react';
import { Button } from 'rsuite';

import { Typography } from '@/shared/components/Typography';
import { clsx } from '@/shared/lib/helpers/clsx';

import { NotFoundUndrawImage } from '../assets/NotFoundUndrawImage';
import { NotFoundProps } from '../model/NotFound.type';
import cls from './NotFound.module.less';

export const NotFound: FC<NotFoundProps> = (props) => {
    const {
        onClickOnButton,
        withBackButton,
        className,
        svgClassName,
        text,
        buttonClassName,
        textClassName,
    } = props;

    return (
        <div className={clsx(className, cls.notFound)}>
            <NotFoundUndrawImage className={clsx(svgClassName)} />
            {text && (
                <Typography
                    variant="title-3"
                    className={clsx(textClassName)}
                    bold
                >
                    {text}
                </Typography>
            )}
            {withBackButton && (
                <Button
                    appearance="primary"
                    className={clsx(buttonClassName)}
                    onClick={onClickOnButton}
                >
                    Вернуться назад
                </Button>
            )}
        </div>
    );
};
