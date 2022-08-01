import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            width="14"
            height="14"
            fill="currentColor"
            {...a11yHiddenSvgProps}
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5 7C12.5 10.0376 10.0376 12.5 7 12.5C3.96243 12.5 1.5 10.0376 1.5 7C1.5 3.96243 3.96243 1.5 7 1.5C10.0376 1.5 12.5 3.96243 12.5 7ZM14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM6.5 9.59808L9.5 7.86603C10.1667 7.48113 10.1667 6.51888 9.5 6.13398L6.5 4.40192C5.83333 4.01702 5 4.49815 5 5.26795L5 8.73205C5 9.50185 5.83333 9.98298 6.5 9.59808Z"
            />
        </svg>
    );
}
