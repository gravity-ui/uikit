import React from 'react';
import {a11yHiddenSvgProps} from '../utils/svg';

export function Success(props: React.SVGProps<SVGSVGElement>) {
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
                d="M12 3.531c4.781 0 8.719 3.938 8.719 8.719 0 4.816-3.938 8.719-8.719 8.719a8.717 8.717 0 0 1-8.719-8.719c0-4.781 3.903-8.719 8.719-8.719Zm-1.828 13.36c.21.21.598.21.808 0l6.47-6.47a.596.596 0 0 0 0-.808l-.81-.773a.497.497 0 0 0-.773 0l-5.273 5.273-2.496-2.46a.497.497 0 0 0-.774 0l-.808.773a.596.596 0 0 0 0 .808l3.656 3.657Z"
                fill="currentColor"
            />
        </svg>
    );
}
