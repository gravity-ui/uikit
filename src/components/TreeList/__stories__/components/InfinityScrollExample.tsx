import React from 'react';

import {Label} from '../../../Label';
import {Loader} from '../../../Loader';
import {Flex, spacing} from '../../../layout';
import {ListItemView, useListState} from '../../../useList';
import {IntersectionContainer} from '../../../useList/__stories__/components/IntersectionContainer/IntersectionContainer';
import {useInfinityFetch} from '../../../useList/__stories__/utils/useInfinityFetch';
import {TreeList} from '../../TreeList';
import type {TreeListOnItemClick, TreeListProps} from '../../types';

import {RenderVirtualizedContainer} from './RenderVirtualizedContainer';
export interface InfinityScrollExampleProps
    extends Omit<
        TreeListProps<{title: string}>,
        'value' | 'onUpdate' | 'items' | 'getItemContent' | 'multiple' | 'size'
    > {
    itemsCount?: number;
}

export const InfinityScrollExample = ({
    itemsCount = 5,
    ...storyProps
}: InfinityScrollExampleProps) => {
    const listState = useListState();

    const handleItemClick: TreeListOnItemClick<{title: string}> = (
        _data,
        {id, isGroup, disabled},
    ) => {
        if (disabled) return;

        listState.setActiveItemId(id);

        if (isGroup) {
            listState.setExpanded((prevState) => ({
                ...prevState,
                [id]: id in prevState ? !prevState[id] : false,
            }));
        } else {
            listState.setSelected((prevState) => ({
                ...prevState,
                [id]: !prevState[id],
            }));
        }
    };

    const {
        data: items = [],
        onFetchMore,
        canFetchMore,
        isLoading,
    } = useInfinityFetch<{title: string}>(itemsCount, true);

    return (
        <Flex direction="column">
            <TreeList
                size="l"
                {...storyProps}
                {...listState}
                items={items}
                multiple
                onItemClick={handleItemClick}
                renderItem={({data, props, itemState: {isLastItem, groupState}}) => {
                    const node = (
                        <ListItemView
                            {...props}
                            {...data}
                            endSlot={
                                groupState ? (
                                    <Label>{groupState.childrenIds.length}</Label>
                                ) : undefined
                            }
                        />
                    );

                    if (isLastItem) {
                        return (
                            <IntersectionContainer
                                onIntersect={canFetchMore ? onFetchMore : undefined}
                            >
                                {node}
                            </IntersectionContainer>
                        );
                    }

                    return node;
                }}
                renderContainer={RenderVirtualizedContainer}
            />
            {isLoading && (
                <Flex justifyContent="center" className={spacing({py: 2})}>
                    <Loader size={'m'} />
                </Flex>
            )}
        </Flex>
    );
};
