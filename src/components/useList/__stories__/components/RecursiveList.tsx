import React from 'react';

import {TextInput} from '../../../controls';
import {Flex} from '../../../layout';
import {ListContainerView} from '../../components/ListContainerView/ListContainerView';
import {ListItemView} from '../../components/ListItemView/ListItemView';
import {ListItemRecursiveRenderer} from '../../components/ListRecursiveRenderer/ListRecursiveRenderer';
import {useList} from '../../hooks/useList';
import {useListFilter} from '../../hooks/useListFilter';
import {useListKeydown} from '../../hooks/useListKeydown';
import {useListState} from '../../hooks/useListState';
import type {ListItemId, ListSizeTypes} from '../../types';
import {getItemRenderState} from '../../utils/getItemRenderState';
import {createRandomizedData} from '../utils/makeData';

export interface RecursiveListProps {
    itemsCount: number;
    size: ListSizeTypes;
}

export const RecursiveList = ({size, itemsCount}: RecursiveListProps) => {
    const containerRef = React.useRef(null);

    const items = React.useMemo(
        () => createRandomizedData<{title: string}>({num: itemsCount}),
        [itemsCount],
    );

    const filterState = useListFilter({items});

    const listState = useListState();

    const listParsedState = useList({
        items: filterState.items,
        expandedById: listState.expandedById,
    });

    const onItemClick = React.useCallback(
        (id: ListItemId) => {
            if (id in listParsedState.groupsState) {
                listState.setExpanded((state) => ({
                    ...state,
                    [id]: id in state ? !state[id] : false,
                }));
            } else {
                // just toggle item by id
                listState.setSelected((state) => ({
                    ...state,
                    [id]: !state[id],
                }));
            }

            listState.setActiveItemId(id);
        },
        [listParsedState.groupsState, listState],
    );

    useListKeydown({
        containerRef,
        onItemClick,
        ...listParsedState,
        ...listState,
    });

    return (
        <Flex direction="column" gap="5">
            <TextInput
                autoComplete="off"
                value={filterState.filter}
                onUpdate={filterState.onChange}
                ref={filterState.filterRef}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
            />
            <ListContainerView ref={containerRef}>
                {filterState.items.map((item, index) => (
                    <ListItemRecursiveRenderer
                        itemSchema={item}
                        key={index}
                        index={index}
                        expandedById={listState.expandedById}
                    >
                        {(id) => {
                            const [data, state, listContext] = getItemRenderState({
                                id,
                                size,
                                onItemClick,
                                ...listParsedState,
                                ...listState,
                            });

                            return (
                                <ListItemView
                                    {...state}
                                    {...data}
                                    hasSelectionIcon={!listContext.groupState}
                                />
                            );
                        }}
                    </ListItemRecursiveRenderer>
                ))}
            </ListContainerView>
        </Flex>
    );
};
