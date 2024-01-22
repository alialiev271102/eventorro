import { PhotoIcon } from '@heroicons/react/24/outline';
import {
    ChangeEvent, FC, useCallback, useState,
} from 'react';
import { toast } from 'react-toastify';

import imageNofFoundPoster from '@/shared/assets/imageNotFoundPoster.png';
import { ProgressiveImageLoader } from '@/shared/components/ProgressiveImageLoader';
import { Typography } from '@/shared/components/Typography';
import { clsx } from '@/shared/lib/helpers/clsx';

import { EventFormBannerProps } from '../../model/EventForm.type';
import cls from './EventFormPoster.module.less';

export const EventFormPoster: FC<EventFormBannerProps> = (props) => {
    const {
        className, alt, setImage,
    } = props;

    const [uploadingFile, setUploadingFile] = useState<string>('');

    const onImageHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const isAcceptedFile = file.name.endsWith('.png')
                || file.name.endsWith('.jpeg') || file.name.endsWith('.jpg');

            if (isAcceptedFile) {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                // eslint-disable-next-line func-names
                reader.onload = function (ev) {
                    const img = document.createElement('img');
                    // eslint-disable-next-line func-names
                    img.onload = function () {
                        // eslint-disable-next-line react/no-this-in-sfc
                        if (this.width >= 450 && this.height >= 550) {
                            // eslint-disable-next-line react/no-this-in-sfc
                                setUploadingFile(URL.createObjectURL(file));
                                setImage(file);
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
            } else {
                toast.error('Можно заргужать только изображение(jpg, jpeg, png)', {
                    autoClose: 1500
                });
            }
        }
    }, [setImage]);

    return (
        <label htmlFor="poster" className={clsx(cls.eventFormPoster, className)}>
            {uploadingFile ? (
                <ProgressiveImageLoader
                    width={100}
                    height={100}
                    className={cls.poster}
                    src={uploadingFile}
                    widthUnitsOfMeasure="%"
                    heightUnitsOfMeasure="%"
                    alt={alt}
                    errorImage={imageNofFoundPoster.src}
                />
            ) : (
                <div className={cls.defaultPosterNotAnyImage}>
                    <PhotoIcon className={cls.photoIcon} />
                    <Typography className={cls.posterText} bold>Нажмите чтобы поменять <br></br> постер</Typography>
                    <br />
                    <Typography className={cls.posterText}>Минимальное разрешение <br></br> (450х550)</Typography>
                </div>
            )}
            <input
                type="file"
                accept="image/png, image/jpeg"
                multiple={false}
                onChange={onImageHandler}
                hidden
                id="poster"
                name="poster"
            />
        </label>
    );
};
