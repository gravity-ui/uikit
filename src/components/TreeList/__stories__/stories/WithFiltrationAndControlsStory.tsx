import React from 'react';

import {Button} from '../../../Button';
import {Text} from '../../../Text';
import {TextInput} from '../../../controls';
import {Flex, spacing} from '../../../layout';
import {useListFilter, useListState} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {TreeList} from '../../TreeList';
import type {TreeListProps, TreeListRenderContainerProps} from '../../types';
import {RenderVirtualizedContainer} from '../components/RenderVirtualizedContainer';

export interface WithFiltrationAndControlsStoryProps
    extends Omit<
        TreeListProps<{title: string}>,
        'value' | 'onUpdate' | 'items' | 'mapItemDataToProps'
    > {
    itemsCount?: number;
}

export const WithFiltrationAndControlsStory = ({
    itemsCount = 5,
    ...treeSelectProps
}: WithFiltrationAndControlsStoryProps) => {
    const {items, renderContainer} = React.useMemo(() => {
        const baseItems = createRandomizedData({num: itemsCount});
        const containerRenderer = (props: TreeListRenderContainerProps<{title: string}>) => {
            if (props.items.length === 0 && baseItems.length > 0) {
                return (
                    <Flex centerContent className={spacing({p: 2})} height="300px">
                        <Text variant="subheader-1">Nothing found</Text>
                    </Flex>
                );
            }

            return <RenderVirtualizedContainer {...props} />;
        };

        return {items: baseItems, renderContainer: containerRenderer};
    }, [itemsCount]);

    const listState = useListState();

    const filterState = useListFilter({items});

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
                {...listState}
                onItemClick={({id, groupState, disabled}) => {
                    if (disabled) return;

                    if (groupState) {
                        listState.setExpanded((prevState) => ({
                            ...prevState,
                            [id]: id in prevState ? !prevState[id] : false,
                        }));
                    } else {
                        listState.setSelected((prevState) =>
                            treeSelectProps.multiple
                                ? {
                                      ...prevState,
                                      [id]: !prevState[id],
                                  }
                                : {
                                      [id]: !prevState[id],
                                  },
                        );
                    }

                    listState.setActiveItemId(id);
                }}
                mapItemDataToProps={(x) => x}
                renderContainer={renderContainer}
                items={filterState.items}
            />
            <Flex gap="2" className={spacing({px: 2, py: 1})}>
                <Button
                    width="max"
                    onClick={() => {
                        listState.setSelected({});
                        filterState.reset();
                    }}
                >
                    Reset
                </Button>
                <Button
                    disabled={!Object.keys(listState.selectedById).length}
                    width="max"
                    view="action"
                    onClick={() => {
                        alert(JSON.stringify(listState.selectedById));
                    }}
                >
                    Accept
                </Button>
            </Flex>
        </Flex>
    );
};
