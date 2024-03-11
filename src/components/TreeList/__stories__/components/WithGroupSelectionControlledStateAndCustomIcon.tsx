import React from 'react';

import {ChevronDown, ChevronUp, Database, PlugConnection} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Flex, spacing} from '../../../layout';
import {ListItemView, useListState} from '../../../useList';
import type {KnownItemStructure} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {TreeList} from '../../TreeList';
import type {TreeListOnItemClick, TreeListProps} from '../../types';

/**
 * Just for example how to work with data
 */
interface CustomDataStructure {
    a: string;
}

export interface WithGroupSelectionControlledStateAndCustomIconExampleProps
    extends Omit<
        TreeListProps<CustomDataStructure>,
        'value' | 'onUpdate' | 'items' | 'multiple' | 'cantainerRef' | 'size'
    > {
    itemsCount?: number;
}

const mapCustomDataStructureToKnownProps = (props: CustomDataStructure): KnownItemStructure => ({
    title: props.a,
});

export const WithGroupSelectionControlledStateAndCustomIconExample = ({
    itemsCount = 5,
    ...props
}: WithGroupSelectionControlledStateAndCustomIconExampleProps) => {
    const items = React.useMemo(
        () => createRandomizedData({num: itemsCount, getData: (a) => ({a})}),
        [itemsCount],
    );

    const listState = useListState();

    const handleItemClick: TreeListOnItemClick<CustomDataStructure> = ({id, disabled}) => {
        if (disabled) return;
        console.log(1);

        listState.setSelected((prevState) => ({
            [id]: !prevState[id],
        }));

        listState.setActiveItemId(id);
    };

    return (
        <Flex direction="column" gap="3">
            <TreeList
                {...props}
                size="l"
                getItemContent={mapCustomDataStructureToKnownProps}
                {...listState}
                onItemClick={handleItemClick}
                renderItem={({
                    data,
                    props: {
                        expanded, // don't use default ListItemView expand icon
                        ...state
                    },
                    itemState: {groupState},
                }) => {
                    return (
                        <ListItemView
                            {...state}
                            {...mapCustomDataStructureToKnownProps(data)}
                            startSlot={
                                <Icon size={16} data={groupState ? Database : PlugConnection} />
                            }
                            endSlot={
                                groupState ? (
                                    <Button
                                        size="m"
                                        className={spacing({mr: 1})}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            listState.setExpanded((prevExpandedState) => ({
                                                // by default all groups expanded
                                                [state.id]:
                                                    state.id in prevExpandedState
                                                        ? !prevExpandedState[state.id]
                                                        : false,
                                            }));
                                        }}
                                    >
                                        <Icon data={expanded ? ChevronDown : ChevronUp} size={16} />
                                    </Button>
                                ) : undefined
                            }
                        />
                    );
                }}
                items={items}
            />
        </Flex>
    );
};
