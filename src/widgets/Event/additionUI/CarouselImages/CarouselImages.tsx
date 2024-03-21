import {FC, useState} from 'react';
import { Carousel, Button } from 'rsuite';

import imageNotFoundPoster from '@/shared/assets/imageNotFoundPoster.png';
import { ProgressiveImageLoader } from '@/shared/components/ProgressiveImageLoader';
import { clsx } from '@/shared/lib/helpers/clsx';

import { CarouselImagesProps } from '../../model/Event.type';
import cls from './Carousel.module.less';
import {ArrowRightIcon, ArrowLeftIcon,} from "@heroicons/react/24/outline";

export const CarouselImages: FC<CarouselImagesProps> = (props) => {
    const { images } = props;
    const [activeIndex, setActiveIndex] = useState(0); // Добавлено состояние для отслеживания активного индекса

    // Функция для переключения на следующий слайд
    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Функция для переключения на предыдущий слайд
    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    return (
        <div className={cls.carouselContainer}>
            <Button className={cls.leftArrow} onClick={handlePrev}>
                <ArrowLeftIcon color={"#ffffff"} style={{
                    width: "24px",
                    height: "24px",
                }}/>
            </Button>
            <Carousel
                placement="bottom"
                shape="bar"
                activeIndex={activeIndex}
                onSelect={(index) => setActiveIndex(index)}
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
            <Button className={cls.rightArrow} onClick={handleNext}>
                <ArrowRightIcon color={"#ffffff"} style={{
                    width: "24px",
                    height: "24px"
                }}/>
            </Button>
        </div>
    );
};
