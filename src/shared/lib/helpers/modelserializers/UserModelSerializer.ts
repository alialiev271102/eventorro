import { User, UserFromBackend } from '@/app/types/global';

export const userModelSerializer = (userDataFromBack: UserFromBackend): User => {
    const {
        user_id: id,
        events_by_user: userCreatedEvents,
        bio,
        email,
        avatar,
        is_host: isHost,
        name,
        last_name: lastName,
        organization_name: organizationName,
        phone,
        poster,
        refresh,
        saved: bookmarkedEvents,
        tickets: registeredEvents,
        access,
    } = userDataFromBack;

    const bookmarkedEventsMapped = bookmarkedEvents.map((event) => event.event);

    return {
        userInformation: {
            email,
            name,
            bio,
            organizationName,
            phone,
            id,
            isHost,
            lastName,
        },
        userImages: {
            avatar,
            poster,
        },
        userTokens: {
            access,
            refresh,
        },
        userEvents: {
            userCreatedEvents,
            bookmarkedEvents: bookmarkedEventsMapped,
            registeredEvents,
        },
    };
};
