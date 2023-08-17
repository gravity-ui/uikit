import React from 'react';

import {Loader} from '../../../Loader/Loader';
import {useIntersection} from '../../../utils/useIntersection';
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
