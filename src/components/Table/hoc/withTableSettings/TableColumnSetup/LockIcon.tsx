import React from 'react';
import {a11yHiddenSvgProps} from '../../../../utils/svg';

export function LockIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M5.75 6.232C5.75 3.811 6.953 3.5 8 3.5s2.25.31 2.25 2.732V7h-4.5v-.768zm6 .768v-.768C11.75 2.55 9.4 2 8 2s-3.75.55-3.75 4.232V7H3v7h10V7h-1.25z" />
        </svg>
    );
}
