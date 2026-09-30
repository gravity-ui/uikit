import type * as React from 'react';

// eslint-disable-next-line no-restricted-imports
import type {
    DraggableProvided,
    DraggableProvidedDragHandleProps,
    DraggableStateSnapshot,
} from '@hello-pangea/dnd';

import type {
    ListCellDOMProps,
    ListItemContext,
    ListItemDOMProps,
    ListItemHelpers,
} from '../List/types';
import {warnOnce} from '../utils/warn';

import {toContainingBlock, trackElement} from './fixedPosition';
import {forwardDetachedTouches} from './forwardDetachedTouches';
import i18n from './i18n';

/** The row is a section header or an option of a section: the kit covers flat lists only */
export const FLAT_LISTS_ONLY = '[ListHelloPangeaDnd] Flat lists only: sections are not draggable.';

/**
 * `dragHandleProps` of the library in the grid contract. While the row cannot be dragged the
 *  library gives none: the handle is decorative then — `aria-hidden`, no accessible name, and
 *  not focusable (←/→ would otherwise move the focus into a hidden element)
 */
export type HelloPangeaHandleDOMProps = Partial<DraggableProvidedDragHandleProps> & {
    /** Keeps a touch drag alive when the library unmounts the handle for a clone */
    onTouchStart?: (event: React.TouchEvent<HTMLElement>) => void;
    tabIndex?: -1;
    'aria-label'?: string;
    'aria-hidden'?: true;
};

export interface GetHelloPangeaRowPropsResult {
    /** The props of the row element: the core props with the draggable props of the library composed in */
    rowProps: ListItemDOMProps;
    /** The props of the drag handle — for `HelloPangeaDragHandle` or an element of your own */
    handleProps: HelloPangeaHandleDOMProps;
    /** The props of a cell: wrap the handle and the content in a cell each (grid) */
    cellProps: ListCellDOMProps;
}

export interface GetHelloPangeaRowPropsOptions<T> {
    ctx: ListItemContext<T>;
    helpers: ListItemHelpers;
    /** The first argument of the render function of `Draggable` */
    provided: DraggableProvided;
    /** The second argument of the render function of `Draggable` */
    snapshot: DraggableStateSnapshot;
    /** The accessible name of the handle. default: "Drag to reorder" */
    handleLabel?: string;
}

/**
 * The wiring of a custom row inside `Draggable`: the draggable props and the ref of the library
 *  composed into the props of the row, the handle props in the grid contract, the cell props
 */
export function getHelloPangeaRowProps<T>({
    ctx,
    helpers,
    provided,
    snapshot,
    handleLabel,
}: GetHelloPangeaRowPropsOptions<T>): GetHelloPangeaRowPropsResult {
    if (ctx.kind === 'section') {
        warnOnce(FLAT_LISTS_ONLY);
    }
    const cellProps = helpers.getCellProps();
    if (cellProps.role === undefined) {
        warnOnce(
            '[ListHelloPangeaDnd] Pass `role="grid"` to the List: the drag handle is interactive, valid in a grid only.',
        );
    }
    const {style, ...draggableProps} = provided.draggableProps;
    const tracked = trackElement(provided.innerRef);
    const rowProps = helpers.getItemProps({
        ...draggableProps,
        ref: tracked.ref,
        style: {
            ...toContainingBlock(
                style as React.CSSProperties | undefined,
                tracked.element?.parentElement,
            ),
            // The inline `transition: opacity` of the library is meant for combining, which is
            // not used: during an active drag it would apply the ghost styles of the list out of
            // sync (the background at once, the opacity through the transition). The drop
            // animation stays as is
            ...(snapshot.isDragging && !snapshot.isDropAnimating
                ? {transition: 'none'}
                : undefined),
        },
    });
    return {
        rowProps,
        handleProps: provided.dragHandleProps
            ? {
                  ...provided.dragHandleProps,
                  onTouchStart: forwardDetachedTouches,
                  tabIndex: -1,
                  'aria-label': handleLabel ?? i18n('label_drag-handle'),
              }
            : {'aria-hidden': true},
        cellProps,
    };
}
