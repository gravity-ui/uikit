import React from 'react';

import {bListComposable} from '../../constants';
import type {
    ListContainerRenderProps,
    ListItemBaseData,
    ListItemRendererProps,
    RenderListItemViewProps,
} from '../../types';
import {computeItemSize} from '../../utils/computeItemSize';
import {IntersectionContainer} from '../IntersectionContainer/IntersectionContainer';
import {useListContext} from '../ListContext/ListContext';
import {ListItemRenderer} from '../ListItemRenderer/ListItemRenderer';
import {ListItemView} from '../ListItemView/ListItemView';
import {SimpleListContainer} from '../SimpleListContainer/SimpleListContainer';
import {VirtualizedListContainer} from '../VirtualizedListContainer/VirtualizedListContainer';

interface ListContainerProps<T> {
    virtualized?: boolean;
    prepareCustomData?(props: T): ListItemBaseData;
    getItemSize?(index: number): number;
    ItemView?(props: RenderListItemViewProps): React.JSX.Element;
    Item?(props: ListItemRendererProps<T>): React.JSX.Element;
    Container?(props: ListContainerRenderProps<T>): React.ReactNode;
    /**
     * Use it if you wont to implement infinity scroll or what ever you want.
     * !Warning - onLastItemRender can be triggered multiple times
     * If you wont to call you callback once, write logic for managing the availability of the function:
     * ```tsx
     * onLastItemRender={needToFetchData && !isDataLoading ? fetchNextPage : undefined}
     * ```
     */
    onLastItemRender?(): void;
}

export function ListContainer<T>({
    virtualized,
    prepareCustomData,
    getItemSize: _getItemSize,
    Item,
    Container: _Container,
    ItemView,
    onLastItemRender,
}: ListContainerProps<T>) {
    const {listRef, size, containerRef, handleKeyDown, byId, order} = useListContext<T>();

    const items = React.useMemo(() => {
        return order.map((id) => (prepareCustomData ? prepareCustomData(byId[id]) : byId[id]));
    }, [byId, order, prepareCustomData]);

    const Container = _Container || virtualized ? VirtualizedListContainer : SimpleListContainer;

    const RenderItem = React.useCallback(
        (props: ListItemRendererProps<T>) => {
            const isLastItem = order.length - 1 === props.index;
            const node = Item ? (
                <Item {...props} />
            ) : (
                <ListItemRenderer
                    {...(props as ListItemRendererProps<ListItemBaseData>)}
                    // know how to type right? Just do it!
                    View={ItemView! || ListItemView}
                />
            );

            return isLastItem ? (
                <IntersectionContainer onIntersect={onLastItemRender}>{node}</IntersectionContainer>
            ) : (
                node
            );
        },
        [Item, ItemView, onLastItemRender, order.length],
    );

    const getItemSize = React.useMemo(() => {
        if (_getItemSize) {
            return _getItemSize;
        }

        if (prepareCustomData) {
            return (index: number): number =>
                computeItemSize(size, prepareCustomData(byId[order[index]]));
        }

        return () => computeItemSize(size);
    }, [_getItemSize, byId, order, prepareCustomData, size]);

    return (
        <div
            className={bListComposable({virtualized}, 'container')}
            ref={containerRef}
            tabIndex={-1}
            role="listbox"
            onKeyDown={handleKeyDown}
        >
            <Container ref={listRef} items={items} getItemSize={getItemSize}>
                {RenderItem}
            </Container>
        </div>
    );
}
