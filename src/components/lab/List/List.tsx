'use client';

import * as React from 'react';

import {block} from '../../utils/cn';
import {warnOnce} from '../../utils/warn';
import {ListItemView} from '../ListItemView/ListItemView';
import type {ListItemViewProps as LabListItemViewProps} from '../ListItemView/ListItemView';

import {ListSectionHeader} from './SectionHeader';
import {ListVirtualizationContext} from './VirtualizationContext';
import {composeItemProps} from './composeItemProps';
import type {
    ListCellDOMProps,
    ListItemContext,
    ListItemDOMProps,
    ListItemHelpers,
    ListProps,
    ListPropsOverrides,
    ListRole,
    ListSize,
} from './types';
import {useList} from './useList';

import './List.scss';

const b = block('list-v2');

// The row height estimation used before the first render by the
// virtualization layer: the min-height of the default view (border-box,
// single-line content); the spread of the actual heights is covered by measure
const ESTIMATED_ITEM_SIZE: Record<ListSize, number> = {s: 24, m: 28, l: 32, xl: 36};

/**
 * The props of `List.ItemView` — the presentational subset of the lab row
 * view. The rest of its props are outside the contract of the list and are
 * cut out of the type: `collapsible`/`collapsed`/`onCollapseChange`/
 * `nestedLevel` come back with the tree list; `isContainer` and
 * `componentProps` bypass the composition of getItemProps (the className of
 * componentProps silently replaces the className of the row); `draggable` is
 * a slot of the view rather than the native attribute (see ListPropsOverrides)
 */
type ListItemViewProps<T extends React.ElementType = 'div'> = Omit<
    LabListItemViewProps<T>,
    | 'collapsible'
    | 'collapsed'
    | 'onCollapseChange'
    | 'nestedLevel'
    | 'isContainer'
    | 'componentProps'
    | 'draggable'
> &
    Omit<React.ComponentPropsWithRef<T>, keyof LabListItemViewProps<T>>;

type ListItemViewComponent = <T extends React.ElementType = 'div'>(
    props: ListItemViewProps<T>,
) => React.ReactElement;

/**
 * A stable dispatcher of the core getters for memoized rows: the object itself
 * lives for as long as the list is mounted and calls into the CURRENT core
 * instance through a ref — a row that skipped a re-render is not left with a
 * stale closure
 */
interface ListRowCore {
    getItemProps: (id: string, overrides?: ListPropsOverrides) => ListItemDOMProps;
    getCellProps: (overrides?: ListPropsOverrides) => ListCellDOMProps;
}

interface ListRowProps<T> {
    ctx: ListItemContext<T>;
    /**
     * The memo invalidator for the outputs of getItemProps that are not
     * expressed in ctx (the DOM id, the roving tab stop without an active row,
     * the aria numbering under virtualization) — the values are computed by
     * the core, the row does not interpret the key
     */
    memoKey: string;
    size: ListSize;
    selectionStyle: 'check' | 'highlight';
    /** A drag is in progress: the CSS hover of the view is suppressed */
    dragActive: boolean;
    /** The ARIA role of the list: in grid the default render puts the content into a cell */
    role: ListRole;
    renderItem: ListProps<T>['renderItem'];
    core: ListRowCore;
}

function ListRowComponent<T>({
    ctx,
    size,
    selectionStyle,
    dragActive,
    role,
    renderItem,
    core,
}: ListRowProps<T>) {
    const helpers: ListItemHelpers = {
        getItemProps: (overrides) => core.getItemProps(ctx.id, overrides),
        getCellProps: (overrides) => core.getCellProps(overrides),
        getItemViewProps: () => {
            // A section header has no state: the size is all it takes, so the
            // object spreads on List.SectionHeader without stray DOM attributes
            if (ctx.kind === 'section') {
                return {size};
            }
            return {
                size,
                // The dark active color is the keyboard cursor, and the cursor
                // belongs to the list the user is driving: while the mouse is
                // in use, or while the list holds no DOM focus, the active row
                // is highlighted by the plain CSS :hover as long as the mouse
                // is over it, and no dark trail stays behind
                active: Boolean(ctx.state.active && ctx.state.cursorVisible),
                disabled: ctx.state.disabled,
                // selected and selectionStyle travel together: the view has no
                // default selectionStyle, and without one the selection is
                // invisible
                ...(ctx.state.selected === undefined
                    ? undefined
                    : {selected: ctx.state.selected, selectionStyle}),
                // While dragging, the hover indication of the view is
                // suppressed (symmetrically to suspending activation on hover
                // in the core): with libraries that use a synthetic drag the
                // browser keeps applying :hover to the row under the cursor
                ...(dragActive ? {hovered: false} : undefined),
            };
        },
    };

    if (renderItem) {
        return <React.Fragment>{renderItem(ctx, helpers)}</React.Fragment>;
    }

    if (ctx.content === undefined) {
        warnOnce(
            '[List] Rows render empty: the default content getter only renders string items. Pass `getItemContent` (or `renderItem`) for object items.',
        );
    }

    return ctx.kind === 'section' ? (
        <ListSectionHeader {...helpers.getItemProps()} {...helpers.getItemViewProps()}>
            {ctx.content}
        </ListSectionHeader>
    ) : (
        <ListItemView {...helpers.getItemProps()} {...helpers.getItemViewProps()}>
            {role === 'grid' ? (
                // In grid the content has to live inside a cell: role="row" is
                // required to own at least one gridcell. In listbox there is
                // no wrapper at all — the markup of the default render stays
                // as it was
                <div {...helpers.getCellProps()}>{ctx.content}</div>
            ) : (
                ctx.content
            )}
        </ListItemView>
    );
}

