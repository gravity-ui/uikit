import React from 'react';

import {useIntersection} from '../../../utils/useIntersection';

interface IntersectionContainerProps {
    children: React.JSX.Element;
    onIntersect?: () => void;
}

export const IntersectionContainer = ({children, onIntersect}: IntersectionContainerProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    useIntersection({element: ref.current, onIntersect});

    if (!onIntersect) {
        return children;
    }

    return <div ref={ref}>{children}</div>;
};
