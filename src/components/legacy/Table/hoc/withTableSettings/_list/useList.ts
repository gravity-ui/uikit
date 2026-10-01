import * as React from 'react';

import type {ListItemId, ListState, UseListResult} from './types';

interface UseListProps<T> {
    items: T[];
    selectedById: ListState['selectedById'];
    setSelected: ListState['setSelected'];
}

/**
 * A flat list with a controlled selection: the ids of the items in their order and the active item
 */
export const useList = <T extends {id: ListItemId}>({
    items,
    selectedById,
    setSelected,
}: UseListProps<T>): UseListResult<T> => {
    const [activeItemId, setActiveItemId] = React.useState<ListItemId>();

    const structure = React.useMemo(() => {
        const itemsById: Record<ListItemId, T> = {};
        const visibleFlattenIds: ListItemId[] = [];

        items.forEach((item, index) => {
            const id = item.id || String(index);

            itemsById[id] = item;
            visibleFlattenIds.push(id);
        });

        return {itemsById, visibleFlattenIds};
    }, [items]);

    return {
        state: {selectedById, setSelected, activeItemId, setActiveItemId},
        structure,
    };
};
