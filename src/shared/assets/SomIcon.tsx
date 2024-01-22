import { ComponentPropsWithRef, FC, memo } from 'react';

type SomSvgProps = ComponentPropsWithRef<'svg'>

export const SomIcon:FC<SomSvgProps> = memo((props: SomSvgProps) => (
    <svg
        width="12"
        height="18"
        viewBox="0 0 12 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            /* eslint-disable-next-line max-len */
            d="M11.4 10.5C10.2 12 8.625 12.675 6.6 12.675C3.15 12.675 0.600002 10.125 0.525002 6.67498C0.525002 3.22498 3.15 0.599976 6.675 0.599976C8.625 0.599976 10.125 1.19998 11.25 2.54998L9.45 3.89998C8.85 3.29998 7.95 2.62498 6.6 2.62498C4.575 2.62498 3 4.34998 3 6.59998C3 8.84998 4.575 10.575 6.6 10.575C8.025 10.575 8.925 9.97498 9.6 9.22498L11.4 10.5ZM10.8 16.05H1.875V17.925H10.8V16.05Z"
            fill={props.fill ? props.fill : '#858383'}
        />
    </svg>
));
