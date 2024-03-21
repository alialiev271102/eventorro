import 'rsuite/styles/index.less';
import '../app/styles/index.less';

import type {AppProps} from 'next/app';
import {Suspense, useEffect, useState} from 'react';
import {ToastContainer} from 'react-toastify';
import {CustomProvider, Footer, IconButton} from 'rsuite';
import ruRu from 'rsuite/locales/ru_RU';

import ErrorBoundary from '@/entities/ErrorBoundary/ErrorBoundary';
import {AuthorizationContextProvider} from '@/shared/Providers/AuthorizationProvider';
import {FilterContextProvider} from '@/shared/Providers/FilterProvider';
import {Navbar} from '@/widgets/Navbar';

import 'react-toastify/dist/ReactToastify.css';
import {ArrowUpIcon} from "@heroicons/react/24/outline";

export default function App({Component, pageProps}: AppProps) {

    const [client, setClient] = useState<boolean>(false);

    useEffect(() => {
        setClient(true)
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // добавляем плавный скролл
        });
    }
    return (
        <ErrorBoundary>
            <AuthorizationContextProvider>
                <FilterContextProvider>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <CustomProvider locale={ruRu}>
                        <Navbar/>
                        {client?<Suspense fallback="Loading">
                            <Component className={'main'} {...pageProps} />
                        </Suspense>: ''}
                        <IconButton onClick={scrollToTop}
                                    icon={<ArrowUpIcon color={'#FFA500'} style={{width: '20px', height: '20px'}}/>}
                                    style={{
                                        position: 'fixed',
                                        bottom: '20px',
                                        right: '20px',
                                        border: '1px solid #FFA500',
                                        borderRadius: '50%',
                                        zIndex: '1200'
                                    }}>
                        </IconButton>
                        <Footer></Footer>
                    </CustomProvider>
                    <ToastContainer/>
                </FilterContextProvider>
            </AuthorizationContextProvider>
        </ErrorBoundary>
    );
}
