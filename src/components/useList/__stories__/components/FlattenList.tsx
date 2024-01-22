import React from 'react';

import get from 'lodash/get';

import {TextInput} from '../../../controls';
import {Flex} from '../../../layout';
import {ListContainerView} from '../../components/ListContainerView/ListContainerView';
import {ListItemView} from '../../components/ListItemView/ListItemView';
import {useList} from '../../hooks/useList';
import {useListFilter} from '../../hooks/useListFilter';
import {useListKeydown} from '../../hooks/useListKeydown';
import {useListState} from '../../hooks/useListState';
import type {ListItemId, ListItemSize} from '../../types';
import {computeItemSize} from '../../utils/computeItemSize';
import {getItemRenderState} from '../../utils/getItemRenderState';
import {createRandomizedData} from '../utils/makeData';

import {VirtualizedListContainer} from './VirtualizedListContainer';

export interface FlattenListProps {
    itemsCount: number;
    size: ListItemSize;
}

export const FlattenList = ({itemsCount, size}: FlattenListProps) => {
    const containerRef = React.useRef(null);
    const items = React.useMemo(
        () => createRandomizedData<{title: string}>({num: itemsCount}),
        [itemsCount],
    );

    const filterState = useListFilter({items});

    const listState = useListState();

    const list = useList({
        items: filterState.items,
        ...listState,
    });

    const onItemClick = React.useCallback(
        (id: ListItemId) => {
            if (id in list.groupsState) {
                listState.setExpanded((state) => ({
                    ...state,
                    [id]: id in state ? !state[id] : false,
                }));
            } else {
                listState.setSelected((state) => ({
                    // can select only one item
                    [id]: !state[id],
                }));
            }

            listState.setActiveItemId(id);
        },
        [list, listState],
    );

    useListKeydown({
        containerRef,
        onItemClick,
        ...list,
        ...listState,
    });

    return (
        <Flex direction="column" gap="5" grow>
            <TextInput
                autoComplete="off"
                value={filterState.filter}
                onUpdate={filterState.onFilterUpdate}
                ref={filterState.filterRef}
            />

            <ListContainerView ref={containerRef}>
                <VirtualizedListContainer
                    items={list.visibleFlattenIds}
                    itemSize={(index) =>
                        computeItemSize(
                            size,
                            Boolean(get(list.itemsById[list.visibleFlattenIds[index]], 'subtitle')),
                        )
                    }
                >
                    {(id) => {
                        const {data, props, context} = getItemRenderState({
                            id,
                            size,
                            onItemClick,
                            ...list,
                            ...listState,
                        });
                        return (
                            <ListItemView
                                {...props}
                                {...data}
                                hasSelectionIcon={!context.groupState}
                            />
                        );
                    }}
                </VirtualizedListContainer>
            </ListContainerView>
        </Flex>
    );
};
