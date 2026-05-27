import * as React from 'react';

import {Button} from '../../../Button';
import {Text} from '../../../Text';
import {TextInput} from '../../../controls';
import {Flex, spacing} from '../../../layout';
import {ListContainer, useList, useListFilter} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {TreeList} from '../../TreeList';
import type {TreeListContainerProps, TreeListProps} from '../../types';

interface Entity {
    title: string;
}

export interface WithFiltrationAndControlsStoryProps
    extends Omit<
        TreeListProps<Entity>,
        'value' | 'onUpdate' | 'items' | 'mapItemDataToContentProps'
    > {
    itemsCount?: number;
}

export const WithFiltrationAndControlsStory = ({
    itemsCount = 5,
    ...treeSelectProps
}: WithFiltrationAndControlsStoryProps) => {
    const {items, renderContainer} = React.useMemo(() => {
        const baseItems = createRandomizedData({num: itemsCount});
        const containerRenderer = (props: TreeListContainerProps<Entity>) => {
            if (props.list.structure.items.length === 0 && baseItems.length > 0) {
                return (
                    <Flex centerContent className={spacing({p: 2})} height="300px">
                        <Text variant="subheader-1">Nothing found</Text>
                    </Flex>
                );
            }

            return <ListContainer {...props} />;
        };

        return {items: baseItems, renderContainer: containerRenderer};
    }, [itemsCount]);

    const filterState = useListFilter({items});

    const list = useList({items: filterState.items});

    return (
        <Flex direction="column" gap="3">
            <TextInput
                hasClear
                placeholder="Type for search..."
                className={spacing({px: 2, py: 1})}
                style={{boxSizing: 'border-box'}}
                autoComplete="off"
                value={filterState.filter}
                onUpdate={filterState.onFilterUpdate}
                ref={filterState.filterRef}
            />
            <TreeList
                {...treeSelectProps}
                list={list}
                mapItemDataToContentProps={(x) => x}
                renderContainer={renderContainer}
            />
            <Flex gap="2" className={spacing({px: 2, py: 1})}>
                <Button
                    width="max"
                    onClick={() => {
                        list.state.setSelected({});
                        filterState.reset();
                    }}
                >
                    Reset
                </Button>
                <Button
                    disabled={!Object.keys(list.state.selectedById).length}
                    width="max"
                    view="action"
                    onClick={() => {
                        alert(JSON.stringify(list.state.selectedById));
                    }}
                >
                    Accept
                </Button>
            </Flex>
        </Flex>
    );
};
