import React from 'react';

import {Button} from '../../../Button';
import {Loader} from '../../../Loader';
import {TextInput} from '../../../controls';
import {Flex} from '../../../layout';
import {IntersectionContainer} from '../../components/IntersectionContainer/IntersectionContainer';
import {ListContainerView} from '../../components/ListContainerView/ListContainerView';
import {ListItemView} from '../../components/ListItemView/ListItemView';
import {ListItemRecursiveRenderer} from '../../components/ListRecursiveRenderer/ListRecursiveRenderer';
import {useList} from '../../hooks/useList';
import {useListFilter} from '../../hooks/useListFilter';
import {useListKeydown} from '../../hooks/useListKeydown';
import {useListState} from '../../hooks/useListState';
import type {ListItemId, ListSizeTypes} from '../../types';
import {getItemRenderState} from '../../utils/getItemRenderState';
import {useInfinityFetch} from '../utils/useInfinityFetch';

export interface InfinityScrollListProps {
    size: ListSizeTypes;
}

export const InfinityScrollList = ({size}: InfinityScrollListProps) => {
    const containerRef = React.useRef(null);
    const {data, onFetchMore, canFetchMore, isLoading} = useInfinityFetch<{title: string}>();
    const filterState = useListFilter({items: data});

    const listState = useListState();

    const listParsedState = useList({
        items: filterState.items,
    });

    const onItemClick = (id: ListItemId) => {
        if (id in listParsedState.groupsState) {
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
        ...listParsedState,
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
                Object.keys(listState.selectedById).map((id) => listParsedState.byId[id]),
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
                            onUpdate={filterState.onChange}
                            ref={filterState.filterRef}
                        />

                        <ListContainerView ref={containerRef}>
                            {listParsedState.items.map((item, index) => (
                                <ListItemRecursiveRenderer
                                    itemSchema={item}
                                    key={index}
                                    index={index}
                                    expandedById={listState.expandedById}
                                >
                                    {(id) => {
                                        const [data, state, context] = getItemRenderState({
                                            id,
                                            size,
                                            onItemClick,
                                            ...listParsedState,
                                            ...listState,
                                        });
                                        const node = <ListItemView {...state} {...data} />;

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
