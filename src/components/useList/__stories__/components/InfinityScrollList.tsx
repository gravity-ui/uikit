import React from 'react';

import {Button} from '../../../Button';
import {Loader} from '../../../Loader';
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
import {useInfinityFetch} from '../utils/useInfinityFetch';

import {IntersectionContainer} from './IntersectionContainer/IntersectionContainer';

export interface InfinityScrollListProps {
    size: ListItemSize;
}

export const InfinityScrollList = ({size}: InfinityScrollListProps) => {
    const containerRef = React.useRef(null);
    const {data, onFetchMore, canFetchMore, isLoading} = useInfinityFetch<{title: string}>();
    const filterState = useListFilter({items: data});

    const listState = useListState();

    const list = useList({
        items: filterState.items,
        ...listState,
    });

    const onItemClick = (id: ListItemId) => {
        if (id in list.groupsState) {
            listState.setExpanded((state) => ({
                ...state,
                [id]: id in state ? !state[id] : false,
            }));
        } else {
            listState.setSelected((state) => ({...state, [id]: !state[id]}));
        }

        listState.setActiveItemId(id);
    };

    useListKeydown({
        containerRef,
        onItemClick,
        ...list,
        ...listState,
    });

    const handleReset = () => {
        filterState.reset();
        listState.setExpanded({});
        listState.setSelected({});
        listState.setActiveItemId(undefined);
    };

    const handleAccept = () => {
        alert(
            JSON.stringify(
                Object.keys(listState.selectedById).map((id) => list.itemsById[id]),
                null,
                2,
            ),
        );
    };

    return (
        <React.StrictMode>
            <Flex direction="column" gap="3" style={{height: 500}}>
                {data.length > 0 && (
                    <React.Fragment>
                        <TextInput
                            autoComplete="off"
                            value={filterState.filter}
                            onUpdate={filterState.onFilterUpdate}
                            ref={filterState.filterRef}
                        />

                        <ListContainerView ref={containerRef}>
                            {list.items.map((item, index) => (
                                <ListItemRecursiveRenderer
                                    itemSchema={item}
                                    key={index}
                                    index={index}
                                    expandedById={listState.expandedById}
                                    idToFlattenIndex={list.idToFlattenIndex}
                                >
                                    {(id) => {
                                        const {data, props, context} = getItemRenderState({
                                            id,
                                            size,
                                            onItemClick,
                                            ...list,
                                            ...listState,
                                        });
                                        const node = <ListItemView {...props} {...data} />;

                                        if (context.isLastItem) {
                                            return (
                                                <IntersectionContainer
                                                    onIntersect={
                                                        canFetchMore && !filterState.filter
                                                            ? onFetchMore
                                                            : undefined
                                                    }
                                                >
                                                    {node}
                                                </IntersectionContainer>
                                            );
                                        }

                                        return node;
                                    }}
                                </ListItemRecursiveRenderer>
                            ))}
                        </ListContainerView>
                    </React.Fragment>
                )}

                {isLoading && (
                    <Flex justifyContent="center" alignItems="center" grow>
                        <Loader
                            // @ts-expect-error loader doesn't support `xl` type
                            size={size}
                        />
                    </Flex>
                )}
                <Flex gap="2">
                    <Button onClick={handleReset} width="max" size={size}>
                        Reset
                    </Button>
                    <Button view="action" onClick={handleAccept} width="max" size={size}>
                        Accept
                    </Button>
                </Flex>
            </Flex>
        </React.StrictMode>
    );
};
