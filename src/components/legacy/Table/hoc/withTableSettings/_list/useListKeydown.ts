import * as React from 'react';

import {KeyCode} from '../../../../../../constants';
import {useLayoutEffect} from '../../../../../../hooks';

import {LIST_ITEM_DATA_ATR} from './constants';
import type {ListOnItemClick, UseListResult} from './types';

interface UseListKeydownProps<T = unknown> {
    onItemClick: ListOnItemClick;
    containerRef: React.RefObject<HTMLDivElement | null>;
    list: UseListResult<T>;
}

// Arrows move the active item around, Enter and Space click it
export const useListKeydown = ({containerRef, onItemClick, list}: UseListKeydownProps) => {
    const activateItem = React.useCallback(
        (index: number) => {
            const id = list.structure.visibleFlattenIds[index];

            if (id) {
                containerRef.current
                    ?.querySelector(`[${LIST_ITEM_DATA_ATR}="${id}"]`)
                    ?.scrollIntoView?.({block: 'nearest'});

                list.state.setActiveItemId(id);
            }
        },
        [list.structure.visibleFlattenIds, list.state, containerRef],
    );

    const handleKeyMove = React.useCallback(
        (event: KeyboardEvent, step: number, defaultItemIndex = 0) => {
            event.preventDefault();

            const ids = list.structure.visibleFlattenIds;
            const activeIndex =
                typeof list.state.activeItemId === 'string'
                    ? ids.findIndex((id) => id === list.state.activeItemId)
                    : -1;
            const index = (activeIndex > -1 ? activeIndex : defaultItemIndex) + step;

            if (ids.length) {
                activateItem((index + ids.length) % ids.length);
            }
        },
        [activateItem, list.state.activeItemId, list.structure.visibleFlattenIds],
    );

    useLayoutEffect(() => {
        const anchor = containerRef.current;

        if (!anchor) {
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
                    if (list.state.activeItemId) {
                        event.preventDefault();

                        onItemClick({id: list.state.activeItemId});
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
    }, [containerRef, handleKeyMove, list.state.activeItemId, onItemClick]);
};
