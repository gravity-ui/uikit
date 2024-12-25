import * as React from 'react';

import {FolderOpen} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {DropdownMenu} from '../../../DropdownMenu';
import {Icon} from '../../../Icon';
import {Flex} from '../../../layout';
import {ListItemExpandIcon, ListItemView} from '../../../useList';
import type {ListItemId, UseListResult} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {TreeSelect} from '../../TreeSelect';
import type {TreeSelectProps} from '../../types';

function identity<T>(value: T): T {
    return value;
}
export interface WithItemLinksAndActionsExampleProps
    extends Omit<
        TreeSelectProps<{title: string}>,
        | 'value'
        | 'onUpdate'
        | 'items'
        | 'mapItemDataToContentProps'
        | 'size'
        | 'open'
        | 'onOpenChange'
    > {}

export const WithItemLinksAndActionsExample = (storyProps: WithItemLinksAndActionsExampleProps) => {
    const [value, setValue] = React.useState<string[]>([]);
    const [open, setOpen] = React.useState(true);
    const items = React.useMemo(() => createRandomizedData({num: 10, depth: 1}), []);

    const onItemClick = (id: ListItemId, list: UseListResult<{title: string}>) => {
        if (list.state.disabledById[id]) return;

        setValue([id]);

        list.state.setActiveItemId(id);

        setOpen(false);
    };

    return (
        <Flex>
            <TreeSelect
                {...storyProps}
                value={value}
                items={items}
                mapItemDataToContentProps={identity}
                open={open}
                onOpenChange={setOpen}
                size="l"
                renderItem={({id, props, context: {childrenIds}, list}) => {
                    return (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a
                            href="#"
                            style={{textDecoration: 'none', color: 'inherit', width: '100%'}}
                        >
                            <ListItemView
                                {...props}
                                content={{
                                    ...props.content,
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
                                                        console.log(
                                                            `Clicked by action with id: ${id}`,
                                                        );
                                                    },
                                                    text: 'action 1',
                                                },
                                            ]}
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
                                        >
                                            <Button.Icon>
                                                <ListItemExpandIcon
                                                    expanded={props.content.expanded}
                                                    behavior="state"
                                                />
                                            </Button.Icon>
                                        </Button>
                                    ) : (
                                        <Flex
                                            width={28}
                                            justifyContent="center"
                                            spacing={
                                                (props.content.indentation ?? 0) > 0
                                                    ? {ml: 1}
                                                    : undefined
                                            }
                                        >
                                            <Icon data={FolderOpen} size={16} />
                                        </Flex>
                                    ),
                                }}
                                onClick={() => onItemClick(id, list)}
                            />
                        </a>
                    );
                }}
            />
        </Flex>
    );
};
