import React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export function Share(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M12.5 5a2.98 2.98 0 0 0-1.976.758L6.45 3.495c.027-.162.05-.325.05-.495a3 3 0 1 0-3 3c.76 0 1.447-.292 1.976-.759L9.55 7.505c-.027.162-.05.326-.05.495 0 .169.023.333.05.495l-4.074 2.264A2.975 2.975 0 0 0 3.5 10a3 3 0 1 0 3 3c0-.17-.023-.333-.05-.495l4.074-2.263A2.98 2.98 0 0 0 12.5 11a3 3 0 1 0 0-6z" />
        </svg>
    );
}
