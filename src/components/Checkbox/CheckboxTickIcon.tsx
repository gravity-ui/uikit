import type * as React from 'react';

export function CheckboxTickIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 10"
            width="16"
            height="16"
            fill="currentColor"
            {...props}
        >
            <path d="M.49 5.385l1.644-1.644 4.385 4.385L4.874 9.77.49 5.385zm4.384 1.096L10.356 1 12 2.644 6.519 8.126 4.874 6.48v.001z" />
        </svg>
    );
}
