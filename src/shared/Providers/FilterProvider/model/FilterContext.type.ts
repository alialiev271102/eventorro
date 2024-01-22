import { Dispatch, SetStateAction } from 'react';

import { Event } from '@/app/types/global';

export interface filterValue {
    id: number;
    label: string;
    value: string;
}

export interface FilterContextProps {
    filterValues: {
        categories: filterValue[];
        setCategories: Dispatch<SetStateAction<filterValue[]>>
        ages: filterValue[];
        setAges: Dispatch<SetStateAction<filterValue[]>>
        locations: filterValue[];
        setLocations: Dispatch<SetStateAction<filterValue[]>>
        audiences: filterValue[];
        setAudiences: Dispatch<SetStateAction<filterValue[]>>
    },
    filterStates: {
        events: Event[];
        setEvents: Dispatch<SetStateAction<Event[]>>;
        age: string;
        setAge: Dispatch<SetStateAction<string>>;
        audience: string;
        setAudience: Dispatch<SetStateAction<string>>;
        category: string;
        setCategory: Dispatch<SetStateAction<string>>;
        date: [Date, Date];
        setDate: Dispatch<SetStateAction<string[]>>;
        location: string;
        setLocation: Dispatch<SetStateAction<string>>;
    }
    filterLoading: boolean;
    setFilterLoading: Dispatch<SetStateAction<boolean>>;
    eventLoading: boolean;
    setEventLoading: Dispatch<SetStateAction<boolean>>;
}
