import React from 'react';

import {Label} from '../../../Label';
import {Loader} from '../../../Loader';
import {Flex, spacing} from '../../../layout';
import {ListItemView, useListState} from '../../../useList';
import {IntersectionContainer} from '../../../useList/__stories__/components/IntersectionContainer/IntersectionContainer';
import {useInfinityFetch} from '../../../useList/__stories__/utils/useInfinityFetch';
import {TreeList} from '../../TreeList';
import type {TreeListOnItemClick, TreeListProps} from '../../types';
import {RenderVirtualizedContainer} from '../components/RenderVirtualizedContainer';

function identity<T>(value: T): T {
    return value;
}

export interface InfinityScrollStoryProps
    extends Omit<
        TreeListProps<{title: string}>,
        'value' | 'onUpdate' | 'items' | 'multiple' | 'size' | 'mapItemDataToProps'
    > {
    itemsCount?: number;
}

export const InfinityScrollStory = ({itemsCount = 5, ...storyProps}: InfinityScrollStoryProps) => {
    const listState = useListState();

    const handleItemClick: TreeListOnItemClick<{title: string}> = ({
        id,
        disabled,
        expanded,
        selected,
        context: {groupState},
    }) => {
        if (disabled) return;

        listState.setActiveItemId(id);

        if (groupState) {
            listState.setExpanded((prevState) => ({
                ...prevState,
                [id]: !expanded,
            }));
        } else {
            listState.setSelected((prevState) => ({
                ...prevState,
                [id]: !selected,
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
                mapItemDataToProps={identity}
                items={items}
                multiple
                onItemClick={handleItemClick}
                renderItem={({data, props, context: {isLastItem, groupState}}) => {
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
