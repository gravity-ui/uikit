import React from 'react';
import {svgA11yHidden} from '../utils/svgA11yHidden';

export function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            {...svgA11yHidden}
            {...props}
        >
            <path stroke="currentColor" fill="none" d="M3 6l5 5 5-5" />
        </svg>
    );
}
