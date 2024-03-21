import { Placeholder } from 'rsuite';

import { useQueries } from '@/shared/lib/hooks/useMediaQuery';

import cls from './EventCardMobileSkeleton.module.less';

export const EventCardMobileSkeleton = () => {
    const { mediaQueryMaxWidth360px } = useQueries();
    return (
        <div className={cls.EventCardSkeleton}>
            <div className={cls.image}>
                <Placeholder.Graph
                    active
                    width={mediaQueryMaxWidth360px ? 100 : 120}
                    height={mediaQueryMaxWidth360px ? 140 : 160}
                />
            </div>
            <div className={cls.otherInformation}>
                <Placeholder.Graph height={mediaQueryMaxWidth360px ? 15 : 20} active className={cls.title} />
                <Placeholder.Paragraph rows={4} active className={cls.title} />
            </div>
        </div>
    );
};
