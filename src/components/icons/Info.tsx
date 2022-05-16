import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export function Info(props: React.SVGProps<SVGSVGElement>) {
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
                d="M3.281 12.25c0-4.781 3.903-8.719 8.719-8.719 4.781 0 8.719 3.938 8.719 8.719 0 4.816-3.938 8.719-8.719 8.719a8.717 8.717 0 0 1-8.719-8.719Zm10.196-3.375c0-.809-.668-1.477-1.477-1.477-.844 0-1.477.668-1.477 1.477 0 .844.633 1.477 1.477 1.477.809 0 1.477-.633 1.477-1.477Zm.07 7.875c.21 0 .422-.176.422-.422v-.844a.454.454 0 0 0-.422-.421h-.422v-3.516a.454.454 0 0 0-.422-.422h-2.25a.427.427 0 0 0-.422.422v.844c0 .246.176.421.422.421h.422v2.25h-.422a.427.427 0 0 0-.422.422v.844c0 .246.176.422.422.422h3.094Z"
                fill="currentColor"
            />
        </svg>
    );
}
