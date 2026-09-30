'use client';

import * as React from 'react';

// eslint-disable-next-line no-restricted-imports
import {Draggable} from '@hello-pangea/dnd';
// eslint-disable-next-line no-restricted-imports
import type {DraggableProvided} from '@hello-pangea/dnd';

import {useLayoutEffect} from '../../hooks/useLayoutEffect';
import {ListSectionHeader} from '../List/SectionHeader';
import {composeItemProps} from '../List/composeItemProps';
import type {ListItemContext, ListItemHelpers} from '../List/types';
import {ListItemView} from '../ListItemView/ListItemView';
import type {QAProps} from '../types';
import {warnOnce} from '../utils/warn';

import {HelloPangeaDragHandle} from './HelloPangeaDragHandle';
import {HelloPangeaKitContext} from './context';
import type {HelloPangeaRowSnapshot} from './context';
import {FLAT_LISTS_ONLY, getHelloPangeaRowProps} from './getHelloPangeaRowProps';

export interface ListHelloPangeaDndRowProps<T> extends QAProps {
    ctx: ListItemContext<T>;
    helpers: ListItemHelpers;
    /** default: `ctx.content` */
    children?: React.ReactNode;
    startContent?: React.ReactNode;
    description?: React.ReactNode;
    endContent?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    /** The accessible name of the handle. default: "Drag to reorder" */
    handleLabel?: string;
    /**
     * The edge of the row the handle sits at: `start` — the outermost slot of the view, `end` —
     *  after `endContent`. default: `'start'`
     */
    handlePlacement?: 'start' | 'end';
}

function withHandle(
    handle: React.ReactNode,
    placement: 'start' | 'end',
    endContent: React.ReactNode,
): {dragHandle?: React.ReactNode; endContent?: React.ReactNode} {
    if (placement === 'start') {
        return {dragHandle: handle, endContent};
    }
    return {
        endContent: (
            <React.Fragment>
                {endContent}
                {handle}
            </React.Fragment>
        ),
    };
}

/**
 * A draggable row of `ListHelloPangeaDnd`: `Draggable` around `List.ItemView`, the handle and the
 *  content in cells of their own. The default row of the wrapper; render it in `renderItem` to fill
 *  the slots of the view
 */
export function ListHelloPangeaDndRow<T>({
    ctx,
    helpers,
    children,
    startContent,
    description,
    endContent,
    className,
    style,
    qa,
    handleLabel,
    handlePlacement = 'start',
}: ListHelloPangeaDndRowProps<T>) {
    const kit = React.useContext(HelloPangeaKitContext);
    if (!kit) {
        throw new Error('[ListHelloPangeaDnd.Row] Render the row inside ListHelloPangeaDnd.');
    }
    const {registry} = kit;
    const content = children === undefined ? ctx.content : children;
    const viewState = helpers.getItemViewProps();

    // The clone shows the state of the row (selection); the cursor and the hover are its own
    const {active: _active, hovered: _hovered, ...cloneState} = viewState;
    const snapshot: HelloPangeaRowSnapshot = {
        viewProps: {...cloneState, startContent, description, endContent, className, style},
        children: content,
        handleLabel,
        handlePlacement,
    };
    // Under virtualization the dragged row is drawn by a clone from the last snapshot of the row:
    // the original renders nothing meanwhile and may be unmounted altogether
    useLayoutEffect(() => {
        registry.set(ctx.id, snapshot);
    });
    useLayoutEffect(() => () => registry.release(ctx.id), [registry, ctx.id]);

    const own = {className, style, 'data-qa': qa};
    const index = ctx.kind === 'item' ? kit.getIndex(ctx.id) : undefined;
    if (index === undefined) {
        warnOnce(FLAT_LISTS_ONLY);
        return ctx.kind === 'section' ? (
            <ListSectionHeader {...helpers.getItemProps()} {...viewState}>
                {content}
            </ListSectionHeader>
        ) : (
            <ListItemView
                {...helpers.getItemProps(own)}
                {...viewState}
                startContent={startContent}
                description={description}
                endContent={endContent}
            >
                <span {...helpers.getCellProps()}>{content}</span>
            </ListItemView>
        );
    }

    return (
        <Draggable
            draggableId={ctx.id}
            index={index}
            isDragDisabled={ctx.state.disabled || Boolean(kit.isDragDisabled?.(ctx.item))}
        >
            {(provided, dragSnapshot) => {
                const {rowProps, handleProps, cellProps} = getHelloPangeaRowProps({
                    ctx,
                    helpers,
                    provided,
                    snapshot: dragSnapshot,
                    handleLabel,
                });
                const handle = (
                    <span {...cellProps}>
                        <HelloPangeaDragHandle {...handleProps} />
                    </span>
                );
                return (
                    <ListItemView
                        {...composeItemProps(rowProps, own)}
                        {...viewState}
                        startContent={startContent}
                        description={description}
                        {...withHandle(handle, handlePlacement, endContent)}
                    >
                        <span {...cellProps}>{content}</span>
                    </ListItemView>
                );
            }}
        </Draggable>
    );
}

/** The default clone of a dragged row under virtualization: a visual copy, outside the list */
export function HelloPangeaRowClone({
    snapshot,
    provided,
}: {
    snapshot: HelloPangeaRowSnapshot;
    provided: DraggableProvided;
}) {
    const {viewProps, children, handleLabel, handlePlacement} = snapshot;
    const handle = (
        <HelloPangeaDragHandle {...(provided.dragHandleProps ?? undefined)} label={handleLabel} />
    );
    return (
        <ListItemView
            {...viewProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={{
                ...viewProps.style,
                ...(provided.draggableProps.style as React.CSSProperties | undefined),
                opacity: 0.5,
            }}
            active
            hovered={false}
            {...withHandle(handle, handlePlacement, viewProps.endContent)}
        >
            {children}
        </ListItemView>
    );
}
