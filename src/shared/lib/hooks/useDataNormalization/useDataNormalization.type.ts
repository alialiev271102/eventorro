export type EventCategory = { name: string; }

export interface useDataNormalizationReturn {
    eventPrice: (priceFrom: number | null, priceTo: number | null) => string;
    eventDate: (DateISO: string) => string;
    eventCategories: (categories: EventCategory[]) => string
}
