import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export function Twitter(props: React.SVGProps<SVGSVGElement>) {
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
            <circle cx="8" cy="8" r="8" fill="#1D9BF0" />
            <path
                d="M12.569 6.077c.006.094.006.188.006.283 0 2.895-2.177 6.234-6.158 6.234v-.002A6.073 6.073 0 0 1 3.1 11.61a4.313 4.313 0 0 0 3.203-.908A2.17 2.17 0 0 1 4.281 9.18c.325.064.659.05.977-.037a2.185 2.185 0 0 1-1.736-2.148v-.028c.301.17.638.264.982.275a2.21 2.21 0 0 1-.67-2.926 6.118 6.118 0 0 0 4.46 2.29 2.21 2.21 0 0 1 .627-2.094 2.148 2.148 0 0 1 3.062.095c.485-.097.95-.277 1.374-.532-.161.507-.5.938-.951 1.212a4.263 4.263 0 0 0 1.243-.345c-.29.44-.657.825-1.08 1.135Z"
                fill="#fff"
            />
        </svg>
    );
}
