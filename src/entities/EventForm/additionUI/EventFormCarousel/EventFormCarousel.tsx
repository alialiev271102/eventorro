import { XMarkIcon } from '@heroicons/react/24/outline';
import {
    ChangeEvent, FC, useCallback,
} from 'react';
import { toast } from 'react-toastify';
import { IconButton, Stack } from 'rsuite';

import { ProgressiveImageLoader } from '@/shared/components/ProgressiveImageLoader';
import { Typography } from '@/shared/components/Typography';
import { clsx } from '@/shared/lib/helpers/clsx';

import { carouselImage, EventFormCarouselProps } from '../../model/EventForm.type';
import cls from './EventFormCarousel.module.less';

export const EventFormCarousel: FC<EventFormCarouselProps> = (props) => {
    const {
        className, carouselImages, setCarouselImages, helperText = false,
    } = props;

    const onImageHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const isAcceptedFile = files
                .every((file: File) => file.name.endsWith('.png')
                    || file.name.endsWith('.jpeg') || file.name.endsWith('.jpg'));

            if (carouselImages.length < 5) {
                if (isAcceptedFile) {
                    files.slice(0, 5 - carouselImages.length).forEach((file: File) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);

                        // eslint-disable-next-line func-names
                        reader.onload = function (ev) {
                            const img = document.createElement('img');
                            // eslint-disable-next-line func-names
                            img.onload = function () {
                                // eslint-disable-next-line react/no-this-in-sfc
                                if (this.width >= 900 && this.height >= 510) {
                                    const newImage: carouselImage = {
                                        file,
                                        name: file.name,
                                        id: `${file.size * Math.floor(Math.random() * 5)}`,
                                        localUrl: URL.createObjectURL(file),
                                    };
                                    setCarouselImages((prevState) => [...prevState, newImage]);
                                    return true;
                                }

                                toast.error('Постер должен быть минимум 450х550', {
                                    autoClose: 1500
                                });
                                return false;
                            };
                            if (ev.target) {
                                if (typeof ev.target.result === 'string') {
                                    img.src = ev.target.result;
                                }
                            }
                        };
                    });
                } else {
                    toast.error('Можно заргужать только изображение(jpg, jpeg, png)', {
                        autoClose: 1500
                    });
                }
            } else {
                toast.error('Можно заргужать только 5 изображений', {
                    autoClose: 1500
                });
            }
        }
    }, [carouselImages.length, setCarouselImages]);

    const onRemoveHandler = useCallback((id: string) => {
        setCarouselImages((prevState) => prevState.filter((image) => image.id !== id));
    }, [setCarouselImages]);

    return (
        <div className={clsx(className, cls.uploader)}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="carouselImage" className="rs-btn rs-btn-primary rs-btn-block">
                Загрузить изображения
            </label>
            <input
                accept="image/png, image/jpeg"
                onInput={onImageHandler}
                id="carouselImage"
                name="carouselImage"
                type="file"
                hidden
                multiple
            />
            <div className={cls.uploadedImages}>
                {carouselImages.length === 0 && helperText && (
                    <Typography tag="span" className={cls.carouselImageInfo}>
                        Загрузите дополнительные изображение
                        (доп. изображение - должны быть мимнимум 900х510)
                    </Typography>
                )}
                {carouselImages && (
                    <>
                        {carouselImages.map((image) => (
                            <div className={cls.uploadedCard}>
                                <Stack spacing={10} alignItems="flex-start">
                                    <ProgressiveImageLoader
                                        width={40}
                                        height={40}
                                        src={image.localUrl}
                                        errorImage=""
                                        className={cls.uploadedImage}
                                    />
                                    <Typography className={cls.uploadedImageName}>
                                        {image.name}
                                    </Typography>
                                </Stack>
                                <IconButton
                                    onClick={() => onRemoveHandler(image.id)}
                                    icon={<XMarkIcon width={20} height={20} />}
                                    appearance="link"
                                />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};
