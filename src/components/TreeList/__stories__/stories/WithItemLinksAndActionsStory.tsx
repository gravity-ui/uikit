import React from 'react';

import {ChevronDown, ChevronUp, FolderOpen} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {DropdownMenu} from '../../../DropdownMenu';
import {Icon} from '../../../Icon';
import {Flex} from '../../../layout';
import {ListItemView, useListState} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {TreeList} from '../../TreeList';
import type {TreeListProps} from '../../types';

function identity<T>(value: T): T {
    return value;
}

export interface WithItemLinksAndActionsStoryProps
    extends Omit<
        TreeListProps<{title: string}>,
        'items' | 'size' | 'multiple' | 'getItemContent'
    > {}

export const WithItemLinksAndActionsStory = (props: WithItemLinksAndActionsStoryProps) => {
    const items = React.useMemo(() => createRandomizedData({num: 10, depth: 1}), []);

    const listState = useListState();

    return (
        <TreeList
            {...props}
            {...listState}
            getItemContent={identity}
            size="l"
            items={items}
            onItemClick={({id, isGroup, disabled}) => {
                if (!isGroup && !disabled) {
                    listState.setSelected((prevState) => ({[id]: !prevState[id]}));
                }
            }}
            renderItem={({
                data,
                props: {
                    expanded, // don't use build in expand icon ListItemView behavior
                    ...state
                },
                itemState: {groupState},
            }) => {
                return (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a href="#" style={{textDecoration: 'none', color: 'inherit', width: '100%'}}>
                        <ListItemView
                            {...data}
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();

                                            listState.setExpanded((prevExpandedState) => ({
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
                                ) : (
                                    <Flex
                                        width={28}
                                        justifyContent="center"
                                        spacing={state.indentation > 0 ? {ml: 1} : undefined}
                                    >
                                        <Icon data={FolderOpen} size={16} />
                                    </Flex>
                                )
                            }
                        />
                    </a>
                );
            }}
        />
    );
};
