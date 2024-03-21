import axios, { AxiosInstance } from 'axios';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_DATA_KEY } from '../localStorageKeys';

const baseUrl = 'https://back.eventorro.com/api/v1/';
const X_CSRF_TOKEN = '1Tr1wQ8g4vCrcgwxFYPJybGffxKkJAb5XOXKeMGVZwV5IBIjj996g1XlS3QGmoxo';

export const axiosInstanceWithBearer: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
    },
    xsrfHeaderName: X_CSRF_TOKEN,
});

axiosInstanceWithBearer.interceptors.request.use((config) => {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`;
    }

    return config;
});

axiosInstanceWithBearer.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (refreshToken) {
            const tokenResponse = await axiosInstanceWithBearer.post('/accounts/token/refresh/', refreshToken);
            localStorage.setItem(ACCESS_TOKEN_KEY, tokenResponse.data.access);
            localStorage.setItem(REFRESH_TOKEN_KEY, tokenResponse.data.refresh);
            axios.defaults.headers.common.Authorization = `Bearer ${tokenResponse.data.access}`;
            return axiosInstanceWithBearer(originalRequest);
        }
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
    }

    return Promise.reject(error);
});

export const axiosInstanceWithoutBearer: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
    },
    xsrfHeaderName: X_CSRF_TOKEN,
});
