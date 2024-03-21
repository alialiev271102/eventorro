import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface axiosErrorHandlerFields {
    email: string[];
    non_field_errors: string[];
}

export const axiosErrorHandler = (error: AxiosError<axiosErrorHandlerFields>): void => {
    if (error.response) {
        const { response: { status } } = error;

        if (status === 400) {
            if (error.response.data.email) {
                toast.error(error.response.data.email[0], {
                    autoClose: 1500
                });
            } else if (error.response.data.non_field_errors) {
                toast.error(error.response.data.non_field_errors[0], {
                    autoClose: 1500
                });
            } else {
                toast.error('Вы вели некоректнные данные', {
                    autoClose: 1500
                });
            }
        } else if (status === 401) {
            toast.error('Сначала авторизуйтесь', {
                autoClose: 1500
            });
        } else if (status === 403) {
            toast.error('Извинете сервер понял запрос, но не может его выполнить', {
                autoClose: 1500
            });
        } else if (status === 404) {
            toast.error('Извинете но запрошенный ресурс не найден', {
                autoClose: 1500
            });
        } else if (status === 409) {
            toast.error('Извинете произошел какойто конфликт поопроуйте перезагрузить страницу', {
                autoClose: 1500
            });
        } else if (status === 500) {
            toast.error('Что-то пошло не так, но мы не знаем, что именно', {
                autoClose: 1500
            });
        } else if (status === 503) {
            toast.error('Проблемы в сервер попробуйте позже', {
                autoClose: 1500
            });
        } else {
            // eslint-disable-next-line no-console
            console.error(error.response.data);
        }
    }
};
