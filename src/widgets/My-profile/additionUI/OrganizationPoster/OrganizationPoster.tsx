import { FC } from 'react';

import imageNotPageFoundPoster from '@/shared/assets/imageNotFoundPoster.png';
import { ProgressiveImageLoader } from '@/shared/components/ProgressiveImageLoader';

import { OrganizationPosterProps } from '../../model/My-Profile.type';
import cls from './OrganizationPoster.module.less';

export const OrganizationPoster: FC<OrganizationPosterProps> = (props) => {
    const { poster, alt } = props;
    return (
        <div className={cls.organizationPoster}>
            <ProgressiveImageLoader
                width={100}
                height={100}
                src={poster}
                errorImage={imageNotPageFoundPoster.src}
                widthUnitsOfMeasure="%"
                heightUnitsOfMeasure="%"
                alt={alt}
                className={cls.organizationPosterBlurImage}
            />
            <ProgressiveImageLoader
                withBlock
                width={100}
                height={505}
                shimmerDisplayNone
                alt={alt}
                blockClassName={cls.organizationPosterImageBlock}
                src={poster}
                errorImage={imageNotPageFoundPoster.src}
                widthUnitsOfMeasure="%"
                heightUnitsOfMeasure="px"
                className={cls.organizationPosterImage}
            />
        </div>
    );
};
