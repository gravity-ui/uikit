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
import type {ListItemId, ListSizeTypes} from '../../types';
import {computeItemSize} from '../../utils/computeItemSize';
import {getItemRenderState} from '../../utils/getItemRenderState';
import {createRandomizedData} from '../utils/makeData';

import {VirtualizedListContainer} from './VirtualizedListContainer';

export interface FlattenListProps {
    itemsCount: number;
    size: ListSizeTypes;
}

export const FlattenList = ({itemsCount, size}: FlattenListProps) => {
    const containerRef = React.useRef(null);
    const items = React.useMemo(
        () => createRandomizedData<{title: string}>({num: itemsCount}),
        [itemsCount],
    );

    const filterState = useListFilter({items});

    const listState = useListState();

    const listParsedState = useList({
        items: filterState.items,
    });

    const onItemClick = React.useCallback(
        (id: ListItemId) => {
            if (id in listParsedState.groupsState) {
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
        [listParsedState, listState],
    );

    useListKeydown({
        containerRef,
        onItemClick,
        ...listParsedState,
        ...listState,
    });

    return (
        <Flex direction="column" gap="5" grow>
            <TextInput
                autoComplete="off"
                value={filterState.filter}
                onUpdate={filterState.onChange}
                ref={filterState.filterRef}
            />

            <ListContainerView ref={containerRef}>
                <VirtualizedListContainer
                    items={listParsedState.flattenIdsOrder}
                    itemSize={(index) =>
                        computeItemSize(
                            size,
                            Boolean(
                                get(
                                    listParsedState.byId[listParsedState.flattenIdsOrder[index]],
                                    'subtitle',
                                ),
                            ),
                        )
                    }
                >
                    {(id) => {
                        const [item, state, _context] = getItemRenderState({
                            id,
                            size,
                            onItemClick,
                            ...listParsedState,
                            ...listState,
                        });
                        return <ListItemView {...state} {...item} />;
                    }}
                </VirtualizedListContainer>
            </ListContainerView>
        </Flex>
    );
};
