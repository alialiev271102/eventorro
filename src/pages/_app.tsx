import 'rsuite/styles/index.less';
import '../app/styles/index.less';

import type {AppProps} from 'next/app';
import {Suspense, useEffect, useState} from 'react';
import {ToastContainer} from 'react-toastify';
import {CustomProvider, IconButton} from 'rsuite';
import ruRu from 'rsuite/locales/ru_RU';
import {useRouter} from 'next/router';

import ErrorBoundary from '@/entities/ErrorBoundary/ErrorBoundary';
import {AuthorizationContextProvider} from '@/shared/Providers/AuthorizationProvider';
import {FilterContextProvider} from '@/shared/Providers/FilterProvider';
import {Navbar} from '@/widgets/Navbar';

import 'react-toastify/dist/ReactToastify.css';
import {ArrowUpIcon} from "@heroicons/react/24/outline";
import { Logo } from '@/widgets/Navbar/additionUI';
import Footer from '@/widgets/Footer/Footer';




export default function App({Component, pageProps}: AppProps) {

    const [client, setClient] = useState<boolean>(false);
    const {push} = useRouter();
    const toDocs = async () => {
        await push('/documents')
    }

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
                        <div style={{ position: 'relative', zIndex: '200' }}> {/* z-index для футера */}
                        <Footer toDocs={toDocs} />
                          {/*  <div style={{ textAlign: 'center',
                            paddingTop: '10px',
                            paddingBottom: '20px',
                            backgroundColor: 'white',
                            }}>
                                <p>© Eventorro.com{new Date().getFullYear()}</p>
                            </div> */}
                        </div>
                    </CustomProvider>
                    <ToastContainer/>
                </FilterContextProvider>
            </AuthorizationContextProvider>
        </ErrorBoundary>
    );
}
