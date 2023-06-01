import React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export function Telegram(props: React.SVGProps<SVGSVGElement>) {
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
            <g clipPath="url(#clip0_3048_78838)">
                <circle cx="8" cy="8" r="8" fill="#2AABEE" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.619 8.013A408.555 408.555 0 0 1 8.452 6.06c2.301-.899 2.78-1.055 3.091-1.06a.571.571 0 0 1 .321.09.32.32 0 0 1 .118.211c.011.06.025.199.014.306-.125 1.23-.664 4.215-.939 5.592-.116.583-.345.778-.566.797-.482.042-.847-.298-1.313-.585-.73-.448-1.142-.728-1.85-1.166-.818-.506-.287-.784.179-1.238.122-.12 2.242-1.93 2.283-2.094.006-.02.01-.097-.038-.137-.049-.04-.12-.027-.172-.016-.073.016-1.238.739-3.495 2.169-.331.213-.63.317-.899.311-.296-.006-.865-.157-1.288-.286-.52-.158-.932-.242-.896-.51.019-.14.224-.284.617-.43Z"
                    fill="#fff"
                />
            </g>
            <defs>
                <clipPath id="clip0_3048_78838">
                    <path fill="#fff" d="M0 0h16v16H0z" />
                </clipPath>
            </defs>
        </svg>
    );
}
