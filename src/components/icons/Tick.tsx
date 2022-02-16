import React from 'react';
import {svgA11yHidden} from '../utils/svgA11yHidden';

export function Tick(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            {...svgA11yHidden}
            {...props}
        >
            <path
                d="M3 7.75L6.75 11.5L13 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
