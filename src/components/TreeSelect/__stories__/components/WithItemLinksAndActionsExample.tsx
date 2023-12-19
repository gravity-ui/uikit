import React from 'react';

import {ChevronDown, ChevronUp, FolderOpen} from '@gravity-ui/icons';
import identity from 'lodash/identity';

import {Button} from '../../../Button';
import {DropdownMenu} from '../../../DropdownMenu';
import {Icon} from '../../../Icon';
import {ListItemId, ListItemView} from '../../../ListNext';
import {createRandomizedData} from '../../../ListNext/__stories__/utils/makeData';
import {Flex, spacing} from '../../../layout';
import {TreeSelect} from '../../TreeSelect';
import type {TreeSelectProps} from '../../types';

export interface WithItemLinksAndActionsExampleProps
    extends Omit<
        TreeSelectProps<{title: string}>,
        'value' | 'onUpdate' | 'items' | 'getItemContent' | 'size' | 'open' | 'onOpenChange'
    > {}

export const WithItemLinksAndActionsExample = (props: WithItemLinksAndActionsExampleProps) => {
    const [open, setOpen] = React.useState(false);
    const items = React.useMemo(() => createRandomizedData({num: 10, depth: 1}), []);
    const [value, setValue] = React.useState<string[]>([]);
    const [expandedById, setExpanded] = React.useState<Record<ListItemId, boolean>>({});

    return (
        <Flex>
            <TreeSelect
                {...props}
                open={open}
                onOpenChange={setOpen}
                size="l"
                value={value}
                items={items}
                renderControlContent={identity}
                onItemClick={(_, {id, isGroup, disabled}) => {
                    if (!isGroup && !disabled) {
                        setValue([id]);
                    }

                    // navigation logic here to support keyboard
                    setOpen((x) => !x);
                }}
                expandedById={expandedById}
                renderItem={(item, state, {groupState}) => {
                    return (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a
                            href="#"
                            style={{textDecoration: 'none', color: 'inherit', width: '100%'}}
                        >
                            <ListItemView
                                {...item}
                                {...state}
                                endSlot={
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
                                                        `Clicked by action with id: ${state.id}`,
                                                    );
                                                },
                                                text: 'action 1',
                                            },
                                        ]}
                                    />
                                }
                                startSlot={
                                    groupState ? (
                                        <Button
                                            size="m"
                                            view="flat"
                                            className={spacing({mr: 1})}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();

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
                                            <Icon
                                                data={state.expanded ? ChevronDown : ChevronUp}
                                                size={16}
                                            />
                                        </Button>
                                    ) : (
                                        <Icon data={FolderOpen} size={16} />
                                    )
                                }
                            />
                        </a>
                    );
                }}
            />
        </Flex>
    );
};
