import React from 'react';

import {ChevronDown, ChevronUp, Database, PlugConnection} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Flex, spacing} from '../../../layout';
import {ListItemView} from '../../../useList';
import type {ListItemCommonProps, ListItemId, UseListResult} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {TreeSelect} from '../../TreeSelect';
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
        'value' | 'onUpdate' | 'items' | 'mapItemDataToProps' | 'size'
    > {
    itemsCount?: number;
}

const mapCustomDataStructureToKnownProps = (props: CustomDataStructure): ListItemCommonProps => ({
    title: props.a,
});

export const WithGroupSelectionControlledStateAndCustomIconExample = ({
    itemsCount = 5,
    ...props
}: WithGroupSelectionControlledStateAndCustomIconExampleProps) => {
    // const [value, setValue] = React.useState<string[]>([]);
    const [open, setOpen] = React.useState(true);

    const items = React.useMemo(
        () => createRandomizedData({num: itemsCount, getData: (a) => ({a})}),
        [itemsCount],
    );

    const onItemClick = ({id, list}: {id: ListItemId; list: UseListResult<{a: string}>}) => {
        if (list.state.disabledById[id]) return;

        list.state.setSelected({[id]: true});

        list.state.setActiveItemId(id);

        setOpen(false);
    };

    return (
        <Flex>
            <TreeSelect
                {...props}
                size="l"
                open={open}
                onOpenChange={setOpen}
                // value={value}
                items={items}
                mapItemDataToProps={mapCustomDataStructureToKnownProps}
                onItemClick={onItemClick}
                renderItem={({
                    data,
                    props: {
                        expanded, // don't use default ListItemView expand icon
                        ...renderProps
                    },
                    context: {childrenIds},
                    list,
                }) => {
                    // groups items are selectable too
                    renderProps.hasSelectionIcon = Boolean(props.multiple);

                    return (
                        <ListItemView
                            {...renderProps}
                            {...mapCustomDataStructureToKnownProps(data)}
                            startSlot={
                                <Icon size={16} data={childrenIds ? Database : PlugConnection} />
                            }
                            endSlot={
                                childrenIds ? (
                                    <Button
                                        size="m"
                                        className={spacing({mr: 1})}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            list.state.setExpanded?.((prevExpandedState) => ({
                                                ...prevExpandedState,
                                                [renderProps.id]:
                                                    !prevExpandedState[renderProps.id],
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
            />
        </Flex>
    );
};
