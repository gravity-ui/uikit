import * as React from 'react';

import {Database, PlugConnection} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Flex} from '../../../layout';
import {ListItemExpandIcon, ListItemView, useList} from '../../../useList';
import type {ListItemId, ListItemViewContentType} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {TreeList} from '../../TreeList';
import type {TreeListProps} from '../../types';

const expandButtonLabel = 'Expand';
const closeButtonLabel = 'Close';

/**
 * Just for example how to work with data
 */
interface CustomDataStructure {
    a: string;
}

export interface WithGroupSelectionAndCustomIconStoryProps
    extends Omit<
        TreeListProps<CustomDataStructure>,
        'value' | 'onUpdate' | 'items' | 'cantainerRef' | 'size' | 'mapItemDataToContentProps'
    > {
    itemsCount?: number;
}

const mapCustomDataStructureToKnownProps = (
    props: CustomDataStructure,
): ListItemViewContentType => ({
    title: props.a,
});

export const WithGroupSelectionAndCustomIconStory = ({
    itemsCount = 5,
    ...props
}: WithGroupSelectionAndCustomIconStoryProps) => {
    const items = React.useMemo(
        () => createRandomizedData({num: itemsCount, getData: (a) => ({a})}),
        [itemsCount],
    );

    const list = useList({items});

    const onItemClick = ({id}: {id: ListItemId}) => {
        if (list.state.disabledById[id]) return;

        list.state.setSelected((prevState) => ({
            ...(props.multiple ? prevState : {}),
            [id]: !prevState[id],
        }));

        list.state.setActiveItemId(id);
    };

    return (
        <Flex direction="column" gap="3">
            <TreeList
                {...props}
                list={list}
                size="l"
                mapItemDataToContentProps={mapCustomDataStructureToKnownProps}
                onItemClick={onItemClick}
                renderItem={({id, props: itemProps, context: {childrenIds}}) => {
                    // has no group
                    itemProps.selectionViewType = props.multiple ? 'multiple' : 'single';

                    return (
                        <ListItemView
                            {...itemProps}
                            content={{
                                ...itemProps.content,
                                isGroup: false,
                                startSlot: (
                                    <Icon
                                        size={16}
                                        data={childrenIds ? Database : PlugConnection}
                                    />
                                ),

                                endSlot: childrenIds ? (
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            list.state.setExpanded?.((prevExpandedState) => ({
                                                ...prevExpandedState,
                                                [id]: !prevExpandedState[id],
                                            }));
                                        }}
                                        aria-label={
                                            itemProps.content.expanded
                                                ? closeButtonLabel
                                                : expandButtonLabel
                                        }
                                    >
                                        <Button.Icon>
                                            <ListItemExpandIcon
                                                expanded={itemProps.content.expanded}
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
