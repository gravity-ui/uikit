import React from 'react';

import {TextInput} from '../../../controls';
import {Flex} from '../../../layout';
import {ListContainerView} from '../../components/ListContainerView/ListContainerView';
import {ListItemView} from '../../components/ListItemView/ListItemView';
import {ListItemRecursiveRenderer} from '../../components/ListRecursiveRenderer/ListRecursiveRenderer';
import {useList} from '../../hooks/useList';
import {useListFilter} from '../../hooks/useListFilter';
import {useListItemClick} from '../../hooks/useListItemClick';
import {useListKeydown} from '../../hooks/useListKeydown';
import type {ListItemSize} from '../../types';
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

    const list = useList({items: filterState.items});

    const onItemClick = useListItemClick({list});

    useListKeydown({
        containerRef,
        onItemClick,
        list,
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
                {list.structure.itemsSchema.map((itemSchema, index) => (
                    <ListItemRecursiveRenderer itemSchema={itemSchema} key={index}>
                        {(id) => {
                            const {props, context} = getItemRenderState({
                                id,
                                size,
                                onItemClick,
                                multiple: true,
                                mapItemDataToProps: (x) => x,
                                list,
                            });

                            return (
                                <ListItemView {...props} hasSelectionIcon={!context.childrenIds} />
                            );
                        }}
                    </ListItemRecursiveRenderer>
                ))}
            </ListContainerView>
        </Flex>
    );
};
