import React from 'react';

import {ChevronDown, ChevronUp, Database, PlugConnection} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Flex, spacing} from '../../../layout';
import {ListItemView, useList} from '../../../useList';
import type {ListItemCommonProps, ListItemId} from '../../../useList';
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
        'value' | 'onUpdate' | 'items' | 'cantainerRef' | 'size' | 'mapItemDataToProps'
    > {
    itemsCount?: number;
}

const mapCustomDataStructureToKnownProps = (props: CustomDataStructure): ListItemCommonProps => ({
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
                mapItemDataToProps={mapCustomDataStructureToKnownProps}
                onItemClick={onItemClick}
                renderItem={({
                    data,
                    props: {
                        expanded, // don't use default ListItemView expand icon
                        ...preparedProps
                    },
                    context: {childrenIds},
                }) => {
                    // has no group
                    preparedProps.hasSelectionIcon = Boolean(props.multiple);

                    return (
                        <ListItemView
                            {...preparedProps}
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
                                                [preparedProps.id]:
                                                    !prevExpandedState[preparedProps.id],
                                            }));
                                        }}
                                        extraProps={{
                                            'aria-label': expanded
                                                ? closeButtonLabel
                                                : expandButtonLabel,
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
