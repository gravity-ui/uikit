import React from 'react';

export function PreviewCloseIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
            {...props}
        >
            <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M7.357 7.357l9.286 9.286m0-9.286l-9.286 9.286"
            />
        </svg>
    );
}
