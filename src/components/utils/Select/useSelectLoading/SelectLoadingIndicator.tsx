import React from 'react';

import {Loader} from '../../../Loader/Loader';
import {selectBlock} from '../../../Select/constants';
import {useIntersection} from '../../useIntersection';

import './SelectLoadingIndicator.scss';

export const SelectLoadingIndicator = (props: {onIntersect?: () => void}) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    useIntersection({element: ref.current, onIntersect: props?.onIntersect});

    return (
        <div className={selectBlock('loading-indicator')} ref={ref}>
            <Loader />
        </div>
    );
};
