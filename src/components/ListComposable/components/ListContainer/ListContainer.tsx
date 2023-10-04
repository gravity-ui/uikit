import React from 'react';

import {bListComposable} from '../../constants';
import type {
    ListContainerRenderProps,
    ListItemBaseData,
    ListItemRendererProps,
    RenderListItemViewProps,
} from '../../types';
import {computeItemSize} from '../../utils/computeItemSize';
import {useListContext} from '../ListContext/ListContext';
import {ListItemRenderer} from '../ListItemRenderer/ListItemRenderer';
import {ListItemView} from '../ListItemView/ListItemView';
import {SimpleListContainer} from '../SimpleListContainer/SimpleListContainer';
import {VirtualizedListContainer} from '../VirtualizedListContainer/VirtualizedListContainer';
interface ListContainerProps<T> {
    virtualized?: boolean;
    prepareCustomData?(props: T): ListItemBaseData;
    getItemSize?(index: number): number;
    renderItemView?: (props: RenderListItemViewProps) => React.JSX.Element;
    renderItem?(props: ListItemRendererProps<T>): React.ReactNode;
    renderContainer?(props: ListContainerRenderProps<T>): React.ReactNode;
}

export function ListContainer<T>({
    virtualized,
    prepareCustomData,
    getItemSize: _getItemSize,
    renderItem,
    renderContainer,
    renderItemView = ListItemView,
}: ListContainerProps<T>) {
    const {listRef, size, containerRef, handleKeyDown, byId, order} = useListContext<T>();

    const items = React.useMemo(() => {
        return order.map((id) => (prepareCustomData ? prepareCustomData(byId[id]) : byId[id]));
    }, [byId, order, prepareCustomData]);

    const Container =
        renderContainer || virtualized ? VirtualizedListContainer : SimpleListContainer;

    const RenderItem = React.useCallback(
        (props: ListItemRendererProps<T>) =>
            renderItem ? (
                renderItem(props)
            ) : (
                <ListItemRenderer
                    {...(props as ListItemRendererProps<ListItemBaseData>)}
                    View={renderItemView}
                />
            ),
        [renderItem, renderItemView],
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
