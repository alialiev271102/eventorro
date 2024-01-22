import { ComponentPropsWithRef } from 'react';

export interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
    errorText?: string;
    inputSize?: 'lg' | 'md' | 'sm' | 'xs';
}
