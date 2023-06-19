import React from 'react';

import {a11yHiddenSvgProps} from '../../utils/svg';

export function Facebook(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currenColor"
            {...a11yHiddenSvgProps}
            {...props}
        >
            <circle cx="8" cy="8" r="8" fill="#fff" />
            <path
                d="M0 8a8 8 0 1 1 9.229 7.906V10.29h1.859l.352-2.304H9.23v-1.5c0-.625.31-1.25 1.302-1.25h1V3.283s-.902-.164-1.77-.164c-1.818 0-2.998 1.111-2.998 3.111v1.762H4.732v2.305h2.031v5.608A8.002 8.002 0 0 1 0 8Z"
                fill="#1877F2"
            />
        </svg>
    );
}
