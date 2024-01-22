import { useCallback, useContext, useEffect } from 'react';

import { EventFromBackend } from '@/app/types/global';
import { axiosInstanceWithoutBearer } from '@/shared/lib/constants/axiosInstance';
import { axiosErrorHandler } from '@/shared/lib/helpers/axiosErrorHandler';
import { eventModelSerializer } from '@/shared/lib/helpers/modelserializers';
import { FilterContext } from '@/shared/Providers/FilterProvider';

import {
    axiosParams, filterValue, filterValueFromBack, useFilterReturn,
} from './useFilter.type';

export const useFilter = (): useFilterReturn => {
    const {
        filterValues,
        filterStates,
        setFilterLoading,
        filterLoading,
        eventLoading,
        setEventLoading,
    } = useContext(FilterContext);

    const {
        events,
        setEvents,
        location,
        setLocation,
        age,
        setAge,
        audience,
        setAudience,
        date,
        setDate,
        category,
        setCategory,
    } = filterStates;

    let yesterdayAt1931 = new Date();
    yesterdayAt1931.setHours(19, 31, 0, 0);
    yesterdayAt1931.setDate(yesterdayAt1931.getDate() - 1);

    const {
        categories,
        audiences,
        locations,
        ages,
        setAges,
        setCategories,
        setLocations,
        setAudiences,
    } = filterValues;

    const clearFilterState = useCallback((): void => {
        setLocation('');
        setCategory('');
        setAge('');
        setAudience('');
        setDate([]);
        setEvents([]);
    }, [setAge, setAudience, setCategory, setDate, setEvents, setLocation]);

    const filteringEvents = useCallback(() => {
        const params: axiosParams = {};

        if (audience !== '') {
            params.audience = audience;
        }

        if (category !== '') {
            params.category = category;
        }

        if (age !== '') {
            params.age_limits = age;
        }

        if (location !== '') {
            params.type_of_location = location;
        }

        if (date.length !== 0) {
            // eslint-disable-next-line prefer-destructuring
            params.date_from = date[0];
            // eslint-disable-next-line prefer-destructuring
            params.date_to = date[1];
        }

        setEventLoading(true);
        axiosInstanceWithoutBearer.get<EventFromBackend[]>('/events/', { params })
            .then((response) => {
                const serializedEvents = response.data.map((event) => eventModelSerializer(event));
                setEvents(serializedEvents.filter(obj => {
                    let parseDate = new Date(obj.eventInfo.eventDates[0].dateTime)
                    return parseDate >= yesterdayAt1931
                }));
            })
            .catch((error) => axiosErrorHandler(error))
            .finally(() => setEventLoading(false));
    }, [age, audience, category, date, location, setEventLoading, setEvents]);

    const getFilterValues = useCallback(async (): Promise<void> => {
        setFilterLoading(true);
        axiosInstanceWithoutBearer.defaults.headers.common.Authorization = 'Aman';
        await axiosInstanceWithoutBearer.get<filterValueFromBack[]>('/categories/')
            .then((response) => {
                const mutatedArray: filterValue[] = response.data.map((filter) => ({
                    id: filter.id,
                    label: filter.name,
                    value: filter.name,
                }));
                setCategories(mutatedArray);
            })
            .catch((error) => { axiosErrorHandler(error); });
        await axiosInstanceWithoutBearer.get<filterValueFromBack[]>('/extra/locations/')
            .then((response) => {
                const mutatedArray: filterValue[] = response.data.map((filter) => ({
                    id: filter.id,
                    label: filter.name,
                    value: filter.name,
                }));
                setLocations(mutatedArray);
            })
            .catch((error) => { axiosErrorHandler(error); });
        await axiosInstanceWithoutBearer.get<filterValueFromBack[]>('/extra/age_limits/')
            .then((response) => {
                const mutatedArray: filterValue[] = response.data.map((filter) => ({
                    id: filter.id,
                    label: filter.name,
                    value: filter.name,
                }));
                setAges(mutatedArray);
            })
            .catch((error) => { axiosErrorHandler(error); });
        await axiosInstanceWithoutBearer.get<filterValueFromBack[]>('/extra/audience/')
            .then((response) => {
                const mutatedArray: filterValue[] = response.data.map((filter) => ({
                    id: filter.id,
                    label: filter.name,
                    value: filter.name,
                }));
                setAudiences(mutatedArray);
            })
            .catch((error) => { axiosErrorHandler(error); });
        setFilterLoading(false);
    }, [setAges, setAudiences, setCategories, setFilterLoading, setLocations]);

    useEffect(() => {
        filteringEvents();
    }, [age, category, audience, location, date, filteringEvents]);

    return {
        filterFunctions: {
            clearFilterState,
            getFilterValues,
        },
        filterStates: {
            age,
            ages,
            date,
            audience,
            audiences,
            location,
            locations,
            category,
            categories,
            filterLoading,
            eventLoading,
            events,
        },
        filterSetStates: {
            setLocation,
            setAge,
            setDate,
            setCategory,
            setAudience,
        },
    };
};
