import { useMediaQuery } from './useMediaQuery';

export const useQueries = () => {
    const mediaQueryMaxWidth330px = useMediaQuery('(max-width: 330px)');
    const mediaQueryMaxWidth360px = useMediaQuery('(max-width: 360px)');
    const mediaQueryMaxWidth400px = useMediaQuery('(max-width: 400px)');
    const mediaQueryMaxWidth470px = useMediaQuery('(max-width: 470px)');
    const mediaQueryMaxWidth530px = useMediaQuery('(max-width: 530px)');
    const mediaQueryMaxWidth600px = useMediaQuery('(max-width: 600px)');
    const mediaQueryMinWidth600px = useMediaQuery('(min-width: 600px)');
    const mediaQueryMaxWidth750px = useMediaQuery('(max-width: 750px)');
    const mediaQueryMaxWidth768px = useMediaQuery('(max-width: 768px)');
    const mediaQueryMaxWidth830px = useMediaQuery('(max-width: 830px)');
    const mediaQueryMaxWidth900px = useMediaQuery('(max-width: 900px)');
    const mediaQueryMaxWidth960px = useMediaQuery('(max-width: 960px)');
    const mediaQueryMaxWidth1030px = useMediaQuery('(max-width: 1030px)');
    const mediaQueryMaxWidth1200px = useMediaQuery('(max-width: 1200px)');

    return {
        mediaQueryMaxWidth330px,
        mediaQueryMaxWidth360px,
        mediaQueryMaxWidth400px,
        mediaQueryMaxWidth470px,
        mediaQueryMaxWidth530px,
        mediaQueryMaxWidth600px,
        mediaQueryMinWidth600px,
        mediaQueryMaxWidth750px,
        mediaQueryMaxWidth768px,
        mediaQueryMaxWidth830px,
        mediaQueryMaxWidth900px,
        mediaQueryMaxWidth960px,
        mediaQueryMaxWidth1030px,
        mediaQueryMaxWidth1200px,
    };
};
