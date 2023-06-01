import React from 'react';

import {a11yHiddenSvgProps} from '../../../../utils/svg';

export function Cloud(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 13 10"
            width="13"
            height="10"
            fill="none"
            {...a11yHiddenSvgProps}
            {...props}
        >
            <path
                fill="currentColor"
                d="M10 4c1.7 0 3 1.3 3 3s-1.3 3-3 3H3.6C1.7 10 .1 8.4.1 6.5c0-1.7 1.3-3 3-3C3.1 1.6 4.7 0 6.6 0s3.5 1.6 3.5 3.5c-.1.2-.1.3-.1.5z"
            />
        </svg>
    );
}
