import * as React from 'react';

import {FolderOpen} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {DropdownMenu} from '../../../DropdownMenu';
import {Icon} from '../../../Icon';
import {Flex} from '../../../layout';
import {ListItemExpandIcon, ListItemView, useList} from '../../../useList';
import type {ListItemId} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {TreeList} from '../../TreeList';
import type {TreeListProps} from '../../types';

const expandButtonLabel = 'Expand';
const closeButtonLabel = 'Close';
const moreOptionsButton = 'More options';

function identity<T>(value: T): T {
    return value;
}

export interface WithItemLinksAndActionsStoryProps
    extends Omit<TreeListProps<{title: string}>, 'items' | 'size' | 'mapItemDataToContentProps'> {}

export const WithItemLinksAndActionsStory = (props: WithItemLinksAndActionsStoryProps) => {
    const items = React.useMemo(() => createRandomizedData({num: 10, depth: 1}), []);

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
        <TreeList
            {...props}
            list={list}
            mapItemDataToContentProps={identity}
            onItemClick={onItemClick}
            size="l"
            renderItem={({id, props: itemProps, context: {childrenIds}}) => {
                return (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a href="#" style={{textDecoration: 'none', color: 'inherit', width: '100%'}}>
                        <ListItemView
                            {...itemProps}
                            content={{
                                ...itemProps.content,
                                isGroup: false,
                                endSlot: (
                                    <DropdownMenu
                                        onSwitcherClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                        items={[
                                            {
                                                action: (e) => {
                                                    e.stopPropagation();
                                                    console.log(`Clicked by action with id: ${id}`);
                                                },
                                                text: 'action 1',
                                            },
                                        ]}
                                        defaultSwitcherProps={{
                                            'aria-label': moreOptionsButton,
                                        }}
                                    />
                                ),
                                startSlot: childrenIds ? (
                                    <Button
                                        size="m"
                                        view="flat"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();

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
                                ) : (
                                    <Flex
                                        width={28}
                                        justifyContent="center"
                                        spacing={
                                            (itemProps.content.indentation || 0) > 0
                                                ? {ml: 1}
                                                : undefined
                                        }
                                    >
                                        <Icon data={FolderOpen} size={16} />
                                    </Flex>
                                ),
                            }}
                        />
                    </a>
                );
            }}
        />
    );
};
