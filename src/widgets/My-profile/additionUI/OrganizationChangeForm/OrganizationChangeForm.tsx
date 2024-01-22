import {
    BuildingOffice2Icon, PhoneIcon, PhotoIcon, UserIcon,
} from '@heroicons/react/24/outline';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Modal } from 'rsuite';

import { inputStyle260px, inputStyle320px } from '@/features/Authorization/constants/InputStyles';
import imageNofFoundPoster from '@/shared/assets/imageNotFoundPoster.png';
import { FileUploader } from '@/shared/components/FileUploader';
import { HookFormInput } from '@/shared/components/HookFormInput/ui/HookFormInput';
import { ProgressiveImageLoader } from '@/shared/components/ProgressiveImageLoader';
import { Typography } from '@/shared/components/Typography';
import {
    eventDescriptionSchema,
    nicknameSchema,
    organizationSchema,
    phoneSchema,
    surnameSchema,
} from '@/shared/lib/constants/validation';
import { clsx } from '@/shared/lib/helpers/clsx';
import { useAuthorization } from '@/shared/lib/hooks/useAuthorization/useAuthorization';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import { EditOrganizationFormFields } from '../../model/My-Profile.type';
import cls from './OrganizationChangeForm.module.less';

export const OrganizationChangeForm = () => {
    const { authorizationStates, authorizationSetStates, authorizationFunction } = useAuthorization();
    const { userState, editUserModalState } = authorizationStates;
    const { setEditUserModalState } = authorizationSetStates;
    const { editUser, getUserData } = authorizationFunction;

    const editOrganizationForm = useForm<EditOrganizationFormFields>({
        mode: 'onBlur',
        defaultValues: {
            surname: userState?.userInformation.lastName,
            bio: userState?.userInformation.bio,
            organizationName: userState?.userInformation.organizationName,
            name: userState?.userInformation.name,
            phone: userState?.userInformation.phone,
        },
    });

    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarLink, setAvatarLink] = useState<string>('');
    const [banner, setBanner] = useState<File | null>(null);
    const [bannerLink, setBannerLink] = useState<string>('');
    const [description, setDescription] = useState('');
    const { mediaQueryMaxWidth400px } = useQueries();

    const inputStyles = mediaQueryMaxWidth400px ? inputStyle260px : inputStyle320px;
    const inputSize = mediaQueryMaxWidth400px ? 'md' : 'lg';

    const handleClose = useCallback(() => {
        setEditUserModalState(false);
    }, [setEditUserModalState]);

    const handleOpen = useCallback(() => {
        setEditUserModalState(true);
    }, [setEditUserModalState]);

    const { register, formState: { errors }, handleSubmit } = editOrganizationForm;

    const onEditUser = (data: EditOrganizationFormFields) => {
        editUser({
            name: data.name,
            bio: description,
            organization_name: data.organizationName,
            avatar: avatar && avatar,
            phone: data.phone,
            poster: banner && banner,
            last_name: data.surname,
        });
        setEditUserModalState(false);
        getUserData();
    };

    useEffect(() => {
        setDescription(userState ? userState.userInformation.bio : '');
        setBannerLink(userState ? userState.userImages.poster : '');
        setAvatarLink(userState ? userState.userImages.avatar : '');
    }, []);

    return (
        <FormProvider {...editOrganizationForm}>
            <Modal
                keyboard
                open={editUserModalState}
                onClose={handleClose}
                onOpen={handleOpen}
                size="md"
                dialogClassName={cls.modalDialog}
                className={cls.modal}
                // style={false ? { pointerEvents: 'none' } : {}}
            >
                <form className={cls.editUserForm}
                //check
                onSubmit={handleSubmit(onEditUser)}>
                    {userState?.userInformation.isHost ?
                        <FileUploader
                        setFile={setBanner}
                        setLocalImageLink={setBannerLink}
                        id="changeBanner"
                        className={cls.editUserBanner}
                        minHeight={510}
                        maxWidth={900}
                    >
                        {bannerLink ? (
                            <ProgressiveImageLoader
                                width={100}
                                height={100}
                                className={cls.banner}
                                src={bannerLink}
                                widthUnitsOfMeasure="%"
                                heightUnitsOfMeasure="%"
                                alt="upload"
                                errorImage={imageNofFoundPoster.src}
                            />
                        ) : (
                            <div className={cls.defaultBannerNotAnyImage}>
                                <PhotoIcon className={cls.photoIcon} />
                                <Typography className={cls.bannerText} bold>Нажмите чтобы поменять баннер</Typography>
                                <Typography className={cls.bannerText}>Минимальное разрешение (900x510)</Typography>
                            </div>
                        )}
                    </FileUploader>: " "}
                    <div className={cls.avatarAndInputs}>
                        <FileUploader
                            setFile={setAvatar}
                            setLocalImageLink={setAvatarLink}
                            id="changeAvatar"
                            className={cls.editUserAvatar}
                        >
                            {avatarLink ? (
                                <ProgressiveImageLoader
                                    width={100}
                                    height={100}
                                    className={cls.avatar}
                                    src={avatarLink}
                                    widthUnitsOfMeasure="%"
                                    heightUnitsOfMeasure="%"
                                    alt="upload"
                                    errorImage={imageNofFoundPoster.src}
                                />
                            ) : (
                                <div className={cls.defaultAvatarNotAnyImage}>
                                    <PhotoIcon className={cls.photoAvatarIcon} />
                                    <Typography className={cls.avatarText} bold>
                                        Нажмите чтобы поменять аватар
                                    </Typography>
                                    <Typography className={cls.avatarText}>Минимальное разрешение (50x50)</Typography>
                                </div>
                            )}
                        </FileUploader>
                        <div className={cls.inputs}>
                            <HookFormInput
                                placeholder="Имя *"
                                name="name"
                                style={inputStyles}
                                startIcon={UserIcon}
                                inputSize={inputSize}
                                isError={errors.name! && true}
                                validationSchema={nicknameSchema}
                                errorMessage={errors.name?.message!}
                            />
                            <HookFormInput
                                placeholder="Фамилия *"
                                name="surname"
                                style={inputStyles}
                                startIcon={UserIcon}
                                inputSize={inputSize}
                                isError={errors.surname! && true}
                                validationSchema={surnameSchema}
                                errorMessage={errors.surname?.message!}
                            />

                            {userState?.userInformation.isHost? <HookFormInput
                                placeholder="Имя организации *"
                                name="organizationName"
                                style={inputStyles}
                                startIcon={BuildingOffice2Icon}
                                inputSize={inputSize}
                                isError={errors.name! && true}
                                validationSchema={organizationSchema}
                                errorMessage={errors.organizationName?.message!}
                            /> : " "}
                            <HookFormInput
                                placeholder="Номер телефона (+996XXXXXXXXX)"
                                name="phone"
                                style={inputStyles}
                                startIcon={PhoneIcon}
                                inputSize={inputSize}
                                isError={errors.phone! && true}
                                validationSchema={phoneSchema}
                                errorMessage={errors.phone?.message!}
                            />
                        </div>
                    </div>
                    {userState?.userInformation.isHost?
                        <textarea
                        rows={5}
                        placeholder="Описание *"
                        className={clsx('rs-input', `rs-input-${inputSize}`, cls.eventFormTextarea)}
                        {...register('bio', {
                            ...eventDescriptionSchema,
                            value: description,
                            onChange: (event) => setDescription(event.target.value),
                        })}
                    /> : " "}

                    {errors.bio?.message
                        && (
                            <Typography tag="span" className={cls.error} variant="body-4" error>
                                {errors.bio?.message}
                            </Typography>
                        )}
                    {userState?.userInformation.isHost?
                        <div>

                            {' '}
                            / 1000
                        </div> : " "}
                    <Button appearance="primary" block type="submit">
                        Сохранить
                    </Button>
                </form>
            </Modal>

        </FormProvider>
    );
};
