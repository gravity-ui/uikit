import * as React from 'react';

import {getListParsedState} from '../utils/getListParsedState';
import type {GetListParsedStateProps} from '../utils/getListParsedState';

export interface UseListParsedStateProps<T> extends GetListParsedStateProps<T> {}

/**
 * From the tree structure of list items we get meta information and
 * flatten list in right order without taking elements that hidden in expanded groups
 */
export function useListParsedState<T>({
    items,
    getItemId: propsGetItemId,
    defaultExpandedState,
}: UseListParsedStateProps<T>) {
    const getItemId = React.useRef(propsGetItemId).current;

    const result = React.useMemo(() => {
        return getListParsedState<T>({items, getItemId, defaultExpandedState});
    }, [getItemId, defaultExpandedState, items]);

    return result;
}
