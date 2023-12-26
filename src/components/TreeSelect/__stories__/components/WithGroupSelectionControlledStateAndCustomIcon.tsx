import React from 'react';

import {ChevronDown, ChevronUp, Database, PlugConnection} from '@gravity-ui/icons';
import identity from 'lodash/identity';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Flex, spacing} from '../../../layout';
import {ListItemId, ListItemView, getListParsedState} from '../../../useList';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {TreeSelect} from '../../TreeSelect';
import type {TreeSelectProps} from '../../types';

export interface WithGroupSelectionControlledStateAndCustomIconExampleProps
    extends Omit<
        TreeSelectProps<{title: string}>,
        'value' | 'onUpdate' | 'items' | 'getItemContent' | 'size'
    > {
    itemsCount?: number;
}

export const WithGroupSelectionControlledStateAndCustomIconExample = ({
    itemsCount = 5,
    ...props
}: WithGroupSelectionControlledStateAndCustomIconExampleProps) => {
    const items = React.useMemo(() => createRandomizedData({num: itemsCount}), [itemsCount]);

    const [value, setValue] = React.useState<string[]>([]);
    const [expandedById, setExpanded] = React.useState<Record<ListItemId, boolean>>(
        () => getListParsedState(items).initialState.expandedById,
    );

    return (
        <Flex>
            <TreeSelect
                {...props}
                size="l"
                renderControlContent={identity}
                expandedById={expandedById}
                popupClassName={spacing({p: 2})}
                value={value}
                renderItem={(item, state, {groupState}) => {
                    return (
                        <ListItemView
                            {...state}
                            {...item}
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
                                        <Icon
                                            data={state.expanded ? ChevronDown : ChevronUp}
                                            size={16}
                                        />
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