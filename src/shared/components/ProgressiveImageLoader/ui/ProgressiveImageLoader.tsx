import {
    FC, memo, useEffect, useState,
} from 'react';

import { clsx } from '@/shared/lib/helpers/clsx';

import { ProgressiveImageLoaderProps } from '../model/ProgressiveImageLoader.type';
import cls from './ProgressiveImageLoader.module.less';

export const ProgressiveImageLoader:FC<ProgressiveImageLoaderProps> = memo<ProgressiveImageLoaderProps>(
    (props: ProgressiveImageLoaderProps) => {
        const {
            width,
            height,
            errorImage,
            alt,
            className,
            src,
            widthUnitsOfMeasure = 'px',
            heightUnitsOfMeasure = 'px',
            withBlock = false,
            blockClassName = '',
            shimmerDisplayNone = false,
            ...otherProps
        } = props;

        const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
        const [error, setError] = useState<boolean>(false);

        useEffect(() => {
            const image = new Image(width, height);
            image.src = src;
            image.addEventListener('load', () => setIsImageLoaded(true));
            image.addEventListener('error', () => setError(true));

            return () => {
                image.removeEventListener('load', () => setIsImageLoaded(false));
                image.removeEventListener('error', () => setError(false));
            };
        }, [height, src, width]);

        return (
            <>
                {withBlock ? (
                    <div
                        className={blockClassName}
                        style={{
                            width: `${width}${widthUnitsOfMeasure}`,
                            height: `${height}${heightUnitsOfMeasure}`,
                        }}
                    >
                        <img
                            style={{ display: isImageLoaded ? 'block' : 'none' }}
                            alt={alt}
                            className={className}
                            src={src}
                            /* eslint-disable-next-line react/jsx-props-no-spreading */
                            {...otherProps}
                        />
                    </div>
                ) : (
                    <img
                        style={{
                            display: isImageLoaded || withBlock ? 'block' : 'none',
                            width: `${width}${widthUnitsOfMeasure}`,
                            height: `${height}${heightUnitsOfMeasure}`,
                        }}
                        alt={alt}
                        className={className}
                        src={src}
                        /* eslint-disable-next-line react/jsx-props-no-spreading */
                        {...otherProps}
                    />
                )}
                {!isImageLoaded && !error && (
                    <div
                        className={clsx(cls.imageShimmer, className)}
                        style={{
                            width: `${width}${widthUnitsOfMeasure}`,
                            height: `${height}${heightUnitsOfMeasure}`,
                            display: shimmerDisplayNone ? 'none' : 'block',
                        }}
                    />
                )}

                {withBlock ? (
                    error && (
                        <div
                            className={blockClassName}
                            style={{
                                width: `${width}${widthUnitsOfMeasure}`,
                                height: `${height}${heightUnitsOfMeasure}`,
                            }}
                        >
                            <img
                                style={{
                                    width: `${width}${widthUnitsOfMeasure}`,
                                    height: `${height}${heightUnitsOfMeasure}`,
                                }}
                                alt="error_image-not-found"
                                src={errorImage}
                                className={clsx(cls.errorImage, className)}
                            />
                        </div>
                    )
                ) : (
                    error && (
                        <img
                            style={{
                                width: '24px',
                                height: '24px',
                            }}
                            alt="error_image-not-found"
                            src={errorImage}
                            className={clsx(cls.errorImage, className)}
                        />
                    )
                )}

            </>
        );
    },
);
