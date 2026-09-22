import * as React from 'react';

import {useLayoutEffect} from '../../../hooks';
import {getItemDomId} from '../../List/utils';
import type {FlattenOption} from '../utils';
import {isSelectGroupTitle, scrollToItem} from '../utils';

/** How many quiet frames end the watch, and how many frames it lasts at most */
const SETTLED_FRAMES = 3;
const MAX_FRAMES = 20;

export interface UseAlignActiveOptionProps {
    /** The id of the list: the DOM id of a row is built from it */
    listId: string;
    /** The root of the list — it is the scroll container as well */
    containerRef: React.RefObject<HTMLElement | null>;
    /** The active option; `undefined` while the list is closed */
    activeItemId?: string;
    /** The rows in the order the core lays them out (the loading row included) */
    rows: FlattenOption[];
    /** The height a row comes out as — the very estimate the virtualizer is given */
    getItemHeight: (row: FlattenOption, index: number) => number;
}

/**
 * Brings the active option into view when the list opens — the core scrolls on a keyboard gesture of
 * its own only. It scrolls the root of the list rather than calling `scrollIntoView`, so that a popup
 * hanging off the viewport edge never drags the page along.
 *
 * TODO: this belongs to the list itself — once `ListVirtualizer` hands out its virtualizer
 * (`scrollToIndex` does the same waiting on its own), the alignment moves into the core.
 */
export function useAlignActiveOption({
    listId,
    containerRef,
    activeItemId,
    rows,
    getItemHeight,
}: UseAlignActiveOptionProps) {
    const activeItemIdRef = React.useRef(activeItemId);
    activeItemIdRef.current = activeItemId;

    const getItemHeightRef = React.useRef(getItemHeight);
    getItemHeightRef.current = getItemHeight;

    const rowsRef = React.useRef(rows);
    rowsRef.current = rows;

    /** The offset the watch left behind: anything else means the reader has taken the scroll over */
    const alignedScrollTopRef = React.useRef<number | undefined>(undefined);
    /** The pointer is over the list: the activity follows it, and the rows must stay where they are */
    const pointerInsideRef = React.useRef(false);
    const startedRef = React.useRef(false);
    const previousActiveItemIdRef = React.useRef<string | undefined>(undefined);

    /**
     * Returns whether the row has settled: the virtualizer keeps correcting the total size while it
     * measures the rows it has rendered, and the row drifts along with it — until it does, the
     * alignment is repeated
     */
    const alignActiveRow = React.useCallback(() => {
        const container = containerRef.current;
        const activeId = activeItemIdRef.current;

        if (!container || activeId === undefined) {
            return true;
        }

        const node = document.getElementById(getItemDomId(listId, activeId));

        if (!node) {
            // The row is not rendered yet: under virtualization the first window is empty and
            // starts at the top of the list. The offset is summed from the very heights the
            // virtualizer is given, so that its first window is already the right one
            let offset = 0;

            for (let index = 0; index < rowsRef.current.length; index += 1) {
                const row = rowsRef.current[index];
                const rowHeight = getItemHeightRef.current(row, index);

                if (!isSelectGroupTitle(row) && row.value === activeId) {
                    container.scrollTop = Math.max(0, offset + rowHeight - container.offsetHeight);
                    alignedScrollTopRef.current = container.scrollTop;
                    break;
                }

                offset += rowHeight;
            }

            return false;
        }

        scrollToItem(container, node);
        alignedScrollTopRef.current = container.scrollTop;

        const nodeRect = node.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        return (
            nodeRect.height >= containerRect.height ||
            (nodeRect.top >= containerRect.top - 1 && nodeRect.bottom <= containerRect.bottom + 1)
        );
    }, [containerRef, listId]);

    // A press or a move of the mouse makes a row active as much as a key does, and the list must
    // not move under the cursor — the core scrolls the row into view on a key of its own anyway
    React.useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return undefined;
        }

        const onEnter = () => {
            pointerInsideRef.current = true;
        };
        const onLeave = () => {
            pointerInsideRef.current = false;
        };

        container.addEventListener('pointerenter', onEnter);
        container.addEventListener('pointerleave', onLeave);

        return () => {
            container.removeEventListener('pointerenter', onEnter);
            container.removeEventListener('pointerleave', onLeave);
        };
    }, [containerRef, activeItemId === undefined]);

    useLayoutEffect(() => {
        if (activeItemId === undefined) {
            startedRef.current = false;
            previousActiveItemIdRef.current = undefined;
            alignedScrollTopRef.current = undefined;
            return undefined;
        }

        const activeItemChanged = previousActiveItemIdRef.current !== activeItemId;
        previousActiveItemIdRef.current = activeItemId;
        const opening = !startedRef.current;
        startedRef.current = true;

        if (!opening) {
            // The rows changed under an option that stayed active. Bringing it back is right only
            // while the list stands where the watch left it: once the reader has scrolled — to the
            // loader at the bottom, say — the rows that arrive must not throw them back
            if (
                !activeItemChanged &&
                containerRef.current?.scrollTop !== alignedScrollTopRef.current
            ) {
                return undefined;
            }

            if (activeItemChanged && pointerInsideRef.current) {
                return undefined;
            }
        }

        let frame = 0;
        let settledFrames = 0;
        let request = 0;

        const tick = () => {
            settledFrames = alignActiveRow() ? settledFrames + 1 : 0;
            frame += 1;

            // The corrections of the virtualizer arrive over several frames, and the row settles
            // and drifts again in between — hence a few quiet frames rather than the first hit.
            // The cap ends the watch for a list that never settles
            if (settledFrames >= SETTLED_FRAMES || frame > MAX_FRAMES) {
                return;
            }

            request = requestAnimationFrame(tick);
        };

        tick();

        return () => cancelAnimationFrame(request);
        // The rows are a dependency of their own: inserted or resized rows move the active one
        // without changing its id, and the watch has to start again to bring it back into view
    }, [activeItemId, alignActiveRow, rows, getItemHeight]);
}
