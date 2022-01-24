import React from 'react';

export function SuccessToast(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                fill="#3BC935"
            />
            <path
                d="M8.25 11.688l2.5 3.437 5.625-6.875"
                stroke="#fff"
                strokeWidth="1.667"
                strokeLinecap="round"
            />
        </svg>
    );
}
