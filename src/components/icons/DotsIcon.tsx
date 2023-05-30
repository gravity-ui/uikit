import React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export function DotsIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="currentColor"
            {...a11yHiddenSvgProps}
            {...props}
        >
            <path d="M14 6.125a1.874 1.874 0 1 1 .001 3.749A1.874 1.874 0 0 1 14 6.125zm-5.906 0a1.874 1.874 0 1 1 0 3.749 1.874 1.874 0 0 1 0-3.749zM2 6.125a1.874 1.874 0 1 1 .001 3.749A1.874 1.874 0 0 1 2 6.125z" />
        </svg>
    );
}
