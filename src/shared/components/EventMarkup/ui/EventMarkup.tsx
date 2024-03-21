import { FC } from 'react';

import { clsx } from '@/shared/lib/helpers/clsx';

import { EventMarkupProps } from '../model/EventMarkup.type';
import cls from './EventMarkup.module.less';

export const EventMarkup: FC<EventMarkupProps> = (props) => {
    const { children, typeOfMarkup, className } = props;

    const mods = {
        [cls.markupGrid]: typeOfMarkup === 'grid',
        [cls.markupColumn]: typeOfMarkup === 'column',
    };

    return (
        <div className={clsx(className, cls.markup, mods)}>
            {children}
        </div>
    );
};
