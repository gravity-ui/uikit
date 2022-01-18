import React from 'react';

export function DragHandleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 6 10"
            width="6"
            height="10"
            fill="currentColor"
            {...props}
        >
            <path d="M0 0h2v2H0zm0 4h2v2H0zm0 4h2v2H0zm4-8h2v2H4zm0 4h2v2H4zm0 4h2v2H4z" />
        </svg>
    );
}
