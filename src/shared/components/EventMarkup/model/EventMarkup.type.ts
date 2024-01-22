import { ReactNode } from 'react';

export interface EventMarkupProps {
    children: ReactNode;
    typeOfMarkup: 'column' | 'grid';
    className?: string;
}
