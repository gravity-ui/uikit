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
import type {ListItemId, ListItemSize} from '../../types';
import {getItemRenderState} from '../../utils/getItemRenderState';
import {createRandomizedData} from '../utils/makeData';

export interface RecursiveListProps {
    itemsCount: number;
    size: ListItemSize;
    'aria-label'?: string;
}

export const RecursiveList = ({size, itemsCount, 'aria-label': ariaLabel}: RecursiveListProps) => {
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
                // just toggle item by id
                listState.setSelected((state) => ({
                    ...state,
                    [id]: !state[id],
                }));
            }

            listState.setActiveItemId(id);
        },
        [list.groupsState, listState],
    );

    useListKeydown({
        containerRef,
        onItemClick,
        ...list,
        ...listState,
    });

    return (
        <Flex direction="column" gap="5">
            <TextInput
                autoComplete="off"
                value={filterState.filter}
                onUpdate={filterState.onFilterUpdate}
                ref={filterState.filterRef}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
            />
            <ListContainerView ref={containerRef} extraProps={{'aria-label': ariaLabel}}>
                {filterState.items.map((item, index) => (
                    <ListItemRecursiveRenderer
                        itemSchema={item}
                        key={index}
                        index={index}
                        expandedById={listState.expandedById}
                        idToFlattenIndex={list.idToFlattenIndex}
                    >
                        {(id) => {
                            const {props, context} = getItemRenderState({
                                id,
                                size,
                                onItemClick,
                                multiple: true,
                                mapItemDataToProps: (x) => x,
                                ...list,
                                ...listState,
                            });

                            return (
                                <ListItemView {...props} hasSelectionIcon={!context.groupState} />
                            );
                        }}
                    </ListItemRecursiveRenderer>
                ))}
            </ListContainerView>
        </Flex>
    );
};
