import {Label} from '../../../Label';
import {Loader} from '../../../Loader';
import {Flex, spacing} from '../../../layout';
import {ListItemView, useList} from '../../../useList';
import {IntersectionContainer} from '../../../useList/__stories__/components/IntersectionContainer/IntersectionContainer';
import {useInfinityFetch} from '../../../useList/__stories__/utils/useInfinityFetch';
import {TreeList} from '../../TreeList';
import type {TreeListProps} from '../../types';
import {RenderVirtualizedContainer} from '../components/RenderVirtualizedContainer';

interface Entity {
    title: string;
}

function identity<T>(value: T): T {
    return value;
}

export interface InfinityScrollStoryProps
    extends Omit<
        TreeListProps<Entity>,
        'value' | 'onUpdate' | 'items' | 'multiple' | 'size' | 'mapItemDataToContentProps'
    > {
    itemsCount?: number;
}

const multiple = true;

export const InfinityScrollStory = ({itemsCount = 3, ...storyProps}: InfinityScrollStoryProps) => {
    const {
        data: items = [],
        onFetchMore,
        canFetchMore,
        isLoading,
    } = useInfinityFetch<Entity>(itemsCount, true);

    const list = useList({items});

    return (
        <Flex direction="column">
            <TreeList<{title: string}>
                {...storyProps}
                size="l"
                list={list}
                mapItemDataToContentProps={identity}
                multiple={multiple}
                renderItem={({props, context: {isLastItem, childrenIds}}) => {
                    const node = (
                        <ListItemView
                            {...props}
                            content={{
                                ...props.content,
                                endSlot: childrenIds ? (
                                    <Label>{childrenIds.length}</Label>
                                ) : undefined,
                            }}
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
