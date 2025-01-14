import * as React from 'react';

import {KeyCode} from '../../../constants';
import type {ListOnItemClick, UseListResult} from '../types';
import {findNextIndex} from '../utils/findNextIndex';
import {scrollToListItem} from '../utils/scrollToListItem';

interface UseListKeydownProps<T = unknown> {
    onItemClick?: ListOnItemClick;
    containerRef?: React.RefObject<HTMLDivElement>;
    enabled?: boolean;
    list: UseListResult<T>;
}

// Use this hook if you need keyboard support for tree structure lists
export const useListKeydown = ({containerRef, onItemClick, enabled, list}: UseListKeydownProps) => {
    const activateItem = React.useCallback(
        (index?: number, scrollTo = true) => {
            if (typeof index === 'number' && list.structure.visibleFlattenIds[index]) {
                if (scrollTo) {
                    scrollToListItem(
                        list.structure.visibleFlattenIds[index],
                        containerRef?.current,
                    );
                }

                list.state.setActiveItemId?.(list.structure.visibleFlattenIds[index]);
            }
        },
        [list.structure.visibleFlattenIds, list.state, containerRef],
    );

    const handleKeyMove = React.useCallback(
        (event: KeyboardEvent, step: number, defaultItemIndex = 0) => {
            event.preventDefault();

            const maybeIndex =
                typeof list.state.activeItemId === 'string'
                    ? list.structure.visibleFlattenIds.findIndex(
                          (i) => i === list.state.activeItemId,
                      )
                    : -1;

            const nextIndex = findNextIndex({
                list: list.structure.visibleFlattenIds,
                index: (maybeIndex > -1 ? maybeIndex : defaultItemIndex) + step,
                step: Math.sign(step),
                disabledItemsById: list.state.disabledById,
            });

            activateItem(nextIndex);
        },
        [
            activateItem,
            list.state.activeItemId,
            list.state.disabledById,
            list.structure.visibleFlattenIds,
        ],
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
                    if (
                        list.state.activeItemId &&
                        !list.state.disabledById[list.state.activeItemId]
                    ) {
                        event.preventDefault();

                        onItemClick?.({id: list.state.activeItemId});
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
    }, [
        containerRef,
        enabled,
        handleKeyMove,
        list.state.activeItemId,
        list.state.disabledById,
        onItemClick,
    ]);
};
