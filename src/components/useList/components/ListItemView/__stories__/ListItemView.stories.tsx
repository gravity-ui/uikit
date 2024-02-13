import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Avatar} from '../../../../Avatar';
import {DropdownMenu} from '../../../../DropdownMenu';
import {Text} from '../../../../Text';
import {Flex, sp} from '../../../../layout';
import {useListState} from '../../../hooks/useListState';
import {ListItemView as ListItemViewComponent} from '../ListItemView';
import type {ListItemViewProps} from '../ListItemView';

export default {
    title: 'Unstable/useList/ListItemView',
    component: ListItemViewComponent,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                    {
                        id: 'nested-interactive',
                        enabled: false, // https://github.com/gravity-ui/uikit/issues/1345
                    },
                ],
            },
            options: {},
        },
    },
} as Meta;

const title = 'title';
const subtitle = 'subtitle';

const StartSlot = ({selfStart}: {selfStart?: boolean}) => (
    <Flex shrink="0" alignSelf={selfStart ? 'flex-start' : undefined}>
        <Avatar
            imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50"
            alt={'A random image'}
            aria-label={'Sample avatar'}
        />
    </Flex>
);

const EndSlot = ({selfStart}: {selfStart?: boolean}) => (
    <Flex shrink="0" alignSelf={selfStart ? 'flex-start' : undefined}>
        <DropdownMenu
            onSwitcherClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
            items={[
                {
                    action: () => {
                        console.log(`Clicked by action 1`);
                    },
                    text: 'action 1',
                },
            ]}
            defaultSwitcherProps={{
                extraProps: {
                    'aria-label': 'Actions',
                },
            }}
        />
    </Flex>
);

const stories: ListItemViewProps[] = [
    {
        id: '1',
        title,
        activeOnHover: false,
        subtitle,
        disabled: true,
        startSlot: <StartSlot />,
    },
    {
        id: '2',
        title,
        subtitle,
        activeOnHover: false,
        endSlot: <EndSlot />,
    },
    {
        id: '3',
        title,
        size: 'l',
        subtitle,
        hasSelectionIcon: false,
        startSlot: <StartSlot />,
    },
    {
        id: '4',
        title,
        disabled: true,
        size: 'xl',
        height: 60,
        startSlot: <StartSlot />,
    },
    {
        id: '5',
        size: 'l',
        startSlot: <StartSlot />,
        title,
    },
    {
        id: '6',
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos officiis, voluptates nobis doloribus veritatis quo odit sequi eligendi aliquam quasi officia qui deserunt autem quas necessitatibus nam possimus aperiam.',
        size: 'l',
        subtitle: 'indentation 1',
        startSlot: <StartSlot />,
        indentation: 1,
        selected: true,
        endSlot: <EndSlot />,
    },
    {
        id: '7',
        expanded: true,
        size: 'xl',
        title: 'Group 1',
        endSlot: <EndSlot />,
    },
    {
        id: '8',
        hasSelectionIcon: false,
        expanded: true,
        disabled: true,
        size: 'xl',
        title: 'Group 1',
    },
    {
        id: '9',
        hasSelectionIcon: false,
        title: (
            <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos officiis,
                voluptates nobis doloribus veritatis quo odit sequi eligendi aliquam quasi officia
                qui deserunt autem quas necessitatibus nam possimus aperiam.
            </Text>
        ),
        size: 'l',
        subtitle: (
            <Text color="secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos officiis,
                voluptates nobis doloribus veritatis quo odit sequi eligendi aliquam quasi officia
                qui deserunt autem quas necessitatibus nam possimus aperiam.
            </Text>
        ),
        startSlot: <StartSlot selfStart />,
        selected: true,
        className: sp({p: 2}),
        endSlot: <EndSlot selfStart />,
    },
    {
        id: '10',
        title: (
            <Text ellipsisLines={2}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos officiis,
                voluptates nobis doloribus veritatis quo odit sequi eligendi aliquam quasi officia
                qui deserunt autem quas necessitatibus nam possimus aperiam.
            </Text>
        ),
        size: 'l',
        subtitle: (
            <Text color="danger" ellipsis>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos officiis,
                voluptates nobis doloribus veritatis quo odit sequi eligendi aliquam quasi officia
                qui deserunt autem quas necessitatibus nam possimus aperiam.
            </Text>
        ),
        startSlot: <StartSlot selfStart />,
        selected: true,
        indentation: 1,
        className: sp({p: 2}),
        endSlot: <EndSlot selfStart />,
    },
    {
        id: '11',
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos officiis, voluptates nobis doloribus veritatis quo odit sequi eligendi aliquam quasi officia qui deserunt autem quas necessitatibus nam possimus aperiam.',
        size: 'l',
        subtitle: (
            <Text ellipsisLines={2} color="secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos officiis,
                voluptates nobis doloribus veritatis quo odit sequi eligendi aliquam quasi officia
                qui deserunt autem quas necessitatibus nam possimus aperiam.
            </Text>
        ),
        expanded: true,
        startSlot: <StartSlot />,
        indentation: 1,
        selected: true,
        endSlot: <EndSlot />,
    },
];

const ListItemViewTemplate: StoryFn<ListItemViewProps> = () => {
    const listState = useListState();

    return (
        <Flex direction="column" role={'listbox'} aria-label={'Sample list'}>
            {stories.map((props, i) => (
                <ListItemViewComponent
                    key={i}
                    {...props}
                    expanded={listState.expandedById[props.id] ?? props.expanded}
                    selected={listState.selectedById[props.id]}
                    onClick={handleClick(props)}
                />
            ))}
        </Flex>
    );

    function handleClick({id, expanded}: ListItemViewProps) {
        const isGroup = typeof expanded === 'boolean';

        return () => {
            if (isGroup) {
                listState.setExpanded((prevState) => ({
                    ...prevState,
                    [id]: typeof prevState[id] === 'undefined' ? !expanded : !prevState[id],
                }));
            } else {
                listState.setSelected((prevState) => ({
                    ...prevState,
                    [id]: !prevState[id],
                }));
            }
        };
    }
};
export const ListItemView = ListItemViewTemplate.bind({});
