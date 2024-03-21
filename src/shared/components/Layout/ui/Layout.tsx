import {
    ComponentPropsWithRef, FC, memo, ReactNode,
} from 'react';

import { clsx } from '@/shared/lib/helpers/clsx';

import cls from './Layout.module.less';

interface LayoutProps extends ComponentPropsWithRef<'div'>{
    children: ReactNode
}

export const Layout: FC<LayoutProps> = memo<LayoutProps>((props: LayoutProps) => {
    const { children, className, ...otherProps } = props;
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <div className={clsx(cls.Layout, className)} {...otherProps}>
            {children}
        </div>
    );
});

Layout.displayName = 'shared/memo/Layout';
