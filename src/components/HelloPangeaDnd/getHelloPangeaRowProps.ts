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

import i18n from './i18n';

/**
 * `dragHandleProps` of the library in the grid contract. While the row cannot be dragged the
 *  library gives none: the handle is decorative then — `aria-hidden`, no accessible name
 */
export type HelloPangeaHandleProps = Partial<DraggableProvidedDragHandleProps> & {
    tabIndex: -1;
    'aria-label'?: string;
    'aria-hidden'?: true;
};

export interface HelloPangeaRowProps {
    /** The props of the row element: the core props with the draggable props of the library composed in */
    rowProps: ListItemDOMProps;
    /** The props of the drag handle — for `HelloPangeaDragHandle` or an element of your own */
    handleProps: HelloPangeaHandleProps;
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
}: GetHelloPangeaRowPropsOptions<T>): HelloPangeaRowProps {
    if (ctx.kind === 'section') {
        warnOnce(
            '[ListHelloPangeaDnd] Flat lists only: a section header cannot be dragged, and the indexes of the library are counted over the top level of `items`.',
        );
    }
    const cellProps = helpers.getCellProps();
    if (cellProps.role === undefined) {
        warnOnce(
            '[ListHelloPangeaDnd] Pass `role="grid"` to the List: the drag handle is a button, and interactive content inside a row is valid in the grid role model only.',
        );
    }
    const {style, ...draggableProps} = provided.draggableProps;
    const rowProps = helpers.getItemProps({
        ...draggableProps,
        ref: provided.innerRef,
        style: {
            ...(style as React.CSSProperties | undefined),
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
                  tabIndex: -1,
                  'aria-label': handleLabel ?? i18n('label_drag-handle'),
              }
            : {tabIndex: -1, 'aria-hidden': true},
        cellProps,
    };
}
