import { ChangeEvent, FC, useCallback } from 'react';
import { toast } from 'react-toastify';

import { FileUploaderProps } from '../model/FileUploader.model';

export const FileUploader: FC<FileUploaderProps> = (props) => {
    const {
        setFile,
        className,
        maxWidth,
        minWidth,
        minHeight,
        maxHeight,
        setLocalImageLink,
        id,
        children,
    } = props;

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
                    // eslint-disable-next-line func-names,consistent-return
                    img.onload = function () {
                        if (minHeight !== undefined && minWidth !== undefined) {
                            // eslint-disable-next-line
                            if (this.width >= minWidth && this.height >= minHeight) {
                                if (maxHeight !== undefined && maxWidth !== undefined) {
                                    // eslint-disable-next-line react/no-this-in-sfc
                                    if (this.width <= maxWidth && this.height <= maxHeight) {
                                        setLocalImageLink(URL.createObjectURL(file));
                                        setFile(file);
                                        return true;
                                    }
                                    toast.error(`Постер должен быть максисмум ${maxWidth}х${maxHeight}`, {
                                        autoClose: 1500
                                    });
                                    return false;
                                }
                                setLocalImageLink(URL.createObjectURL(file));
                                setFile(file);
                                return true;
                            }
                            toast.error(`Постер должен быть максисмум ${maxWidth}х${maxHeight}`, {
                                autoClose: 1500
                            });
                            return false;
                        }

                        setLocalImageLink(URL.createObjectURL(file));
                        setFile(file);
                        return true;
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
    }, [maxHeight, maxWidth, minHeight, minWidth, setFile, setLocalImageLink]);

    return (
        <label htmlFor={id} className={className}>
            {children}
            <input
                accept="image/png, image/jpeg"
                multiple={false}
                hidden
                id={id}
                type="file"
                onChange={onImageHandler}
            />
        </label>
    );
};
