'use client';

import * as React from 'react';

import {useIntersection} from '../../../../hooks';
import {Loader} from '../../../Loader/Loader';
import {selectListBlock} from '../../constants';

export const SelectLoadingIndicator = (props: {onIntersect?: () => void}) => {
    // State rather than a ref: the observer is attached in an effect, and a ref filled during the
    // commit does not re-run it. The row of the list renders once and is memoized after that, so
    // there is no second render to pick the element up
    const [element, setElement] = React.useState<HTMLDivElement | null>(null);

    useIntersection({element, onIntersect: props?.onIntersect});

    return (
        <div ref={setElement} className={selectListBlock('loading-indicator')}>
            <Loader />
        </div>
    );
};
