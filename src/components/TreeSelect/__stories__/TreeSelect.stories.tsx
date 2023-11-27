import React from 'react';

import {ChevronDown, ChevronUp, Database, PlugConnection} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react';
import identity from 'lodash/identity';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import type {GetItemContent, ListItemId, ListItemType} from '../../ListNext';
import {getListParsedState} from '../../ListNext';
import {createRandomizedData} from '../../ListNext/__stories__/utils/makeData';
import {useInfinityFetch} from '../../ListNext/__stories__/utils/useInfinityFetch';
import {IntersectionContainer} from '../../ListNext/components/IntersectionContainer/IntersectionContainer';
import {useListFilter} from '../../ListNext/hooks/useListFilter';
import {Loader} from '../../Loader';
import {Text} from '../../Text';
import {TextInput} from '../../controls';
import {Flex, spacing} from '../../layout';
import {TreeSelect} from '../TreeSelect';
import type {TreeSelectProps} from '../types';

export default {
    title: 'Unstable/TreeSelect',
    component: TreeSelect,
} as Meta;

const DefaultExample: StoryFn<
    Omit<TreeSelectProps<{title: string}>, 'value' | 'onUpdate' | 'items' | 'getItemContent'> & {
        itemsCount?: number;
    }
> = ({itemsCount = 5, ...props}) => {
    const items = React.useMemo(() => createRandomizedData(itemsCount), [itemsCount]);
    const [value, setValue] = React.useState<string[]>([]);

    return (
        <Flex>
            <TreeSelect
                {...props}
                popupClassName={spacing({p: 2})}
                value={value}
                getItemContent={identity}
                items={items}
                onUpdate={setValue}
            />
        </Flex>
    );
};
export const Default = DefaultExample.bind({});
DefaultExample.args = {
    size: 'l',
};

const getItemsExpandedState = <T,>(items: ListItemType<T>[]) => {
    return Object.entries(getListParsedState(items).groupsState).reduce<
        Record<ListItemId, boolean>
    >((acc, [groupId, {expanded}]) => {
        acc[groupId] = true;

        if (typeof expanded !== 'undefined') {
            acc[groupId] = expanded;
        }
        return acc;
    }, {});
};

const WithGroupSelectionControlledStateAndCustomIconsExample: StoryFn<
    Omit<TreeSelectProps<{title: string}>, 'value' | 'onUpdate' | 'items' | 'getItemContent'> & {
        itemsCount?: number;
    }
> = ({itemsCount = 5, ...props}) => {
    const items = React.useMemo(() => createRandomizedData(itemsCount), [itemsCount]);
    const [value, setValue] = React.useState<string[]>([]);
    const [expandedItemsMap, setExpanded] = React.useState<Record<ListItemId, boolean>>(() =>
        getItemsExpandedState(items),
    );

    const getItemContent: GetItemContent<{title: string}> = ({title}, {isGroup, id}) => ({
        title,
        startSlot: <Icon size={16} data={isGroup ? Database : PlugConnection} />,
        endSlot: isGroup ? (
            <Button
                size={'m'}
                className={spacing({mr: 1})}
                onClick={(e) => {
                    e.stopPropagation();
                    setExpanded((prevExpandedState) => ({
                        // by default all groups expanded
                        [id]: id in prevExpandedState ? !prevExpandedState[id] : false,
                    }));
                }}
            >
                <Icon
                    data={
                        (typeof expandedItemsMap[id] === 'boolean' ? expandedItemsMap[id] : true)
                            ? ChevronDown
                            : ChevronUp
                    }
                    size={16}
                />
            </Button>
        ) : undefined,
    });

    return (
        <Flex>
            <TreeSelect
                {...props}
                expandedItemsMap={expandedItemsMap}
                popupClassName={spacing({p: 2})}
                value={value}
                getItemContent={getItemContent}
                items={items}
                onUpdate={setValue}
            />
        </Flex>
    );
};
export const WithGroupSelectionControlledStateAndCustomIcons =
    WithGroupSelectionControlledStateAndCustomIconsExample.bind({});
WithGroupSelectionControlledStateAndCustomIcons.args = {
    size: 'l',
    multiple: true,
    groupsBehavior: 'selectable',
};

