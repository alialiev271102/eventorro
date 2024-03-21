import { createContext } from 'react';

import { FilterContextProps } from '../model/FilterContext.type';

export const FilterContext = createContext<FilterContextProps>({
    filterStates: {
        events: [],
        setEvents: () => {},
        age: '',
        city: '',
        setCity: () => {},
        setAge: () => {},
        audience: '',
        setAudience: () => {},
        category: '',
        setCategory: () => {},
        date: ['',''],
        setDate: () => {},
        location: '',
        setLocation: () => {},
    },
    filterValues: {
        citys: [],
        setCitys: () => {},
        categories: [],
        setCategories: () => {},
        ages: [],
        setAges: () => {},
        locations: [],
        setLocations: () => {},
        audiences: [],
        setAudiences: () => {},
    },
    filterLoading: false,
    setFilterLoading: () => {},
    eventLoading: false,
    setEventLoading: () => {},
});
