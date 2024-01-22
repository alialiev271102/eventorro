import {
    Event, EventFromBackend, ticketUser as ticketUserInterface, ticketUserFromBackend,
} from '@/app/types/global';

export const eventModelSerializer = (eventDataFromBack: EventFromBackend): Event => {
    const {
        id,
        name,
        poster,
        audience,
        author,
        categories,
        event_language: eventLanguage,
        event_dates: eventDates,
        event_card_image: eventCardImage,
        images,
        description,
        location_link: locationLink,
        location_name: locationName,
        price_from: priceFrom,
        price_to: priceTo,
        tickets_number: ticketsNumber,
        ticket_users: ticketUsers,
        video,
        type_of_location: typeOfLocation,
        age_limits: ageLimits,
    } = eventDataFromBack;

    const mappedTicketUser: ticketUserInterface[] = ticketUsers?.map((ticketUserMapped: ticketUserFromBackend) => ({
        id: ticketUserMapped.id,
        event: ticketUserMapped.event,
        phone: ticketUserMapped.phone,
        name: ticketUserMapped.name,
        lastName: ticketUserMapped.last_name,
        userId: ticketUserMapped.user_id,
        email: ticketUserMapped.email,
    }));

    return {
        eventContent: {
            images,
            video,
            poster,
            eventCardImage,
        },
        eventInfo: {
            author,
            ticketUsers: mappedTicketUser,
            description,
            eventId: id,
            eventDates: eventDates?.map((date) => ({ dateTime: date.date_time })),
            eventName: name,
            locationLink,
            priceTo,
            priceFrom,
            locationName,
            ticketsNumber,
            eventLanguage,
        },
        eventProperties: {
            categories,
            audience,
            ageLimits,
            typeOfLocation,
        },
    };
};
