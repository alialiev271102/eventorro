import { FC } from 'react';
import { Carousel } from 'rsuite';

import imageNotFoundPoster from '@/shared/assets/imageNotFoundPoster.png';
import { ProgressiveImageLoader } from '@/shared/components/ProgressiveImageLoader';
import { clsx } from '@/shared/lib/helpers/clsx';

import { CarouselImagesProps } from '../../model/Event.type';
import cls from './Carousel.module.less';

export const CarouselImages: FC<CarouselImagesProps> = (props) => {
    const { images } = props;
    return (
        <Carousel
            placement="bottom"
            shape="bar"
            className={clsx(cls.carouselImages, 'custom-slider')}
        >
            {images.map((image) => (
                <div className={cls.carouselImageContainer}>
                    <ProgressiveImageLoader
                        width={100}
                        height={100}
                        src={image.image}
                        errorImage={imageNotFoundPoster.src}
                        widthUnitsOfMeasure="%"
                        heightUnitsOfMeasure="%"
                        className={cls.carouselBlurImages}
                    />
                    <ProgressiveImageLoader
                        withBlock
                        width={100}
                        height={100}
                        shimmerDisplayNone
                        blockClassName={cls.carouselImageBlock}
                        src={image.image}
                        errorImage={imageNotFoundPoster.src}
                        widthUnitsOfMeasure="%"
                        heightUnitsOfMeasure="%"
                        className={cls.carouselImage}
                    />
                </div>
            ))}
        </Carousel>

    );
};
