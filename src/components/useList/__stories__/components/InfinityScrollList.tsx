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
import {useListItemClick} from '../../hooks/useListItemClick';
import {useListKeydown} from '../../hooks/useListKeydown';
import type {ListItemSize} from '../../types';
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
    const list = useList({items: filterState.items});

    const onItemClick = useListItemClick({list, multiple: true});

    useListKeydown({
        containerRef,
        onItemClick,
        list,
    });

    const handleReset = () => {
        filterState.reset();
        list.state.setExpanded?.({});
        list.state.setSelected({});
        list.state.setActiveItemId(undefined);
    };

    const handleAccept = () => {
        alert(
            JSON.stringify(
                Object.keys(list.state.selectedById).map((id) => list.structure.itemsById[id]),
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
                                        const node = <ListItemView {...props} />;

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
