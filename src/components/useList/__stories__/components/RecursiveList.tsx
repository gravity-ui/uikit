import * as React from 'react';

import {TextInput} from '../../../controls';
import {Flex} from '../../../layout';
import {ListContainer} from '../../components/ListContainer';
import {ListItemView} from '../../components/ListItemView';
import {useList} from '../../hooks/useList';
import {useListFilter} from '../../hooks/useListFilter';
import {useListKeydown} from '../../hooks/useListKeydown';
import type {ListItemSize} from '../../types';
import {getItemRenderState} from '../../utils/getItemRenderState';
import {getListItemClickHandler} from '../../utils/getListItemClickHandler';
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

    const onItemClick = getListItemClickHandler({list});

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
                autoFocus
            />
            <ListContainer
                list={list}
                containerRef={containerRef}
                extraProps={{'aria-label': ariaLabel}}
                renderItem={(id) => {
                    const {props, context} = getItemRenderState({
                        id,
                        size,
                        onItemClick,
                        multiple: true,
                        mapItemDataToContentProps: (x) => x,
                        list,
                    });

                    return (
                        <ListItemView
                            {...props}
                            selectionViewType={context.childrenIds ? 'single' : 'multiple'}
                        />
                    );
                }}
            />
        </Flex>
    );
};
