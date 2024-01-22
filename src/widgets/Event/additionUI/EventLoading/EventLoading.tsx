import { useEffect, useState } from 'react';
import { Placeholder } from 'rsuite';

import { Layout } from '@/shared/components/Layout';
import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import cls from './EventLoading.module.less';

export const EventLoading = () => {
    const [height, setHeight] = useState<number>(510);

    const { mediaQueryMaxWidth900px } = useQueries();
    const { mediaQueryMaxWidth530px } = useQueries();
    const { mediaQueryMaxWidth470px } = useQueries();
    const { mediaQueryMaxWidth330px } = useQueries();

    useEffect(() => {
        if (mediaQueryMaxWidth900px) {
            setHeight(700);
        } else {
            setHeight(510);
        }

        if (mediaQueryMaxWidth530px) {
            setHeight(630);
        } if (mediaQueryMaxWidth470px) {
            setHeight(462);
        } if (mediaQueryMaxWidth330px) {
            setHeight(336);
        }
    }, [mediaQueryMaxWidth330px, mediaQueryMaxWidth470px, mediaQueryMaxWidth530px, mediaQueryMaxWidth900px]);

    return (
        <div>
            <div className={cls.image}>
                {!mediaQueryMaxWidth900px && (
                    <Placeholder.Graph
                        height={height}
                        active
                        className={cls.imageGraph}
                    />
                )}
                <Layout className={cls.eventLoadinContainer}>
                    {mediaQueryMaxWidth900px && (
                        <Placeholder.Graph
                            height={height}
                            active
                            className={cls.imageGraph}
                        />
                    )}
                    <Placeholder.Graph height={40} active className={cls.titleGraph} />
                    <Placeholder.Graph height={200} active className={cls.titleGraph} />
                    <Placeholder.Graph height={40} active className={cls.titleGraph} />
                </Layout>
            </div>
        </div>

    );
};
