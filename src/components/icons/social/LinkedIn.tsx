import React from 'react';
import {a11yHiddenSvgProps} from '../../utils/svg';

export function LinkedIn(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currnetColor"
            {...a11yHiddenSvgProps}
            {...props}
        >
            <rect x=".5" y=".5" width="15" height="15" rx="3" fill="#0A66C2" />
            <path
                d="M12.987 12.988h-2.099V9.7c0-.784-.014-1.793-1.091-1.793-1.094 0-1.261.854-1.261 1.736v3.344H6.437v-6.76h2.015v.924h.028a2.208 2.208 0 0 1 1.989-1.092c2.127 0 2.52 1.4 2.52 3.22l-.002 3.709ZM4.07 5.303a1.218 1.218 0 1 1 0-2.436 1.218 1.218 0 0 1 0 2.436Zm1.05 7.685H3.016V6.227h2.101v6.76Z"
                fill="#fff"
            />
        </svg>
    );
}
