import React from 'react';

import identity from 'lodash/identity';

import {Label} from '../../../Label';
import {ListItemView} from '../../../ListNext';
import {useInfinityFetch} from '../../../ListNext/__stories__/utils/useInfinityFetch';
import {IntersectionContainer} from '../../../ListNext/components/IntersectionContainer/IntersectionContainer';
import {Loader} from '../../../Loader';
import {Flex, spacing} from '../../../layout';
import {TreeSelect} from '../../TreeSelect';
import type {TreeSelectProps} from '../../types';

import {RenderVirtualizedContainer} from './RenderVirtualizedContainer';
export interface InfinityScrollExampleProps
    extends Omit<
        TreeSelectProps<{title: string}>,
        'value' | 'onUpdate' | 'items' | 'getItemContent'
    > {
    itemsCount?: number;
}

export const InfinityScrollExample = ({itemsCount = 5, ...props}: InfinityScrollExampleProps) => {
    const [value, setValue] = React.useState<string[]>([]);
    const {
        data = [],
        onFetchMore,
        canFetchMore,
        isLoading,
    } = useInfinityFetch<{title: string}>(itemsCount, true);

    return (
        <Flex>
            <TreeSelect
                {...props}
                value={value}
                popupClassName={spacing({p: 2})}
                renderControlContent={identity}
                renderItem={(item, state, {isLastItem, groupState}) => {
                    const node = (
                        <ListItemView
                            {...state}
                            {...item}
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
                items={data}
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