const InfinityScrollExample: StoryFn<
    Omit<TreeSelectProps<{title: string}>, 'value' | 'onUpdate' | 'items' | 'getItemContent'> & {
        itemsCount?: number;
    }
> = ({itemsCount = 5, ...props}) => {
    const [value, setValue] = React.useState<string[]>([]);
    const {
        data = [],
        onFetchMore,
        canFetchMore,
        isLoading,
    } = useInfinityFetch<{title: string}>(itemsCount, true);

    return (
        <Flex>
            <TreeSelect
                {...props}
                value={value}
                popupClassName={spacing({p: 2})}
                getItemContent={identity}
                itemWrapper={(node, {isLastItem}) => {
                    if (isLastItem) {
                        return (
                            <IntersectionContainer
                                onIntersect={canFetchMore ? onFetchMore : undefined}
                            >
                                {node}
                            </IntersectionContainer>
                        );
                    }

                    return node;
                }}
                virtualized
                items={data}
                onUpdate={setValue}
                slotAfterListBody={
                    isLoading && (
                        <Flex justifyContent="center" className={spacing({py: 2})}>
                            <Loader size={'m'} />
                        </Flex>
                    )
                }
            />
        </Flex>
    );
};
export const InfinityScroll = InfinityScrollExample.bind({});
InfinityScrollExample.args = {
    size: 'm',
    multiple: true,
};

const WithFiltrationAndControlsExample: StoryFn<
    Omit<TreeSelectProps<{title: string}>, 'value' | 'onUpdate' | 'items' | 'getItemContent'> & {
        itemsCount?: number;
    }
> = ({itemsCount = 5, ...props}) => {
    const items = React.useMemo(() => createRandomizedData(itemsCount), [itemsCount]);
    const [open, onOpenChange] = React.useState(true);
    const [value, setValue] = React.useState<string[]>([]);
    const filterState = useListFilter({items});

    return (
        <Flex>
            <TreeSelect
                {...props}
                multiple
                open={open}
                onOpenChange={onOpenChange}
                slotBeforeListBody={
                    <TextInput
                        autoFocus
                        hasClear
                        placeholder="Type for search..."
                        className={spacing({p: 2})}
                        style={{boxSizing: 'border-box'}}
                        autoComplete="off"
                        value={filterState.filter}
                        onUpdate={filterState.onChange}
                        ref={filterState.filterRef}
                    />
                }
                containerWrapper={(node, context) => {
                    if (context.items.length === 0 && items.length > 0) {
                        return (
                            <Flex direction="column" gap="3" className={spacing({p: 2})}>
                                <Text variant="subheader-1">Nothing found</Text>
                            </Flex>
                        );
                    }

                    return node;
                }}
                slotAfterListBody={
                    <Flex gap="2" className={spacing({p: 2})}>
                        <Button
                            width="max"
                            onClick={() => {
                                setValue([]);
                                filterState.reset();
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            disabled={!value.length}
                            width="max"
                            view="action"
                            onClick={() => {
                                onOpenChange(false);
                                alert(JSON.stringify(value));
                            }}
                        >
                            Accept
                        </Button>
                    </Flex>
                }
                value={value}
                getItemContent={identity}
                items={filterState.items}
                onUpdate={setValue}
            />
        </Flex>
    );
};
export const WithFiltrationAndControls = WithFiltrationAndControlsExample.bind({});
WithFiltrationAndControlsExample.args = {
    size: 'l',
};

const emptyItems: ListItemType<{title: string}>[] = [];

const WithCustomEmptyContentExample: StoryFn<
    Omit<TreeSelectProps<{title: string}>, 'value' | 'onUpdate' | 'items' | 'getItemContent'>
> = (props) => {
    return (
        <Flex>
            <TreeSelect
                {...props}
                items={emptyItems}
                containerWrapper={(node, context) => {
                    if (context.items.length === 0) {
                        return (
                            <Flex gap="3" className={spacing({p: 2})} justifyContent="center">
                                <Text variant="subheader-1">Nothing found</Text>
                            </Flex>
                        );
                    }

                    return node;
                }}
                getItemContent={(x) => x}
            />
        </Flex>
    );
};
export const WithCustomEmptyContent = WithCustomEmptyContentExample.bind({});
WithCustomEmptyContentExample.args = {
    size: 'l',
};
