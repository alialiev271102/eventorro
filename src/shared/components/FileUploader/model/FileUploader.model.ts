import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface FileUploaderProps {
    maxHeight?: number;
    minHeight?: number;
    maxWidth?: number;
    minWidth?: number;
    setFile: Dispatch<SetStateAction<File | null>>;
    setLocalImageLink: Dispatch<SetStateAction<string>>;
    children: ReactNode;
    id: string;
    className?: string;
}
