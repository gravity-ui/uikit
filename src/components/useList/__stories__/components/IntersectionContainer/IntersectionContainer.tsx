import * as React from 'react';

import {useIntersection} from '../../../../../hooks';

interface IntersectionContainerProps {
    children: React.JSX.Element;
    onIntersect?: () => void;
}

export const IntersectionContainer = ({children, onIntersect}: IntersectionContainerProps) => {
    // `state` instead of `ref` here to trigger component rerender
    const [ref, setRef] = React.useState<Element | null>(null);

    useIntersection({element: ref, onIntersect});

    if (onIntersect) {
        return <div ref={setRef}>{children}</div>;
    }

    return children;
};