function areListRowPropsEqual<T>(prev: ListRowProps<T>, next: ListRowProps<T>): boolean {
    const a = prev.ctx;
    const c = next.ctx;
    return (
        prev.memoKey === next.memoKey &&
        prev.size === next.size &&
        prev.selectionStyle === next.selectionStyle &&
        prev.dragActive === next.dragActive &&
        prev.role === next.role &&
        prev.renderItem === next.renderItem &&
        prev.core === next.core &&
        a.id === c.id &&
        a.item === c.item &&
        a.index === c.index &&
        a.kind === c.kind &&
        a.content === c.content &&
        a.state.active === c.state.active &&
        a.state.cursorVisible === c.state.cursorVisible &&
        a.state.disabled === c.state.disabled &&
        a.state.selected === c.state.selected &&
        a.state.dragging === c.state.dragging &&
        a.state.dropTarget === c.state.dropTarget
    );
}

// Rows are memoized by their ctx slice: a dropTarget update on dragover
// arrives as a new adapter object, and only the rows whose slice changed are
// re-rendered instead of the whole list. Ctx is compared field by field (the
// object is rebuilt on every render), so the memoization pays off as long as
// items, the getters and renderItem keep a stable identity
const ListRow = React.memo(ListRowComponent, areListRowPropsEqual) as typeof ListRowComponent;

function ListComponent<T>(props: ListProps<T>, ref: React.ForwardedRef<HTMLDivElement>) {
    const {
        size = 'm',
        className,
        style,
        qa,
        renderItem,
        selectionMode,
        containerProps: extraContainerProps,
    } = props;
    const virtualization = React.useContext(ListVirtualizationContext);
    const list = useList(props);

    const listRef = React.useRef(list);
    listRef.current = list;
    const [core] = React.useState<ListRowCore>(() => ({
        getItemProps: (id, overrides) => listRef.current.getItemProps(id, overrides),
        getCellProps: (overrides) => listRef.current.getCellProps(overrides),
    }));

    // The cache of contexts used to estimate row heights (see below); declared
    // unconditionally (rules of hooks), used only while the layer is on
    const sizingContextsRef = React.useRef<{
        ids: string[];
        byId: Map<string, ListItemContext<T>>;
    }>({ids: list.visibleIds, byId: new Map()});

    // The selection layer is mapped onto the indication of the view the same
    // way as in the existing Select: multiple gets a check mark (so that the
    // selection does not compete with the highlight of the active row), single
    // gets the row highlight
    const selectionStyle = selectionMode === 'multiple' ? 'check' : 'highlight';

    // A change here (a drag starting or finishing) costs one re-render of
    // every row in the window — unlike dropTarget, it does not happen on every
    // dragover
    const dragActive = (props.dnd?.draggingId ?? null) !== null;

    const renderRow = (id: string) => (
        <ListRow<T>
            key={id}
            ctx={list.getItemContext(id)}
            memoKey={list.getItemMemoKey(id)}
            size={size}
            selectionStyle={selectionStyle}
            dragActive={dragActive}
            role={list.role}
            renderItem={renderItem}
            core={core}
        />
    );

    // The consumer's containerProps are composed with the dedicated props of
    // the root by the contract of the getters (className concatenated, style
    // merged, handlers chained after the core's — in getContainerProps); the
    // ref of the component is forked with the core's there as well
    const containerProps = list.getContainerProps({
        ...composeItemProps(
            {className: b({size}, className), style, 'data-qa': qa},
            extraContainerProps,
        ),
        ref: ref ?? undefined,
    });

    // With the virtualization context active the root is rendered by the
    // virtualizer of that layer (it is the scroll container as well and sets
    // overflow itself); limiting the height (height/max-height) is up to the
    // consumer
    if (virtualization) {
        const estimate = virtualization.estimateItemSize ?? ESTIMATED_ITEM_SIZE[size];
        // While scrolling, tanstack calls estimateItemSize for the whole
        // not-yet-measured tail on every measurement pass — building a new
        // context every time would be wasteful. The contexts only go into
        // estimateItemSize (never into the render), so a stale active/selected
        // is harmless for the height; the cache is dropped when the set of
        // rows changes
        const cache = sizingContextsRef.current;
        if (cache.ids !== list.visibleIds) {
            cache.ids = list.visibleIds;
            cache.byId = new Map();
        }
        const getSizingContext = (index: number) => {
            const id = list.visibleIds[index];
            let ctx = cache.byId.get(id);
            if (ctx === undefined) {
                ctx = list.getItemContext(id);
                cache.byId.set(id, ctx);
            }
            return ctx;
        };
        const getItemSize =
            typeof estimate === 'function'
                ? (index: number) => estimate(getSizingContext(index))
                : () => estimate;
        return (
            <virtualization.Root
                containerProps={containerProps}
                rowIds={list.visibleIds}
                persistedIndexes={list.persistedRowIndexes}
                renderRow={renderRow}
                getItemSize={getItemSize}
                measure={virtualization.measure}
                overscan={virtualization.overscan}
            />
        );
    }

    return <div {...containerProps}>{list.visibleIds.map((id) => renderRow(id))}</div>;
}

/**
 * A navigable listbox: an array of strings needs zero configuration, objects
 * need a single getter. The selection, virtualization and dnd layers are
 * plugged in separately and do not leak into the core.
 */
export const List = Object.assign(
    React.forwardRef(ListComponent) as unknown as (<T>(
        props: ListProps<T> & {ref?: React.Ref<HTMLDivElement>},
    ) => React.ReactElement) & {displayName?: string},
    {
        ItemView: ListItemView as ListItemViewComponent,
        SectionHeader: ListSectionHeader,
    },
);

List.displayName = 'List';
