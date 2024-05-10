import React from 'react';

import {Label} from '../../../Label';
import {Loader} from '../../../Loader';
import {RenderVirtualizedContainer} from '../../../TreeList/__stories__/components/RenderVirtualizedContainer';
import {Flex, spacing} from '../../../layout';
import {ListItemView, useListState} from '../../../useList';
import {IntersectionContainer} from '../../../useList/__stories__/components/IntersectionContainer/IntersectionContainer';
import {useInfinityFetch} from '../../../useList/__stories__/utils/useInfinityFetch';
import {TreeSelect} from '../../TreeSelect';
import type {TreeSelectProps} from '../../types';

function identity<T>(value: T): T {
    return value;
}

export interface InfinityScrollExampleProps
    extends Omit<
        TreeSelectProps<{title: string}>,
        'value' | 'onUpdate' | 'items' | 'mapItemDataToProps'
    > {
    itemsCount?: number;
}

export const InfinityScrollExample = ({
    itemsCount = 5,
    ...storyProps
}: InfinityScrollExampleProps) => {
    const listState = useListState();

    const {
        data: items = [],
        onFetchMore,
        canFetchMore,
        isLoading,
    } = useInfinityFetch<{title: string}>(itemsCount, true);

    return (
        <Flex>
            <TreeSelect<{title: string}>
                {...storyProps}
                {...listState}
                mapItemDataToProps={identity}
                items={items}
                renderItem={({data, props, context: {isLastItem, groupState}}) => {
                    const node = (
                        <ListItemView
                            {...props}
                            {...data}
                            style={{marginInline: 4}}
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
                popupWidth={300}
                slotAfterListBody={
                    isLoading && (
                        <Flex justifyContent="center" className={spacing({py: 2})}>
                            <Loader size="m" />
                        </Flex>
                    )
                }
            />
        </Flex>
    );
};
