import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Avatar} from '../../../../Avatar';
import {Button} from '../../../../Button';
import {DropdownMenu} from '../../../../DropdownMenu';
import {Text} from '../../../../Text';
import {Flex, sp} from '../../../../layout';
import type {ListItemId} from '../../../../useList/types';
import {ListItemExpandIcon} from '../../ListItemExpandIcon';
import {ListItemView as ListItemViewComponent} from '../ListItemView';
import type {ListItemViewProps} from '../ListItemView';
import {isListItemContentPropsGuard} from '../ListItemViewContent';

export default {
    title: 'Lab/useList/ListItemView',
    component: ListItemViewComponent,
    parameters: {
        a11y: {
            context: '#storybook-root',
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
        },
    },
} as Meta;

const title = 'title';
const subtitle = 'subtitle';

const StartSlot = ({selfStart}: {selfStart?: boolean}) => (
    <Flex shrink="0" alignSelf={selfStart ? 'flex-start' : undefined}>
        <Avatar
            imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50"
            alt="A random image"
            aria-label="Sample avatar"
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
                        console.log('Clicked by action 1');
                    },
                    text: 'action 1',
                },
            ]}
            defaultSwitcherProps={{
                'aria-label': 'Actions',
            }}
        />
    </Flex>
);

const stories: ListItemViewProps[] = [
    {
        id: '1',
        content: {
            title,
            subtitle,
            startSlot: <StartSlot />,
        },
        disabled: true,
        activeOnHover: false,
    },
    {
        id: '2',
        content: {
            title,
            subtitle: 'activeOnHover - false',
            endSlot: <EndSlot />,
        },
        selected: true,
        activeOnHover: false,
    },
    {
        id: '3',
        selectionViewType: 'single',
        content: {
            title,
            subtitle,
            startSlot: <StartSlot />,
        },
        selected: true,
        size: 'l',
    },
    {
        id: '4',
        content: {
            title,
            startSlot: <StartSlot />,
        },
        disabled: true,
        size: 'xl',
        height: 60,
    },
    {
        id: '5',
        size: 'l',
        content: {
            startSlot: <StartSlot />,
            title,
        },
    },
    {
        id: '6',
        content: {
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos officiis, voluptates nobis doloribus veritatis quo odit sequi eligendi aliquam quasi officia qui deserunt autem quas necessitatibus nam possimus aperiam.',
            subtitle: 'indentation 1',
            startSlot: <StartSlot />,
            indentation: 1,
            endSlot: <EndSlot />,
        },
        selected: true,
        size: 'l',
    },
    {
        id: '7',
        size: 'xl',
        content: {
            isGroup: true,
            expanded: true,
            title: 'Group 1',
            endSlot: <EndSlot />,
        },
    },
    {
        id: '8',
        selectionViewType: 'single',
        content: {
            title: 'Group 1',
            expanded: true,
            isGroup: true,
        },
        disabled: true,
        size: 'xl',
    },
    {
        id: '9',
        selectionViewType: 'single',
        content: {
            subtitle: (
                <Text color="secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos officiis,
                    voluptates nobis doloribus veritatis quo odit sequi eligendi aliquam quasi
                    officia qui deserunt autem quas necessitatibus nam possimus aperiam.
                </Text>
            ),
            startSlot: <StartSlot selfStart />,
            title: (
                <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos officiis,
                    voluptates nobis doloribus veritatis quo odit sequi eligendi aliquam quasi
                    officia qui deserunt autem quas necessitatibus nam possimus aperiam.
                </Text>
            ),
            endSlot: <EndSlot selfStart />,
        },
        size: 'l',
        selected: true,
        className: sp({p: 2}),
    },
    {
        id: '10',
        content: {
            title: (
                <Text ellipsisLines={2}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos officiis,
                    voluptates nobis doloribus veritatis quo odit sequi eligendi aliquam quasi
                    officia qui deserunt autem quas necessitatibus nam possimus aperiam.
                </Text>
            ),
            subtitle: (
                <Text color="danger" ellipsis>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos officiis,
                    voluptates nobis doloribus veritatis quo odit sequi eligendi aliquam quasi
                    officia qui deserunt autem quas necessitatibus nam possimus aperiam.
                </Text>
            ),
            startSlot: <StartSlot selfStart />,
            indentation: 1,
            endSlot: <EndSlot selfStart />,
        },
        selected: true,
        size: 'l',
        className: sp({p: 2}),
    },
    {
        id: '11',
        size: 'l',
        content: {
            title: 'With disable expand icon transition. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos officiis, voluptates nobis doloribus veritatis quo odit sequi eligendi aliquam quasi officia qui deserunt autem quas necessitatibus nam possimus aperiam.',
            subtitle: (
                <Text ellipsisLines={2} color="secondary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos officiis,
                    voluptates nobis doloribus veritatis quo odit sequi eligendi aliquam quasi
                    officia qui deserunt autem quas necessitatibus nam possimus aperiam.
                </Text>
            ),
            expanded: true,
            isGroup: true,
            startSlot: <StartSlot />,
            indentation: 1,
            endSlot: <EndSlot />,
        },
    },
    {
        id: '12',
        size: 'l',
        content: (
            <Flex gap="2" alignItems="center">
                <StartSlot />
                <Text>Override list item context with react node</Text>
            </Flex>
        ),
    },
    {
        id: '13',
        size: 'l',
        content: {
            title,
            startSlot: <StartSlot />,
            indentation: 1,
            isGroup: true,
            expanded: false,
            expandIconPlacement: 'end',
        },
    },
    {
        id: '14',
        size: 'l',
        content: {
            title: 'Custom icon end',
            isGroup: true,
            expanded: false,
            expandIconPlacement: 'end',
            renderExpandIcon: (props) => (
                <Button view="flat" aria-label="Toggle Button">
                    <Button.Icon>
                        <ListItemExpandIcon {...props} />
                    </Button.Icon>
                </Button>
            ),
        },
    },
];

const ListItemViewTemplate: StoryFn<ListItemViewProps> = () => {
    const [expandedById, setExpandedById] = React.useState<Record<ListItemId, boolean>>({});
    const [selectedById, setSelectedById] = React.useState<Record<ListItemId, boolean>>({});

    return (
        <Flex direction="column" role="listbox" aria-label="Sample list" width={400}>
            {stories.map((props, i) => {
                let expanded: boolean | undefined;

                if (isListItemContentPropsGuard(props.content) && props.content.isGroup) {
                    expanded =
                        props.id in expandedById ? expandedById[props.id] : props.content.expanded;
                }

                return (
                    <ListItemViewComponent
                        key={i}
                        {...props}
                        content={
                            isListItemContentPropsGuard(props.content)
                                ? {
                                      ...props.content,
                                      expanded,
                                  }
                                : props.content
                        }
                        selected={selectedById[props.id]}
                        onClick={handleClick(props)}
                    />
                );
            })}
        </Flex>
    );

    function handleClick({id, content}: ListItemViewProps) {
        if (isListItemContentPropsGuard(content)) {
            const isGroup = content.isGroup;

            return () => {
                if (isGroup) {
                    setExpandedById((prevState) => ({
                        ...prevState,
                        [id]: id in prevState ? !prevState[id] : !content.expanded,
                    }));
                } else {
                    setSelectedById((prevState) => ({
                        ...prevState,
                        [id]: !prevState[id],
                    }));
                }
            };
        }

        return undefined;
    }
};
export const ListItemView = ListItemViewTemplate.bind({});
