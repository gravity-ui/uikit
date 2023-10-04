import React from 'react';

import type {ListItemType, ParsedState} from '../../types';
import {flattenItems} from '../../utils/flattenItems';
import {parseDataWithChildren} from '../../utils/parseDataWithChildren';

export function usePreparedItemsState<T>(
    items: ListItemType<T>[],
    expandedState?: Record<string, boolean>,
) {
    const isFirstRenderRef = React.useRef(true);
    const [state, setState] = React.useState<ParsedState<T>>(() => parseDataWithChildren<T>(items));
    const [order, setOrder] = React.useState(() => flattenItems(items, expandedState));

    React.useEffect(() => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
        } else {
            setState(parseDataWithChildren<T>(items));
            setOrder(flattenItems(items, expandedState));
        }
    }, [items, expandedState]);

    return [{order, ...state}];
}
