'use client';

import * as React from 'react';

import {useIntersection} from '../../hooks';
import {Loader} from '../Loader';
import {block} from '../utils/cn';

const b = block('list');
export const ListLoadingIndicator = (props: {onIntersect?: () => void}) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    useIntersection({element: ref.current, onIntersect: props?.onIntersect});

    return (
        <div ref={ref} className={b('loading-indicator')}>
            <Loader qa={'list-loader'} />
        </div>
    );
};
