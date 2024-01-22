import { useMemo, useState } from 'react';

import { carouselImage } from '../model/EventForm.type';

export const useEditEvent = () => {
    const [localDescription, setLocalDescription] = useState<string>('');
    const [localAge, setLocalAge] = useState<string>('');
    const [localAudience, setLocalAudience] = useState<string>('');
    const [localTypeOfLocation, setLocalTypeOfLocation] = useState<string>('');
    const [localCategories, setLocalCategories] = useState<string[]>([]);
    const [isFree, setIsFree] = useState<boolean>(false);
    const [registerHere, setRegisterHere] = useState<boolean>(false);
    const [poster, setPoster] = useState<File | null>(null);
    const [banner, setBanner] = useState<File | null>(null);
    const [carouselImages, setCarouselImages] = useState<carouselImage[]>([]);

    return useMemo(() => ({
        localDescription,
        setLocalDescription,
        localAge,
        setLocalAge,
        localAudience,
        setLocalAudience,
        localTypeOfLocation,
        setLocalTypeOfLocation,
        localCategories,
        setLocalCategories,
        isFree,
        setIsFree,
        registerHere,
        setRegisterHere,
        poster,
        setPoster,
        banner,
        setBanner,
        carouselImages,
        setCarouselImages,
    }), [
        banner,
        carouselImages,
        isFree,
        localAge,
        localAudience,
        localCategories,
        localDescription,
        localTypeOfLocation,
        poster,
        registerHere,
    ]);
};
