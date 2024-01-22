import { ReactNode } from 'react';

type TypographyVariant =
    | 'title-1'
    | 'title-2'
    | 'title-3'
    | 'body-1'
    | 'body-2'
    | 'body-3'
    | 'body-4'
    | 'body-5'

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div' | 'p' | 'a';

export interface TypographyProps {
    tag?: TypographyTag;
    variant?: TypographyVariant;
    children: ReactNode;
    className?: string;
    bold?: boolean;
    error?: boolean;
}
