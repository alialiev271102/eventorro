import { Dispatch, SetStateAction } from 'react';

import { Event } from '@/app/types/global';

export interface filterValueFromBack {
    id: number;
    name: string;
}

export interface filterValue {
    id: number;
    label: string;
    value: string;
}

export type axiosParams = {[key: string]: string | string[]};

export interface useFilterReturn {
    filterFunctions: {
        clearFilterState: () => void;
        getFilterValues: () => Promise<void>;
    },
    filterStates: {
        age: string;
        ages: filterValue[];
        date: string[];
        audience: string;
        audiences: filterValue[];
        location: string;
        locations: filterValue[];
        category: string;
        categories: filterValue[];
        filterLoading: boolean;
        eventLoading: boolean;
        events: Event[];
    },
    filterSetStates: {
        setLocation: Dispatch<SetStateAction<string>>;
        setAge: Dispatch<SetStateAction<string>>;
        setDate: Dispatch<SetStateAction<string[]>>;
        setCategory: Dispatch<SetStateAction<string>>;
        setAudience: Dispatch<SetStateAction<string>>;
    },
}
