'use client';

import * as React from 'react';

import {useIntersection} from '../../../../hooks';
import {Loader} from '../../../Loader/Loader';
import {selectListBlock} from '../../constants';

export const SelectLoadingIndicator = (props: {onIntersect?: () => void}) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    useIntersection({element: ref.current, onIntersect: props?.onIntersect});

    return (
        <div ref={ref} className={selectListBlock('loading-indicator')}>
            <Loader />
        </div>
    );
};
