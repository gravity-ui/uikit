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

// min-height of the default view per size
const ESTIMATED_ITEM_SIZE: Record<ListSize, number> = {s: 24, m: 28, l: 32, xl: 36};

/**
 * Presentational subset of the lab row view: tree, container, componentProps and the
 * draggable slot are outside the contract
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

/** Stable dispatcher into the current core for memoized rows */
interface ListRowCore {
    getItemProps: (id: string, overrides?: ListPropsOverrides) => ListItemDOMProps;
    getCellProps: (overrides?: ListPropsOverrides) => ListCellDOMProps;
}

interface ListRowProps<T> {
    ctx: ListItemContext<T>;
    memoKey: string;
    size: ListSize;
    selectionStyle: 'check' | 'highlight';
    dragActive: boolean;
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
            if (ctx.kind === 'section') {
                return {size};
            }
            return {
                size,
                active: Boolean(ctx.state.active && ctx.state.cursorVisible),
                disabled: ctx.state.disabled,
                ...(ctx.state.selected === undefined
                    ? undefined
                    : {selected: ctx.state.selected, selectionStyle}),
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
            {role === 'grid' ? <div {...helpers.getCellProps()}>{ctx.content}</div> : ctx.content}
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

// Memo by ctx slice: a dropTarget update re-renders only the rows whose slice changed
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

    const sizingContexts = React.useMemo(
        () => ({ids: list.visibleIds, byId: new Map<string, ListItemContext<T>>()}),
        [list.visibleIds],
    );

    const selectionStyle = selectionMode === 'multiple' ? 'check' : 'highlight';

    const renderRow = (id: string) => (
        <ListRow<T>
            key={id}
            ctx={list.getItemContext(id)}
            memoKey={list.getItemMemoKey(id)}
            size={size}
            selectionStyle={selectionStyle}
            dragActive={list.dragActive}
            role={list.role}
            renderItem={renderItem}
            core={core}
        />
    );

    const containerProps = list.getContainerProps({
        ...composeItemProps(
            {className: b({size}, className), style, 'data-qa': qa},
            extraContainerProps,
        ),
        ref: ref ?? undefined,
    });

    if (virtualization) {
        const estimate = virtualization.estimateItemSize ?? ESTIMATED_ITEM_SIZE[size];
        // tanstack calls estimateItemSize for the whole unmeasured tail on every pass
        const getSizingContext = (index: number) => {
            const id = sizingContexts.ids[index];
            let ctx = sizingContexts.byId.get(id);
            if (ctx === undefined) {
                ctx = list.getItemContext(id);
                sizingContexts.byId.set(id, ctx);
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

/** A navigable listbox: strings need zero configuration, objects a single getter */
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
