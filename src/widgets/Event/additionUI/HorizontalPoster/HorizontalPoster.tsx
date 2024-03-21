import { FC } from 'react';

import imageNotFoundPoster from '@/shared/assets/imageNotFoundPoster.png';
import { ProgressiveImageLoader } from '@/shared/components/ProgressiveImageLoader';

import { EventPosterProps } from '../../model/Event.type';
import cls from './HorizontalPoster.module.less';

export const HorizontalPoster:FC<EventPosterProps> = (props) => {
    const { imageLink, alt } = props;

    return (
        <div className={cls.HorizontalPoster}>
            <ProgressiveImageLoader
                width={100}
                height={100}
                src={imageLink}
                errorImage={imageNotFoundPoster.src}
                widthUnitsOfMeasure="%"
                heightUnitsOfMeasure="%"
                alt={alt}
                className={cls.horizontalBlurImage}
            />
            <ProgressiveImageLoader
                withBlock
                width={100}
                height={100}
                shimmerDisplayNone
                alt={alt}
                blockClassName={cls.horizontalImageBlock}
                src={imageLink}
                errorImage={imageNotFoundPoster.src}
                widthUnitsOfMeasure="%"
                heightUnitsOfMeasure="%"
                className={cls.horizontalImage}
            />
        </div>
    );
};
