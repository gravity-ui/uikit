import React from 'react';

import type {ListItemId, ListState} from '../types';
import {findNextIndex} from '../utils/findNextIndex';
import {scrollToListItem} from '../utils/scrollToListItem';

interface UseListKeydownProps extends Partial<Pick<ListState, 'disabledById' | 'activeItemId'>> {
    flattenIdsOrder: ListItemId[];
    onItemClick?(itemId: ListItemId): void;
    containerRef?: React.RefObject<HTMLDivElement>;
    setActiveItemId?(id: ListItemId): void;
    enactive?: boolean;
}

// Use this hook if you need keyboard support for tree structure lists
export const useListKeydown = ({
    flattenIdsOrder,
    onItemClick,
    containerRef,
    disabledById = {},
    activeItemId,
    setActiveItemId,
    enactive,
}: UseListKeydownProps) => {
    const activateItem = React.useCallback(
        (index?: number, scrollTo = true) => {
            if (typeof index === 'number' && flattenIdsOrder[index]) {
                if (scrollTo) {
                    scrollToListItem(flattenIdsOrder[index], containerRef?.current);
                }

                setActiveItemId?.(flattenIdsOrder[index]);
            }
        },
        [containerRef, flattenIdsOrder, setActiveItemId],
    );

    const handleKeyMove = React.useCallback(
        (event: KeyboardEvent, step: number, defaultItemIndex = 0) => {
            event.preventDefault();

            const maybeIndex = flattenIdsOrder.findIndex((i) => i === activeItemId);

            const nextIndex = findNextIndex({
                list: flattenIdsOrder,
                index: (maybeIndex > -1 ? maybeIndex : defaultItemIndex) + step,
                step: Math.sign(step),
                disabledItems: disabledById,
            });

            activateItem(nextIndex);
        },
        [activateItem, activeItemId, disabledById, flattenIdsOrder],
    );

    React.useLayoutEffect(() => {
        const anchor = containerRef?.current;

        if (enactive || !anchor) {
            return undefined;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowDown': {
                    handleKeyMove(event, 1, -1);
                    break;
                }
                case 'ArrowUp': {
                    handleKeyMove(event, -1);
                    break;
                }
                case ' ':
                case 'Enter': {
                    if (activeItemId && !disabledById[activeItemId]) {
                        event.preventDefault();

                        onItemClick?.(activeItemId);
                    }
                    break;
                }
                default: {
                }
            }
        };

        anchor.addEventListener('keydown', handleKeyDown);

        return () => {
            anchor.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeItemId, containerRef, disabledById, enactive, handleKeyMove, onItemClick]);
};
