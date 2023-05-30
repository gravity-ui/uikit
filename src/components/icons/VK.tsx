import React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export function VK(props: React.SVGProps<SVGSVGElement>) {
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
            <g clipPath="url(#clip0_3274_86056)">
                <path
                    d="M.5 7.7c0-3.394 0-5.091 1.054-6.146C2.61.5 4.306.5 7.7.5h.6c3.394 0 5.091 0 6.146 1.054C15.5 2.61 15.5 4.306 15.5 7.7v.6c0 3.394 0 5.091-1.054 6.146C13.39 15.5 11.694 15.5 8.3 15.5h-.6c-3.394 0-5.091 0-6.146-1.054C.5 13.39.5 11.694.5 8.3v-.6Z"
                    fill="#07F"
                />
                <path
                    d="M8.516 11.542c-3.663 0-5.753-2.51-5.84-6.69h1.835c.06 3.068 1.413 4.367 2.485 4.635V4.853h1.727v2.645c1.058-.114 2.17-1.32 2.545-2.645h1.727c-.287 1.634-1.493 2.839-2.35 3.334.857.402 2.23 1.454 2.752 3.355h-1.902c-.408-1.272-1.426-2.256-2.772-2.39v2.39h-.207Z"
                    fill="#fff"
                />
            </g>
            <defs>
                <clipPath id="clip0_3274_86056">
                    <path fill="#fff" d="M0 0h16v16H0z" />
                </clipPath>
            </defs>
        </svg>
    );
}
