import { FC } from 'react';

import { YoutubeFrameProps } from '../../model/Event.type';
import cls from './YoutubeFrame.module.less';

export const YoutubeFrame: FC<YoutubeFrameProps> = (props) => {
    const { link } = props;
    return (
        <div className={cls.videoContainer}>
            <iframe
                className={cls.iframe}
                src={`https://www.youtube.com/embed/${link.split('watch?').slice(-1)[0].split('?')[0].slice(-11)}`}
                title="Youtube video"
                frameBorder={0}
                allow="autoplay; encrypted-media"
                allowFullScreen
            />
        </div>
    );
};
