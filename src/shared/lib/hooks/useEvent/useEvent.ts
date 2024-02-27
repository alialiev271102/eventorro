import {Dispatch, SetStateAction, useCallback, useState,} from 'react';
import {toast} from 'react-toastify';

import {Event, EventFromBackend, UserFromBackend} from '@/app/types/global';
import {axiosInstanceWithBearer, axiosInstanceWithoutBearer} from '@/shared/lib/constants/axiosInstance';
import {axiosErrorHandler} from '@/shared/lib/helpers/axiosErrorHandler';
import {eventModelSerializer} from '@/shared/lib/helpers/modelserializers';
import {useAuthorization} from '@/shared/lib/hooks/useAuthorization/useAuthorization';

import {AuthorData, CreateEventProps, UseEventReturn} from './useEvent.type';

export const useEvent = (): UseEventReturn => {
    const [eventBookmarking, setEventBookmarking] = useState<boolean>(false);
    const [eventCreating, setEventCreating] = useState<boolean>(false);
    const [eventRegistering, setEventRegistering] = useState<boolean>(false);
    const [eventDeleting, setEventDeleting] = useState<boolean>(false);
    const [notSuchEvent, setNotSuchEvent] = useState<boolean>(false);
    const [updatingEvent, setUpdatingEvent] = useState<boolean>(false);
    const [eventLoading, setEventLoading] = useState<boolean>(false);
    const [event, setEvent] = useState<Event | null>(null);
    const [authorDataLoading, setAuthorDataLoading] = useState<boolean>(false);
    const [authorData, setAuthorData] = useState<AuthorData | null>(null);

    const {authorizationFunction} = useAuthorization();
    const {getUserData} = authorizationFunction;

    const toggleEventSaveState = useCallback(async (id: number): Promise<void> => {
        setEventBookmarking(true);
        await axiosInstanceWithBearer.get<'удалено' | 'сохранено'>(`/events/${id}/add_favorite/`)
            .then(async (response) => {
                if (response.data === 'удалено') {
                    toast.success('Мероприятие успешно было удалено из избранных', {
                        autoClose: 1500
                    });
                } else {
                    toast.success('Мероприятие успешно было добавлено в избранные', {
                        autoClose: 1500
                    });
                }
                await getUserData();
            })
            .catch((error) => axiosErrorHandler(error))
            .finally(() => setEventBookmarking(false));
    }, [getUserData]);

    const getEventById = useCallback(async (eventId: number): Promise<void> => {
        setEventLoading(true);
        setNotSuchEvent(false);
        axiosInstanceWithoutBearer.get<EventFromBackend>(`/events/${eventId}`)
            .then((response) => {
                if (response.status === 404) {
                    setNotSuchEvent(true);
                } else {
                    setEvent(eventModelSerializer(response.data));
                }
            })
            .catch((error) => axiosErrorHandler(error))
            .finally(() => setEventLoading(false));
    }, []);

    const getEventAuthorDateByEmail = useCallback(async (email: string): Promise<void> => {
        setAuthorDataLoading(true);
        axiosInstanceWithoutBearer.get<UserFromBackend>(`/accounts/events_by/${email}/`)
            .then((response) => {
                setAuthorData({
                    avatar: response.data.avatar,
                    organizationName: response.data.organization_name,
                });
            })
            .catch((error) => axiosErrorHandler(error))
            .finally(() => setAuthorDataLoading(false));
    }, []);

    const toggleRegisterToEvent = useCallback(async (
        eventId: number,
        setIsRegistered: Dispatch<SetStateAction<boolean>>,
    ): Promise<void> => {
        setEventRegistering(true);
        await axiosInstanceWithBearer.get<'Сохранено' | 'Удалено'>(`/events/${eventId}/get_ticket/`)
            .then(async (response) => {
                if (response.data === 'Сохранено') {
                    setIsRegistered(true);
                    toast.success('Бронь прошла успешно', {
                        autoClose: 1500
                    });
                } else {
                    setIsRegistered(false);
                    toast.success('Вы успешно отменили бронь', {
                        autoClose: 1500
                    });
                }
            })
            .catch((error) => axiosErrorHandler(error))
            .finally(() => setEventRegistering(false));
    }, []);

    const toggleRegisterToEventWithCount = useCallback(async (
        eventId: number,
        count: number,
        setIsRegistered: Dispatch<SetStateAction<boolean>>,
    ): Promise<void> => {
        setEventRegistering(true);
        await axiosInstanceWithBearer.post<'Сохранено' | 'Удалено'>(`/events/${eventId}/get_ticket/`, {'count': count})
            .then(async (response) => {
                if (response.data === 'Сохранено') {
                    setIsRegistered(true);
                    toast.success('Бронь прошла успешно', {
                        autoClose: 1500
                    });
                } else {
                    setIsRegistered(false);
                    toast.success('Вы успешно отменили бронь', {
                        autoClose: 1500
                    });
                }
            })
            .catch((error) => axiosErrorHandler(error))
            .finally(() => setEventRegistering(false));
    }, []);

    const updateEvent = useCallback(async (id: number, data: Partial<CreateEventProps>): Promise<void> => {
        setUpdatingEvent(true);
        await axiosInstanceWithBearer.put(`/events/${id}/update_event/`, data)
            .then(() => {
                getUserData();
                toast.success('Ивент успешно изменен', {
                    autoClose: 1500
                });
            })
            .catch((error) => axiosErrorHandler(error))
            .finally(() => setUpdatingEvent(false));
    }, []);

    const deleteEvent = useCallback(async (id: number): Promise<void> => {
        setEventDeleting(true);
        await axiosInstanceWithBearer.delete(`/events/${id}/delete_event/`)
            .then(() => {
                toast.success('Ивент успешно удален', {
                    autoClose: 1500
                });
                getUserData();
            })
            .catch((error) => axiosErrorHandler(error))
            .finally(() => setEventDeleting(false));
    }, [getUserData]);

    const createEvent = useCallback(async (data: Partial<CreateEventProps>) => {
        setEventCreating(true);
        axiosInstanceWithBearer.post('/events/create_event/', data)
            .then(() => {
                getUserData();
                toast.success('Ивент успешно создан! Ваше событие находится на проверке. Оно станет доступно на главной странице после модерации.', {
                    autoClose: 15000,
                    position: toast.POSITION.TOP_CENTER,
                    closeOnClick: false,
                    hideProgressBar: false,
                    icon: false,
                    style: {
                        width: "300px",
                        height: "120px",
                        marginTop: window.innerWidth <= 600 ? "50%" : "50%",
                        marginLeft: window.innerWidth <= 600 ? "auto" : "0",
                        marginRight: window.innerWidth <= 600 ? "auto" : "0",
                        textAlign: "center",
                    },
                });
            })
            .catch((error) => axiosErrorHandler(error))
            .finally(() => setEventCreating(false));
    }, [getUserData]);

    return {
        eventStates: {
            authorData,
            authorDataLoading,
            event,
            eventLoading,
            notSuchEvent,
            eventBookmarking,
            eventRegistering,
            updatingEvent,
            eventDeleting,
            eventCreating,
        },
        eventFunctions: {
            createEvent,
            updateEvent,
            getEventAuthorDateByEmail,
            getEventById,
            toggleEventSaveState,
            toggleRegisterToEvent,
            toggleRegisterToEventWithCount,
            deleteEvent,
        },

    };
};
