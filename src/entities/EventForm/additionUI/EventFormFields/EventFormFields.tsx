import React, {
    FC, SyntheticEvent, useEffect, useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
    Checkbox, InputPicker, TagPicker,
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
import { useFilter } from '@/shared/lib/hooks/useFilter/useFilter';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import {
    EventFormFields as EventFormFieldsType,
    EventFormFieldsNames,
    EventFormFieldsProps,
} from '../../model/EventForm.type';
import cls from './EventFormFields.module.less';

export const EventFormFields: FC<EventFormFieldsProps> = (props) => {
    const { localStates, errors } = props;
    const {
        localCategories, localDescription, setLocalCategories,
        localTypeOfLocation, localAudience, setLocalDescription,
        setLocalTypeOfLocation, setLocalAudience, setLocalAge, localAge,
        setRegisterHere, registerHere, isFree, setIsFree,
    } = localStates;

    const { register } = useForm<EventFormFieldsType>({ mode: 'onBlur' });
    const { mediaQueryMaxWidth600px } = useQueries();

    const { filterStates, filterFunctions } = useFilter();

    const { getFilterValues } = filterFunctions;

    const {
        categories, ages, audiences, locations,
    } = filterStates;

    const inputSize = mediaQueryMaxWidth600px ? 'md' : 'lg';

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

    const onChangeCheckPicker = (value: string[], _event: SyntheticEvent<Element, Event>): void => {
        if (value.length < 4) {
            setLocalCategories(value);
        } else {
            toast.error('Максимум можно выбрать 3 категории', {
                autoClose: 1500
            });
        }
    };

    const refactoredCategories = categories.map((category) => ({ label: category.value, value: category.value }));

    useEffect(() => {
        getFilterValues().then();
    }, [getFilterValues]);
    const [youtubeLink, setYouTubeLink] = useState();


    const normalizeYoutube = (e: any) => {
        setYouTubeLink(e.target.value.split('?')[0]);
    }

    return (
        <div className={cls.eventForm}>
            <HookFormInput
                className={cls.eventFormInputBlock}
                inputClassName={cls.eventFormInput}
                name={EventFormFieldsNames.NAME}
                placeholder="Название ивента *"
                inputSize={inputSize}
                validationSchema={eventNameSchema}
                isError={errors[EventFormFieldsNames.NAME] && true}
                errorMessage={errors[EventFormFieldsNames.NAME]?.message}
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
                isError={errors[EventFormFieldsNames.LOCATION_NAME] && true}
                errorMessage={errors[EventFormFieldsNames.LOCATION_NAME]?.message}
            />
            <HookFormInput
                className={cls.eventFormInputBlock}
                inputClassName={cls.eventFormInput}
                name={EventFormFieldsNames.EVENT_LANGUAGE}
                placeholder="Язык мероприятия *"
                validationSchema={eventLanguageSchema}
                inputSize={inputSize}
                isError={errors[EventFormFieldsNames.EVENT_LANGUAGE] && true}
                errorMessage={errors[EventFormFieldsNames.EVENT_LANGUAGE]?.message}
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
                isError={errors[EventFormFieldsNames.LOCATION_LINK] && true}
                errorMessage={errors[EventFormFieldsNames.LOCATION_LINK]?.message}
            />

            <HookFormInput
                className={cls.eventFormInputBlock}
                inputClassName={cls.eventFormInput}
                name={EventFormFieldsNames.VIDEO}
                placeholder="Ссылка на ролик в YouTube (если есть)"
                inputMode="url"
                type="url"
                inputSize={inputSize}
                value={youtubeLink}
                onChange={normalizeYoutube}
                validationSchema={youtubeLinkSchema}
                isError={errors[EventFormFieldsNames.VIDEO] && true}
                errorMessage={errors[EventFormFieldsNames.VIDEO]?.message}
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
                    validationSchema={isFree ? {} : { required }}
                    isError={errors[EventFormFieldsNames.PRICE_FROM] && !isFree && true}
                    errorMessage={errors[EventFormFieldsNames.PRICE_FROM]?.message}
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
                    isError={errors[EventFormFieldsNames.PRICE_TO] && true}
                    errorMessage={errors[EventFormFieldsNames.PRICE_TO]?.message}
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
                isError={errors[EventFormFieldsNames.TICKET_NUMBER] && registerHere && true}
                errorMessage={errors[EventFormFieldsNames.TICKET_NUMBER]?.message}
            />

            <Checkbox onChange={onCheckTicket} checked={registerHere}>
                <Typography
                    className={cls.eventFormCheckBox}
                    variant="body-2"
                >
                    Регистрировать гостей через эту платформу
                    <span>При регистрации гостя на событие, организатор получает уведомление на e-mail с контактами гостя.</span>
                </Typography>
            </Checkbox>

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
        </div>
    );
};
