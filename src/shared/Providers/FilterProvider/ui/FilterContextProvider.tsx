import {
    FC, ReactNode, useMemo, useState,
} from 'react';

import { Event } from '@/app/types/global';

import { FilterContext } from '../lib/FilterContext';
import { FilterContextProps, filterValue } from '../model/FilterContext.type';

interface AuthorizationContextProviderProps {
    children: ReactNode;
}

export const FilterContextProvider: FC<AuthorizationContextProviderProps> = (props) => {
    const { children } = props;

    const [eventLoading, setEventLoading] = useState<boolean>(false);
    const [filterLoading, setFilterLoading] = useState<boolean>(false);

    const [categories, setCategories] = useState<filterValue[]>([]);
    const [ages, setAges] = useState<filterValue[]>([]);
    const [locations, setLocations] = useState<filterValue[]>([]);
    const [audiences, setAudiences] = useState<filterValue[]>([]);

    const [events, setEvents] = useState<Event[]>([]);
    const [age, setAge] = useState<string>('');
    const [audience, setAudience] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [date, setDate] = useState<string[]>([]);
    const [location, setLocation] = useState<string>('');

    const AuthorizationLoadingContextProps: FilterContextProps = useMemo(() => ({
        eventLoading,
        setFilterLoading,
        filterLoading,
        setEventLoading,
        filterStates: {
            events,
            setEvents,
            age,
            setAge,
            audience,
            setAudience,
            category,
            setCategory,
            date,
            setDate,
            location,
            setLocation,
        },
        filterValues: {
            categories,
            setAudiences,
            setLocations,
            setAges,
            setCategories,
            ages,
            locations,
            audiences,
        },
    }), [
        age,
        ages, audience,
        audiences,
        categories,
        category,
        date,
        eventLoading,
        events,
        filterLoading,
        location,
        locations,
    ]);

    return (
        <FilterContext.Provider value={AuthorizationLoadingContextProps}>
            {children}
        </FilterContext.Provider>
    );
};
