import React from 'react';

import {useIntersection} from '../../../../hooks';
import {Loader} from '../../../Loader/Loader';
import {SelectQa, selectListBlock} from '../../constants';

export const SelectLoadingIndicator = (props: {onIntersect?: () => void}) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    useIntersection({element: ref.current, onIntersect: props?.onIntersect});

    return (
        <div
            ref={ref}
            className={selectListBlock('loading-indicator')}
            data-qa={SelectQa.SELECT_LOADING_INDICATOR}
        >
            <Loader />
        </div>
    );
};
