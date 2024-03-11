import React from 'react';

import {ChevronDown, ChevronUp, Database, PlugConnection} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Flex, spacing} from '../../../layout';
import {getListParsedState} from '../../../useList';
import type {KnownItemStructure, ListItemId} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {TreeSelect} from '../../TreeSelect';
import {TreeSelectItem} from '../../TreeSelectItem';
import type {TreeSelectProps} from '../../types';

/**
 * Just for example how to work with data
 */
interface CustomDataStructure {
    a: string;
}

export interface WithGroupSelectionControlledStateAndCustomIconExampleProps
    extends Omit<
        TreeSelectProps<CustomDataStructure>,
        'value' | 'onUpdate' | 'items' | 'getItemContent' | 'size'
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

    const [value, setValue] = React.useState<string[]>([]);
    const [expandedById, setExpanded] = React.useState<Record<ListItemId, boolean>>(
        () => getListParsedState(items).initialState.expandedById,
    );

    return (
        <Flex>
            <TreeSelect
                {...props}
                size="l"
                getItemContent={mapCustomDataStructureToKnownProps}
                expandedById={expandedById}
                value={value}
                renderItem={({
                    data,
                    props: {
                        expanded, // don't use default ListItemView expand icon
                        ...state
                    },
                    itemState: {groupState},
                }) => {
                    return (
                        <TreeSelectItem
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
                                            setExpanded((prevExpandedState) => ({
                                                ...prevExpandedState,
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
                onUpdate={setValue}
            />
        </Flex>
    );
};
