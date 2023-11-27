import React from 'react';

import get from 'lodash/get';
import identity from 'lodash/identity';

import {TextInput} from '../../../controls';
import {Flex} from '../../../layout';
import {ItemRenderer} from '../../components/ItemRenderer/ItemRenderer';
import {defaultItemRendererBuilder} from '../../components/ItemRenderer/defaultItemRendererBuilder';
import {ListContainerView} from '../../components/ListContainerView/ListContainerView';
import {VirtualizedListContainer} from '../../components/VirtualizedListContainer/VirtualizedListContainer';
import {useList} from '../../hooks/useList';
import {useListFilter} from '../../hooks/useListFilter';
import {useListKeydown} from '../../hooks/useListKeydown';
import type {ListItemId, ListSizeTypes} from '../../types';
import {computeItemSize} from '../../utils/computeItemSize';
import {createRandomizedData} from '../utils/makeData';

export interface FlattenListProps {
    itemsCount: number;
    size: ListSizeTypes;
}

export const FlattenList = ({itemsCount, size}: FlattenListProps) => {
    const containerRef = React.useRef(null);
    const items = React.useMemo(
        () => createRandomizedData<{title: string}>(itemsCount),
        [itemsCount],
    );

    const filterState = useListFilter({items});

    const [listParsedState, listState] = useList({
        items,
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
                    {(id) => (
                        <ItemRenderer
                            size={size}
                            {...listParsedState}
                            {...listState}
                            id={id}
                            onItemClick={onItemClick}
                            renderItem={defaultItemRendererBuilder({
                                getItemContent: identity,
                            })}
                        />
                    )}
                </VirtualizedListContainer>
            </ListContainerView>
        </Flex>
    );
};
