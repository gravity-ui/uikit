import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export function Alarm(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            {...a11yHiddenSvgProps}
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m13.441 4.094 8.438 14.66c.633 1.125-.176 2.496-1.477 2.496H3.562c-1.3 0-2.109-1.406-1.476-2.496l8.437-14.66c.633-1.125 2.286-1.09 2.918 0Zm-2.592 12.08c.29-.294.694-.479 1.151-.479.879 0 1.617.739 1.617 1.617 0 .395-.137.75-.364 1.027a1.62 1.62 0 0 1-1.253.59 1.591 1.591 0 0 1-1.617-1.616 1.62 1.62 0 0 1 .466-1.139Zm-.31-6.578a.381.381 0 0 0-.086.299l.246 4.78c.035.247.211.388.422.388h1.723a.408.408 0 0 0 .32-.147.478.478 0 0 0 .102-.24l.246-4.781c.035-.247-.176-.457-.422-.457h-2.215a.438.438 0 0 0-.336.158Z"
                fill="currentColor"
            />
        </svg>
    );
}
