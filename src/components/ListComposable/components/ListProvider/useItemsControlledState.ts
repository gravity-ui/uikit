import React from 'react';

import type {ListItemType} from '../../types';

export function useItemsControlledState<T>(_items: ListItemType<T>[]) {
    const isFirstRenderRef = React.useRef(true);
    const [items, setItems] = React.useState(() => _items);

    React.useEffect(() => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
        } else {
            setItems(_items);
        }
    }, [_items]);

    return [items, setItems] as const;
}
