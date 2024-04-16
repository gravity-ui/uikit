import React from 'react';

import {useIntersection} from '../../../../hooks';
import {Loader} from '../../../Loader/Loader';
import {Flex} from '../../../layout';
import {computeItemSize} from '../../../useList';
import type {ListItemSize} from '../../../useList';

export interface SelectLoadingIndicatorProps {
    size: ListItemSize;
    onIntersect: (() => void) | undefined;
}

export const SelectLoadingIndicator = ({size, onIntersect}: SelectLoadingIndicatorProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    useIntersection({element: ref.current, onIntersect});

    return (
        <Flex ref={ref} justifyContent="center" height={computeItemSize(size)}>
            <Loader />
        </Flex>
    );
};
