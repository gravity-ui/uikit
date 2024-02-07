import React from 'react';

import {KeyCode} from '../../../constants';
import type {ListItemId, ListState} from '../types';
import {findNextIndex} from '../utils/findNextIndex';
import {scrollToListItem} from '../utils/scrollToListItem';

interface UseListKeydownProps extends Partial<Pick<ListState, 'disabledById' | 'activeItemId'>> {
    visibleFlattenIds: ListItemId[];
    onItemClick?(itemId: ListItemId): void;
    containerRef?: React.RefObject<HTMLDivElement>;
    setActiveItemId?(id: ListItemId): void;
    enabled?: boolean;
}

// Use this hook if you need keyboard support for tree structure lists
export const useListKeydown = ({
    visibleFlattenIds,
    onItemClick,
    containerRef,
    disabledById = {},
    activeItemId,
    setActiveItemId,
    enabled,
}: UseListKeydownProps) => {
    const activateItem = React.useCallback(
        (index?: number, scrollTo = true) => {
            if (typeof index === 'number' && visibleFlattenIds[index]) {
                if (scrollTo) {
                    scrollToListItem(visibleFlattenIds[index], containerRef?.current);
                }

                setActiveItemId?.(visibleFlattenIds[index]);
            }
        },
        [containerRef, visibleFlattenIds, setActiveItemId],
    );

    const handleKeyMove = React.useCallback(
        (event: KeyboardEvent, step: number, defaultItemIndex = 0) => {
            event.preventDefault();

            const maybeIndex = visibleFlattenIds.findIndex((i) => i === activeItemId);

            const nextIndex = findNextIndex({
                list: visibleFlattenIds,
                index: (maybeIndex > -1 ? maybeIndex : defaultItemIndex) + step,
                step: Math.sign(step),
                disabledItems: disabledById,
            });

            activateItem(nextIndex);
        },
        [activateItem, activeItemId, disabledById, visibleFlattenIds],
    );

    React.useLayoutEffect(() => {
        const anchor = containerRef?.current;

        if (enabled || !anchor) {
            return undefined;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case KeyCode.ARROW_DOWN: {
                    handleKeyMove(event, 1, -1);
                    break;
                }
                case KeyCode.ARROW_UP: {
                    handleKeyMove(event, -1);
                    break;
                }
                case KeyCode.SPACEBAR:
                case KeyCode.ENTER: {
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
    }, [activeItemId, containerRef, disabledById, enabled, handleKeyMove, onItemClick]);
};
