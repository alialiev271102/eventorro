import { FC } from 'react';

import imageNotFoundPoster from '@/shared/assets/imageNotFoundPoster.png';
import { ProgressiveImageLoader } from '@/shared/components/ProgressiveImageLoader';

import { EventPosterProps } from '../../model/Event.type';
import cls from './VerticalPoster.module.less';

export const VerticalPoster: FC<EventPosterProps> = (props) => {
    const { imageLink, alt } = props;

    return (
        <div className={cls.VerticalPoster}>
            <ProgressiveImageLoader
                width={500}
                height={700}
                src={imageLink}
                alt={alt}
                errorImage={imageNotFoundPoster.src}
                className={cls.verticalImage}
            />
        </div>
    );
};
