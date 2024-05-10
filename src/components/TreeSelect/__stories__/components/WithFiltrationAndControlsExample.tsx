import React from 'react';

import {Button} from '../../../Button';
import {Text} from '../../../Text';
import {RenderVirtualizedContainer} from '../../../TreeList/__stories__/components/RenderVirtualizedContainer';
import {TextInput} from '../../../controls';
import {Flex, spacing} from '../../../layout';
import {ListItemView, useListFilter, useListState} from '../../../useList';
import type {ListItemId} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {TreeSelect} from '../../TreeSelect';
import type {TreeSelectProps, TreeSelectRenderContainer} from '../../types';

function identity<T>(value: T): T {
    return value;
}

export interface WithFiltrationAndControlsExampleProps
    extends Omit<
        TreeSelectProps<{title: string}>,
        'value' | 'onUpdate' | 'items' | 'mapItemDataToProps'
    > {
    itemsCount?: number;
}

export const WithFiltrationAndControlsExample = ({
    itemsCount = 5,
    ...treeSelectProps
}: WithFiltrationAndControlsExampleProps) => {
    const {items, renderContainer} = React.useMemo(() => {
        const baseItems = createRandomizedData({num: itemsCount});
        const containerRenderer: TreeSelectRenderContainer<{title: string}> = (props) => {
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

    const [open, onOpenChange] = React.useState(true);
    const listState = useListState();
    const filterState = useListFilter({items});

    return (
        <Flex>
            <TreeSelect
                {...treeSelectProps}
                {...listState}
                mapItemDataToProps={identity}
                multiple
                open={open}
                popupWidth={350}
                onOpenChange={onOpenChange}
                slotBeforeListBody={
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
                }
                renderItem={({props, data}) => (
                    <div style={{paddingInline: 8}}>
                        <ListItemView {...props} {...data} />
                    </div>
                )}
                renderContainer={renderContainer}
                slotAfterListBody={
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
                            disabled={
                                // get selected ids list
                                !Object.entries(listState.selectedById).reduce<ListItemId[]>(
                                    (acc, [id, value]) => {
                                        if (value) {
                                            acc.push(id);
                                        }
                                        return acc;
                                    },
                                    [],
                                )
                            }
                            width="max"
                            view="action"
                            onClick={() => {
                                onOpenChange(false);
                                alert(JSON.stringify(listState.selectedById, null, 2));
                            }}
                        >
                            Accept
                        </Button>
                    </Flex>
                }
                items={filterState.items}
            />
        </Flex>
    );
};
