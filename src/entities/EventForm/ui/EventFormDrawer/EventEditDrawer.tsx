import { CheckIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
    Button, Drawer, Loader, Modal,
} from 'rsuite';
import { ModalSize } from 'rsuite/cjs/Modal/Modal';

import { Typography } from '@/shared/components/Typography';
import { useEvent } from '@/shared/lib/hooks/useEvent';
import { CreateEventProps } from '@/shared/lib/hooks/useEvent/useEvent.type';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import {
    EventFormBanner, EventFormCarousel, EventFormFields, EventFormPoster,
} from '../../additionUI';
import { useEditEvent } from '../../hooks/useEditEvent';
import {
    EventFormDrawerProps,
    EventFormFields as EventFormFieldsType,
} from '../../model/EventForm.type';
import cls from './EventEditDrawer.module.less';

export const EventEditDrawer: FC<EventFormDrawerProps> = (props) => {
    const { onClose, isOpen, event } = props;

    const { mediaQueryMaxWidth1030px, mediaQueryMaxWidth900px } = useQueries();
    const { eventFunctions, eventStates } = useEvent();
    const [openAlert, setOpenAlert] = useState(false);
    const editEventStates = useEditEvent();
    const {
        localCity,
        setLocalCity,
        localDescription,
        setLocalDescription,
        localAge,
        localCategories,
        setLocalCategories,
        localTypeOfLocation,
        setLocalTypeOfLocation,
        localAudience,
        setLocalAudience,
        setLocalAge,
        setIsFree,
        isFree,
        setRegisterHere,
        registerHere,
        poster,
        setPoster,
        setCarouselImages,
        carouselImages,
        setBanner,
        banner,
    } = editEventStates;

    const { eventInfo, eventContent, eventProperties } = event;

    const { updatingEvent, eventDeleting } = eventStates;

    const {
        ticketsNumber, description, priceFrom, priceTo, eventName,
    } = eventInfo;

    const {
        ageLimits, audience, typeOfLocation, categories, city
    } = eventProperties;

    const { updateEvent, deleteEvent } = eventFunctions;

    const eventFormFields = useForm<any>({
        mode: 'onBlur',
        defaultValues: {
            name: eventInfo.eventName,
            city: eventProperties.city,
            locationLink: eventInfo.locationLink,
            locationName: eventInfo.locationName,
            typeOfLocation: eventProperties.typeOfLocation,
            eventLanguage: eventInfo.eventLanguage,
            video: eventContent.video,
            audience: eventProperties.audience,
            ageLimits: eventProperties.ageLimits,
            priceTo: eventInfo.priceTo !== null ? eventInfo.priceTo : null,
            priceFrom: eventInfo.priceFrom !== null ? eventInfo.priceFrom : null,
            ticketsNumber: eventInfo.ticketsNumber !== null ? eventInfo.ticketsNumber : null,
        },
    });

    const { handleSubmit, setValue, formState: { errors } } = eventFormFields;

    const drawerSize = (): ModalSize => {
        if (mediaQueryMaxWidth900px) {
            return 'full';
        } if (mediaQueryMaxWidth1030px) {
            return 'md';
        }

        return 'lg';
    };

    const onSaveEditHandler = (data: EventFormFieldsType) => {
        if (localCategories.length === 0
            || localAudience === null
            || localAge === null
            || localTypeOfLocation === null
            || localCity === null
        ) {
            toast.error('Заполните все данные', {
                autoClose: 1500
            });
            return;
        }

        // @ts-ignore
        const updatedEvent: Partial<CreateEventProps> = {
            name: data.name,
            city: data.city,
            video: data.video ? data.video : '',
            audience: localAudience,
            type_of_location: localTypeOfLocation,
            description: localDescription,
            location_name: data.locationName,
            event_language: data.eventLanguage,
            location_link: data.locationLink,
            // eslint-disable-next-line no-nested-ternary
            price_to: isFree ? null : (data.priceTo! < 0? data.priceTo! * -1: data.priceTo!),
            price_from: isFree ? null : (data.priceFrom! < 0? data.priceFrom! * -1: data.priceFrom!),
            tickets_number: !registerHere ? null : data.ticketsNumber,
            age_limits: localAge,
            categories: localCategories,
            image1: carouselImages[0]?.file && carouselImages[0].file,
            image2: carouselImages[1]?.file && carouselImages[1].file,
            image3: carouselImages[2]?.file && carouselImages[2].file,
            image4: carouselImages[3]?.file && carouselImages[3].file,
            image5: carouselImages[4]?.file && carouselImages[4].file,
            poster: banner && banner,
            event_card_image: poster && poster,
        };

        // @ts-ignore
        updateEvent(eventInfo.eventId, updatedEvent);
    };

    useEffect(() => {
        if (ticketsNumber !== null) {
            setValue('ticketsNumber', ticketsNumber);
        }
    }, [ticketsNumber, setValue]);

    useEffect(() => {
        setLocalDescription(description);
        setLocalAudience(audience);
        setLocalAge(ageLimits);
        setLocalTypeOfLocation(typeOfLocation);
        setLocalCity(city)

        // eslint-disable-next-line array-callback-return
        categories.map((category) => {
            setLocalCategories((prevState) => {
                if (!prevState.includes(category.name)) {
                    return [...prevState, category.name];
                }

                return prevState;
            });
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (priceTo === null && priceFrom === null) {
            setIsFree(true);
        } else {
            setIsFree(false);
        }
    }, [priceFrom, priceTo, setIsFree]);

    useEffect(() => {
        if (ticketsNumber === null) {
            setRegisterHere(false);
        } else {
            setRegisterHere(true);
        }
        // eslint-disable-next-line
    }, []);

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormProvider {...eventFormFields}>
            <Modal
                backdrop="static"
                role="alertdialog"
                open={openAlert}
                onClose={() => setOpenAlert(false)}
                size="xs"
            >
                <Modal.Body className={cls.alert}>
                    <ExclamationTriangleIcon width={30} height={30} />
                    Вы точно хотите удалить
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => deleteEvent(eventInfo.eventId)} appearance="primary">
                        Ok
                    </Button>
                    <Button onClick={() => setOpenAlert(false)} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <Drawer
                placement={mediaQueryMaxWidth900px ? 'bottom' : 'right'}
                open={isOpen}
                onClose={onClose}
                size={drawerSize()}
                dialogClassName={cls.editDrawer}
            >
                {eventDeleting || updatingEvent ? (<Loader className={cls.editDrawerLoader} size="md" backdrop />) : ''}
                <Drawer.Body className={cls.rsDrawerBody}>
                    <form onSubmit={handleSubmit(onSaveEditHandler)}>
                        <Drawer.Actions>
                            <Button
                                appearance="primary"
                                color="red"
                                style={{
                                    width:"270px",
                                    height: "50px"
                                }}
                                onClick={() => setOpenAlert(true)}
                            >
                                Удалить ивент
                            </Button>
                        </Drawer.Actions>
                        <Drawer.Title className={cls.editDrawerBannerBlock}>
                            <Typography bold className={cls.editDrawerBlockTitle}>
                                Баннер
                            </Typography>
                            <EventFormBanner
                                alt={eventName}
                                setImage={setBanner}
                                image={banner}
                            />
                        </Drawer.Title>

                        <Drawer.Title className={cls.editDrawerPosterAndCarouselBlock}>
                            <div className={cls.editDrawerPoster}>
                                <Typography bold className={cls.editDrawerBlockTitle}>
                                    Постер
                                </Typography>
                                <EventFormPoster
                                    alt={eventName}
                                    setImage={setPoster}
                                    image={poster}
                                />
                            </div>
                            <div className={cls.editDrawerCarousel}>
                                <Typography bold className={cls.editDrawerBlockTitle}>
                                    Доп. изображение - должны быть мимнимум 900х510
                                </Typography>
                                <EventFormCarousel
                                    carouselImages={carouselImages}
                                    setCarouselImages={setCarouselImages}
                                    className={cls.editDrawerCarousel}
                                />
                            </div>
                        </Drawer.Title>

                        <Drawer.Title className={cls.editDrawerEventForm}>
                            <Typography bold className={cls.editDrawerBlockTitle}>
                                Информация
                            </Typography>
                            <EventFormFields
                                localStates={editEventStates}
                                eventProperties={eventProperties}
                                eventInfo={eventInfo}
                                errors={errors}
                            />
                        </Drawer.Title>
                        <Drawer.Title className={cls.editDrawerEventButtons}>
                            <Button
                                className={cls.editDrawerEventButton}
                                appearance="primary"
                                type="submit"
                            >
                                Сохранить
                                <CheckIcon className={cls.editDrawerEventButtonIcons} />
                            </Button>
                            <Button
                                className={cls.editDrawerEventButton}
                                appearance="primary"
                                color="red"
                                onClick={onClose}
                            >
                                Отмена
                                <XMarkIcon className={cls.editDrawerEventButtonIcons} />
                            </Button>
                        </Drawer.Title>
                    </form>
                </Drawer.Body>
            </Drawer>
        </FormProvider>
    );
};
