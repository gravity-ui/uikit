import React from 'react';

import {Label} from '../../../Label';
import {Loader} from '../../../Loader';
import {Flex, spacing} from '../../../layout';
import {IntersectionContainer} from '../../../useList/__stories__/components/IntersectionContainer/IntersectionContainer';
import {useInfinityFetch} from '../../../useList/__stories__/utils/useInfinityFetch';
import {TreeSelect} from '../../TreeSelect';
import {TreeSelectItem} from '../../TreeSelectItem';
import type {TreeSelectProps} from '../../types';

import {RenderVirtualizedContainer} from './RenderVirtualizedContainer';
export interface InfinityScrollExampleProps
    extends Omit<
        TreeSelectProps<{title: string}>,
        'value' | 'onUpdate' | 'items' | 'getItemContent'
    > {
    itemsCount?: number;
}

export const InfinityScrollExample = ({
    itemsCount = 5,
    ...storyProps
}: InfinityScrollExampleProps) => {
    const [value, setValue] = React.useState<string[]>([]);
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
                items={items}
                value={value}
                renderItem={({data, props, itemState: {isLastItem, groupState}}) => {
                    const node = (
                        <TreeSelectItem
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
                popupWidth={300}
                onUpdate={setValue}
                slotAfterListBody={
                    isLoading && (
                        <Flex justifyContent="center" className={spacing({py: 2})}>
                            <Loader size={'m'} />
                        </Flex>
                    )
                }
            />
        </Flex>
    );
};
