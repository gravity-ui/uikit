import React from 'react';

import {Button} from '../../../Button/Button';
import type {ListItemId} from '../../types';
import {useListContext} from '../ListContext/ListContext';

interface ListControlsProps<T> {
    actionText: string;
    onActionClick(selectedItems: T[], selectedIds: Record<ListItemId, boolean>): void;
}

export function ListActionButton<T>({actionText, onActionClick}: ListControlsProps<T>) {
    const {size, selected, byId} = useListContext<T>();

    const handleActionClick = React.useCallback(() => {
        onActionClick(
            Object.entries(selected).reduce<T[]>((acc, [itemId, isSelected]) => {
                if (isSelected && byId[itemId]) {
                    acc.push(byId[itemId]);
                }

                return acc;
            }, []),
            selected,
        );
    }, [byId, onActionClick, selected]);

    return (
        <Button view="action" size={size} onClick={handleActionClick} width="max">
            {actionText}
        </Button>
    );
}
