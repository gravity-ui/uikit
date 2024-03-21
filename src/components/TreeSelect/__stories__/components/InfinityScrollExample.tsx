import React from 'react';

import {Label} from '../../../Label';
import {Loader} from '../../../Loader';
import {RenderVirtualizedContainer} from '../../../TreeList/__stories__/components/RenderVirtualizedContainer';
import {Flex, spacing} from '../../../layout';
import {ListItemView} from '../../../useList';
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
                mapItemDataToProps={identity}
                items={items}
                value={value}
                renderItem={({data, props, itemState: {isLastItem, groupState}}) => {
                    const node = (
                        <div style={{paddingInline: 4}}>
                            <ListItemView
                                {...props}
                                {...data}
                                endSlot={
                                    groupState ? (
                                        <Label>{groupState.childrenIds.length}</Label>
                                    ) : undefined
                                }
                            />
                        </div>
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
