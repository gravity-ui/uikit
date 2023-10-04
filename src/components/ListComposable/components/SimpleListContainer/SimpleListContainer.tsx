import React from 'react';

import type {ListContainerRenderProps} from '../../types';

export const SimpleListContainer = React.forwardRef(function <T>(
    {items, children, className}: ListContainerRenderProps<T>,
    ref: any,
) {
    return (
        <ul ref={ref} className={className}>
            {items.map((item, index) => children({id: index, item}))}
        </ul>
    );
});

SimpleListContainer.displayName = 'SimpleListContainer';
