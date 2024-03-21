import { Placeholder, Stack } from 'rsuite';

import cls from './EventCardDesktopSkeleton.module.less';

export const EventCardDesktopSkeleton = () => (
    <div className={cls.EventCardSkeleton}>
        <Placeholder.Graph width={210} height={260} active />
        <Stack justifyContent="center">
            <Placeholder.Graph width={170} height={20} active className={cls.title} />
        </Stack>
        <Placeholder.Paragraph
            rowHeight={12}
            rows={4}
            className={cls.otherInformation}
            active
        />
    </div>
);
