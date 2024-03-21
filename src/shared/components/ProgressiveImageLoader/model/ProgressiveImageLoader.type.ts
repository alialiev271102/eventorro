import { ComponentPropsWithRef } from 'react';

export interface ProgressiveImageLoaderProps extends ComponentPropsWithRef<'img'> {
    width: number;
    height: number;
    src: string;
    errorImage: string;
    widthUnitsOfMeasure?: 'px' | '%' | 'vh' | 'vw';
    heightUnitsOfMeasure?: 'px' | '%' | 'vh' | 'vw';
    withBlock?: boolean;
    blockClassName?: string;
    shimmerDisplayNone?: boolean;
}
