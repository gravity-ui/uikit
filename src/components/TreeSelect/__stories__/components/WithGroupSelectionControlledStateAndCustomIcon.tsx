import * as React from 'react';

import {Database, PlugConnection} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Flex, spacing} from '../../../layout';
import {ListItemExpandIcon, ListItemView} from '../../../useList';
import type {ListItemId, ListItemViewContentType, UseListResult} from '../../../useList';
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
        'value' | 'onUpdate' | 'items' | 'mapItemDataToContentProps' | 'size'
    > {
    itemsCount?: number;
}

const mapCustomDataStructureToKnownProps = (
    props: CustomDataStructure,
): ListItemViewContentType => ({
    title: props.a,
});

export const WithGroupSelectionControlledStateAndCustomIconExample = ({
    itemsCount = 5,
    ...storyProps
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
                {...storyProps}
                size="l"
                open={open}
                onOpenChange={setOpen}
                items={items}
                mapItemDataToContentProps={mapCustomDataStructureToKnownProps}
                onItemClick={onItemClick}
                renderItem={({id, props, context: {childrenIds}, list}) => {
                    // groups items are selectable too
                    props.selectionViewType = storyProps.multiple ? 'multiple' : 'single';

                    return (
                        <ListItemView
                            {...props}
                            content={{
                                ...props.content,
                                isGroup: false,
                                startSlot: (
                                    <Icon
                                        size={16}
                                        data={childrenIds ? Database : PlugConnection}
                                    />
                                ),
                                endSlot: childrenIds ? (
                                    <Button
                                        size="m"
                                        className={spacing({mr: 1})}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            list.state.setExpanded?.((prevExpandedState) => ({
                                                ...prevExpandedState,
                                                [id]: !prevExpandedState[id],
                                            }));
                                        }}
                                    >
                                        <Button.Icon>
                                            <ListItemExpandIcon
                                                expanded={props.content.expanded}
                                                behavior="action"
                                            />
                                        </Button.Icon>
                                    </Button>
                                ) : undefined,
                            }}
                        />
                    );
                }}
            />
        </Flex>
    );
};
