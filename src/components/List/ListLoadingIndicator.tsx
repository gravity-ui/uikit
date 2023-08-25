import React from 'react';

import {Loader} from '../Loader';
import {block} from '../utils/cn';
import {useIntersection} from '../utils/useIntersection';

const b = block('list');
export const SelectLoadingIndicator = (props: {onIntersect?: () => void}) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    useIntersection({element: ref.current, onIntersect: props?.onIntersect});

    return (
        <div ref={ref} className={b('loading-indicator')}>
            <Loader />
        </div>
    );
};
