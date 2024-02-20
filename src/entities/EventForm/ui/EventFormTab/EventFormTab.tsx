import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
    Button, Checkbox, DatePicker, InputPicker, TagPicker,
} from 'rsuite';
import { ValueType } from 'rsuite/Checkbox';

import { HookFormInput } from '@/shared/components/HookFormInput/ui/HookFormInput';
import { Typography } from '@/shared/components/Typography';
import {
    eventDescriptionSchema, eventLanguageSchema,
    eventLocationSchema,
    eventNameSchema, required,
    youtubeLinkSchema,
} from '@/shared/lib/constants/validation';
import { clsx } from '@/shared/lib/helpers/clsx';
import { useEvent } from '@/shared/lib/hooks/useEvent';
import { CreateEventProps } from '@/shared/lib/hooks/useEvent/useEvent.type';
import { useFilter } from '@/shared/lib/hooks/useFilter/useFilter';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import { EventFormBanner, EventFormCarousel, EventFormPoster } from '../../additionUI';
import {
    carouselImage,
    EventFormFields,
    EventFormFields as EventFormFieldsType,
    EventFormFieldsNames,
} from '../../model/EventForm.type';
import cls from './EventFormTab.module.less';

export const EventFormTab = () => {
    const [localDescription, setLocalDescription] = useState<string>('');
    const [localAge, setLocalAge] = useState<string>('');
    const [localAudience, setLocalAudience] = useState<string>('');
    const [localTypeOfLocation, setLocalTypeOfLocation] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [localCategories, setLocalCategories] = useState<string[]>([]);
    const [isFree, setIsFree] = useState<boolean>(false);
    const [registerHere, setRegisterHere] = useState<boolean>(false);
    const [poster, setPoster] = useState<File | null>(null);
    const [banner, setBanner] = useState<File | null>(null);
    const [carouselImages, setCarouselImages] = useState<carouselImage[]>([]);
    const [date, setDate] = useState<Date | null>(null);
    const { eventFunctions } = useEvent();
    const { createEvent } = eventFunctions;

    const { mediaQueryMaxWidth600px } = useQueries();
    const { filterStates } = useFilter();

    const {
        categories, citys, audiences, ages, locations
    } = filterStates;
    const eventForm = useForm<EventFormFields>({ mode: 'onBlur' });
    const {
        register, formState: { errors }, handleSubmit, reset,
    } = eventForm;

    const inputSize = mediaQueryMaxWidth600px ? 'md' : 'lg';

    const onChangeCheckPicker = (value: string[]): void => {
        if (value.length < 4) {
            setLocalCategories(value);
        } else {
            toast.error('Максимум можно выбрать 3 категории', {
                autoClose: 1500
            });
        }
    };

    const refactoredCategories = categories.map((category) => ({ label: category.value, value: category.value }));

    const onCheckPrise = (
        value: (ValueType | undefined),
        checked: boolean,
    ): void => {
        setIsFree(checked);
    };

    const onCheckTicket = (
        value: (ValueType | undefined),
        checked: boolean,
    ): void => {
        setRegisterHere(checked);
    };

    const handleChange = (value: (Date | null)) => {
        if (value) {
            setDate(value);
        }
    };

    const onCreateNewEvent = (data: EventFormFieldsType) => {
        if (poster === null || banner === null) {
            toast.error('Пожалуйста добавьте постер и баннер', {
                autoClose: 1500
            });
            return;
        }

        if (localCategories.length === 0
            || localAudience === null
            || localAge === null
            || localTypeOfLocation === null
            || date === null
            || city === null
        ) {
            toast.error('Заполните все данные', {
                autoClose: 1500
            });
            return;
        }

        const createdEvent: Partial<CreateEventProps> = {
            name: data.name,
            city: city,
            video: data.video ? data.video : '',
            isModerate: false,
            audience: localAudience,
            type_of_location: localTypeOfLocation,
            description: localDescription,
            location_name: data.locationName,
            location_link: data.locationLink,
            event_language: data.eventLanguage,
            // eslint-disable-next-line no-nested-ternary
            price_to: isFree ? null : (data.priceTo! < 0? data.priceTo! * -1: data.priceTo!),
            price_from: isFree ? null : (data.priceFrom! < 0? data.priceFrom! * -1: data.priceFrom!),
            tickets_number: !registerHere ? null : data.ticketsNumber,
            age_limits: localAge,
            event_dates: [date.toISOString()],
            categories: localCategories,
            image1: carouselImages[0]?.file && carouselImages[0].file,
            image2: carouselImages[1]?.file && carouselImages[1].file,
            image3: carouselImages[2]?.file && carouselImages[2].file,
            image4: carouselImages[3]?.file && carouselImages[3].file,
            image5: carouselImages[4]?.file && carouselImages[4].file,
            poster: banner,
            event_card_image: poster,
        };

        createEvent(createdEvent);

        reset();
        setDate(null);
        setBanner(null);
        setPoster(null);
        setIsFree(false);
        setRegisterHere(false);
        setCity('');
        setLocalDescription('');
        setLocalAudience('');
        setLocalAge('');
        setLocalTypeOfLocation('');
        setLocalCategories([]);
    };

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormProvider {...eventForm}>
            <form className={cls.eventForm} onSubmit={handleSubmit(onCreateNewEvent)}>
                <div className={cls.banner}>
                    <EventFormBanner
                        className={cls.banner}
                        alt="Uploading image"
                        image={banner}
                        setImage={setBanner}
                    />
                </div>
                <div className={cls.posterAndCarousel}>
                    <EventFormPoster
                        alt="Uploading image"
                        image={poster}
                        className={cls.poster}
                        setImage={setPoster}
                    />
                    <EventFormCarousel
                        className={cls.carousel}
                        carouselImages={carouselImages}
                        setCarouselImages={setCarouselImages}
                        helperText
                    />
                </div>
                <HookFormInput
                    className={cls.eventFormInputBlock}
                    inputClassName={cls.eventFormInput}
                    name={EventFormFieldsNames.NAME}
                    placeholder="Название ивента *"
                    inputSize={inputSize}
                    validationSchema={eventNameSchema}
                    isError={errors[EventFormFieldsNames.NAME]! && true}
                    errorMessage={errors[EventFormFieldsNames.NAME]?.message as string}
                />

                <div>
                    <textarea
                        rows={5}
                        placeholder="Описание *"
                        className={clsx('rs-input', `rs-input-${inputSize}`, cls.eventFormTextarea)}
                        {...register(EventFormFieldsNames.DESCRIPTION, {
                            ...eventDescriptionSchema,
                            value: localDescription,
                            onChange: (event) => setLocalDescription(event.target.value),
                        })}
                    />

                    {errors[EventFormFieldsNames.DESCRIPTION]?.message
                        && (
                            <Typography tag="span" className={cls.error} variant="body-4" error>
                                {errors[EventFormFieldsNames.DESCRIPTION]?.message}
                            </Typography>
                        )}
                    <div>
                        {localDescription.length}
                        {' '}
                        / 1000
                    </div>
                </div>

                <HookFormInput
                    className={cls.eventFormInputBlock}
                    inputClassName={cls.eventFormInput}
                    name={EventFormFieldsNames.LOCATION_NAME}
                    placeholder="Название адреса *"
                    inputSize={inputSize}
                    validationSchema={eventLocationSchema}
                    isError={errors[EventFormFieldsNames.LOCATION_NAME]! && true}
                    errorMessage={errors[EventFormFieldsNames.LOCATION_NAME]?.message as string}
                />
                <HookFormInput
                    className={cls.eventFormInputBlock}
                    inputClassName={cls.eventFormInput}
                    name={EventFormFieldsNames.EVENT_LANGUAGE}
                    placeholder="Язык мероприятия *"
                    validationSchema={eventLanguageSchema}
                    inputSize={inputSize}
                    isError={errors[EventFormFieldsNames.EVENT_LANGUAGE]! && true}
                    errorMessage={errors[EventFormFieldsNames.EVENT_LANGUAGE]?.message as string}
                />
                <HookFormInput
                    className={cls.eventFormInputBlock}
                    inputClassName={cls.eventFormInput}
                    name={EventFormFieldsNames.LOCATION_LINK}
                    placeholder="Ссылка на адрес * (2Gis, Google Карты, Yandex Карты)"
                    inputSize={inputSize}
                    inputMode="url"
                    type="url"
                    validationSchema={eventLocationSchema}
                    isError={errors[EventFormFieldsNames.LOCATION_LINK]! && true}
                    errorMessage={errors[EventFormFieldsNames.LOCATION_LINK]?.message as string}
                />

                <HookFormInput
                    className={cls.eventFormInputBlock}
                    inputClassName={cls.eventFormInput}
                    name={EventFormFieldsNames.VIDEO}
                    placeholder="Ссылка на ролик в YouTube (если есть)"
                    inputMode="url"
                    type="url"
                    inputSize={inputSize}
                    validationSchema={youtubeLinkSchema}
                    isError={errors[EventFormFieldsNames.VIDEO]! && true}
                    errorMessage={errors[EventFormFieldsNames.VIDEO]?.message as string}
                />
                <div className={cls.eventFormPrices}>
                    <HookFormInput
                        className={cls.eventFormInputBlock}
                        inputClassName={cls.eventFormInput}
                        name={EventFormFieldsNames.PRICE_FROM}
                        placeholder="Цена от"
                        inputMode="numeric"
                        type="number"
                        inputSize={inputSize}
                        disabled={isFree}
                        isRequired={!isFree}
                        isError={errors[EventFormFieldsNames.PRICE_FROM]! && !isFree && true}
                        errorMessage={errors[EventFormFieldsNames.PRICE_FROM]?.message as string}
                    />
                    <HookFormInput
                        className={cls.eventFormInputBlock}
                        inputClassName={cls.eventFormInput}
                        name={EventFormFieldsNames.PRICE_TO}
                        placeholder="Цена до"
                        inputMode="numeric"
                        type="number"
                        inputSize={inputSize}
                        disabled={isFree}
                        isRequired={false}
                        isError={errors[EventFormFieldsNames.PRICE_TO]! && true}
                        errorMessage={errors[EventFormFieldsNames.PRICE_TO]?.message as string}
                    />
                </div>
                <Checkbox onChange={onCheckPrise} checked={isFree}>
                    <Typography
                        className={cls.eventFormCheckBox}
                        variant="body-2"
                    >
                        Бесплатно
                    </Typography>
                </Checkbox>

                <Checkbox onChange={onCheckTicket} checked={registerHere}>
                    <Typography
                        className={cls.eventFormCheckBox}
                        variant="body-2"
                    >
                        Регистрировать гостей через эту платформу <br/>
                        <span> При регистрации гостя на событие, организатор получает уведомление на e-mail с контактами гостя.</span>
                    </Typography>
                </Checkbox>
                
                <HookFormInput
                    className={cls.eventFormInputBlock}
                    inputClassName={cls.eventFormInput}
                    name={EventFormFieldsNames.TICKET_NUMBER}
                    placeholder="Количество мест"
                    inputMode="numeric"
                    type="number"
                    inputSize={inputSize}
                    validationSchema={registerHere ? { required } : {}}
                    disabled={!registerHere}
                    isError={errors[EventFormFieldsNames.TICKET_NUMBER]! && registerHere && true}
                    errorMessage={errors[EventFormFieldsNames.TICKET_NUMBER]?.message as string}
                />

                <div className={cls.dates}>
                    <DatePicker
                        oneTap
                        block
                        format="yyyy-MM-dd HH:mm"
                        style={{ width: '100%' }}
                        shouldDisableDate={(date) => date <= new Date()}
                        onChange={handleChange}
                        placeholder="Выберите ДАТУ И ВРЕМЯ НАЧАЛА мероприятия"
                        size={inputSize}
                    />
                </div>

                <TagPicker
                    block
                    placement="auto"
                    onChange={onChangeCheckPicker}
                    value={localCategories}
                    size={inputSize}
                    data={refactoredCategories}
                    searchable={false}
                    placeholder="Категории"
                />
                <InputPicker
                    value={city}
                    onChange={setCity}
                    block
                    size={inputSize}
                    data={citys}
                    searchable={false}
                    placement="auto"
                    placeholder="Город"
                />
                <InputPicker
                    value={localTypeOfLocation}
                    onChange={setLocalTypeOfLocation}
                    block
                    size={inputSize}
                    data={locations}
                    searchable={false}
                    placement="auto"
                    placeholder="Локация"
                />
                <InputPicker
                    value={localAudience}
                    onChange={setLocalAudience}
                    block
                    size={inputSize}
                    data={audiences}
                    searchable={false}
                    placement="auto"
                    placeholder="Аудитория"
                />
                <InputPicker
                    value={localAge}
                    onChange={setLocalAge}
                    block
                    size={inputSize}
                    data={ages}
                    searchable={false}
                    placement="auto"
                    placeholder="Возрастное ограничение"
                />
                <Button appearance="primary" type="submit">
                    Создать
                </Button>
            </form>
        </FormProvider>
    );
};
