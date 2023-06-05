import React from 'react';

import {a11yHiddenSvgProps} from '../utils/svg';

export function Chevron(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M3.50172 5.44253C3.19384 5.16544 2.71962 5.19039 2.44253 5.49828C2.16544 5.80616 2.19039 6.28038 2.49828 6.55747L3.50172 5.44253ZM8 10.5L7.49828 11.0575C7.7835 11.3142 8.2165 11.3142 8.50172 11.0575L8 10.5ZM13.5017 6.55747C13.8096 6.28038 13.8346 5.80616 13.5575 5.49828C13.2804 5.19039 12.8062 5.16544 12.4983 5.44253L13.5017 6.55747ZM2.49828 6.55747L7.49828 11.0575L8.50172 9.94253L3.50172 5.44253L2.49828 6.55747ZM8.50172 11.0575L13.5017 6.55747L12.4983 5.44253L7.49828 9.94253L8.50172 11.0575Z" />
        </svg>
    );
}
