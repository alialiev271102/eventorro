import {
    ComponentPropsWithRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, SVGProps,
} from 'react';
import { RegisterOptions } from 'react-hook-form';

type InputSizes = 'sm' | 'md' | 'lg' | 'xs';

export interface HookFormInputProps extends ComponentPropsWithRef<'input'> {
    name: string;
    startIcon?: ForwardRefExoticComponent<PropsWithoutRef<SVGProps<SVGSVGElement>>
        & { title?: string, titleId?: string } & RefAttributes<SVGSVGElement>>;
    endIcon?: ForwardRefExoticComponent<PropsWithoutRef<SVGProps<SVGSVGElement>>
        & { title?: string, titleId?: string } & RefAttributes<SVGSVGElement>>;
    placeholder: string;
    onClickEndIcon?: () => void;
    inputClassName?: string;
    buttonClassName?: string;
    spanClassName?: string;
    isError?: boolean;
    validationSchema?: RegisterOptions;
    isRequired?: boolean;
    inputSize?: InputSizes;
    errorMessage?: string;
}

export type Placement =
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'bottomStart'
    | 'bottomEnd'
    | 'topStart'
    | 'topEnd'
    | 'leftStart'
    | 'leftEnd'
    | 'rightStart'
    | 'rightEnd'
    | 'auto'
    | 'autoVerticalStart'
    | 'autoVerticalEnd'
    | 'autoHorizontalStart'
    | 'autoHorizontalEnd';
