import { ComponentPropsWithRef, FC, memo } from 'react';

type BookmarkSvgProps = ComponentPropsWithRef<'svg'>

export const BookmarkIcon:FC<BookmarkSvgProps> = memo((props: BookmarkSvgProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        {...props}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            // eslint-disable-next-line max-len
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
    </svg>

));
