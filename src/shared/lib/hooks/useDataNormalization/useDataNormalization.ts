import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useCallback } from 'react';

import { EventCategory, useDataNormalizationReturn } from './useDataNormalization.type';

export const useDataNormalization = (): useDataNormalizationReturn => {
    const eventPrice = useCallback((priceFrom: number | null, priceTo: number | null): string => {
        if (priceFrom === null) {
            return 'Вход свободный';
        } if (priceTo === null) {
            return `${priceFrom}c`;
        } if (priceTo === priceFrom) {
            return `${priceFrom}c`;
        }

        return `${Math.min(priceFrom, priceTo)}-${Math.max(priceFrom, priceTo)}c`;
    }, []);

    const eventDate = useCallback((DateISO: string): string => format(
        new Date(DateISO),
        'dd-MMMM в EEEEEE HH:mm',
        { locale: ru },
    ), []);

    const eventCategories = useCallback((categories: EventCategory[]) => {
        let categoryText: string = '';

        // eslint-disable-next-line array-callback-return
        categories.map((category, index) => {
            if (categories.length === 1) {
                categoryText += category.name;
            } else if (index === 2) {
                categoryText += category.name;
            } else {
                categoryText += `${category.name}, `;
            }
        });

        return categoryText;
    }, []);

    return {
        eventCategories, eventDate, eventPrice,
    };
};
