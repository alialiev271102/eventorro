import {
    FC, memo, ReactElement,
} from 'react';
import { Tooltip, Whisper } from 'rsuite';

import { Placement } from '../../model/HookFormInput.type';

interface ErrorTooltipProps {
    placement?: Placement;
    open: boolean;
    children: ReactElement;
    errorText: string;
    tooltipClassName?: string;
}

export const ErrorTooltip: FC<ErrorTooltipProps> = memo<ErrorTooltipProps>((props: ErrorTooltipProps) => {
    const {
        placement = 'bottomStart', open, children, errorText, tooltipClassName,
    } = props;

    return (
        <Whisper
            trigger="none"
            placement={placement}
            open={open}
            controlId={`control-id-${placement}`}
            speaker={
                <Tooltip className={tooltipClassName}>{errorText}</Tooltip>
            }
        >
            {children}
        </Whisper>
    );
});
