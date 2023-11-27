import React from 'react';

import identity from 'lodash/identity';

import {TextInput} from '../../../controls';
import {Flex} from '../../../layout';
import {ItemRenderer} from '../../components/ItemRenderer/ItemRenderer';
import {defaultItemRendererBuilder} from '../../components/ItemRenderer/defaultItemRendererBuilder';
import {ListContainerView} from '../../components/ListContainerView/ListContainerView';
import {ListItemRecursiveRenderer} from '../../components/ListRecursiveRenderer/ListRecursiveRenderer';
import {useList} from '../../hooks/useList';
import {useListFilter} from '../../hooks/useListFilter';
import {useListKeydown} from '../../hooks/useListKeydown';
import type {ListItemId, ListSizeTypes} from '../../types';
import {createRandomizedData} from '../utils/makeData';

export interface RecursiveListProps {
    itemsCount: number;
    size: ListSizeTypes;
}

export const RecursiveList = ({size, itemsCount}: RecursiveListProps) => {
    const containerRef = React.useRef(null);

    const items = React.useMemo(
        () => createRandomizedData<{title: string}>(itemsCount),
        [itemsCount],
    );

    const filterState = useListFilter({items});

    const [listParsedState, listState] = useList({
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
                        expanded={listState.expanded}
                    >
                        {(id) => (
                            <ItemRenderer
                                size={size}
                                id={id}
                                {...listParsedState}
                                {...listState}
                                onItemClick={onItemClick}
                                renderItem={defaultItemRendererBuilder({
                                    getItemContent: identity,
                                })}
                            />
                        )}
                    </ListItemRecursiveRenderer>
                ))}
            </ListContainerView>
        </Flex>
    );
};
