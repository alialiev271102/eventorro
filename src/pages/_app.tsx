import 'rsuite/styles/index.less';
import '../app/styles/index.less';

import type { AppProps } from 'next/app';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { CustomProvider } from 'rsuite';
import ruRu from 'rsuite/locales/ru_RU';

import ErrorBoundary from '@/entities/ErrorBoundary/ErrorBoundary';
import { AuthorizationContextProvider } from '@/shared/Providers/AuthorizationProvider';
import { FilterContextProvider } from '@/shared/Providers/FilterProvider';
import { Navbar } from '@/widgets/Navbar';

import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ErrorBoundary>
            <AuthorizationContextProvider>
                <FilterContextProvider>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <CustomProvider locale={ruRu}>
                        <Navbar />
                        <Suspense fallback="Loading">
                            <Component className={'main'} {...pageProps} />
                        </Suspense>
                    </CustomProvider>
                    <ToastContainer />
                </FilterContextProvider>
            </AuthorizationContextProvider>
        </ErrorBoundary>
    );
}
