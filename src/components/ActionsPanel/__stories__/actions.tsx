import {ChevronDown, Files, PencilToSquare, TrashBin} from '@gravity-ui/icons';

import type {ActionsPanelProps} from '../../ActionsPanel';
import {Icon} from '../../Icon';
import {Flex} from '../../layout';

export const actions: ActionsPanelProps['actions'] = [
    {
        id: 'action_1',
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 1'),
                text: 'Action 1',
            },
        },
    },
    {
        id: 'action_2',
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 2'),
                text: 'Action 2',
            },
        },
    },
];

export const actionsWithIcons: ActionsPanelProps['actions'] = [
    {
        id: 'edit',
        button: {
            props: {
                children: [<Icon key="icon" data={PencilToSquare} />, 'Edit'],
                onClick: () => console.log('Edit'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('Edit'),
                text: (
                    <Flex alignItems="center" gap={1}>
                        <Icon data={PencilToSquare} />
                        Edit
                    </Flex>
                ),
            },
        },
    },
    {
        id: 'copy',
        button: {
            props: {
                children: [<Icon key="icon" data={Files} />, 'Copy'],
                onClick: () => console.log('Copy'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('Copy'),
                text: (
                    <Flex alignItems="center" gap={1}>
                        <Icon data={Files} />
                        Copy
                    </Flex>
                ),
            },
        },
    },
    {
        id: 'delete',
        collapsed: true,
        button: {
            props: {
                children: [<Icon key="icon" data={TrashBin} />, 'Delete'],
                onClick: () => console.log('Delete'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('Delete'),
                text: (
                    <Flex alignItems="center" gap={1}>
                        <Icon data={TrashBin} />
                        Delete
                    </Flex>
                ),
            },
        },
    },
];

export const actionsWithNote: ActionsPanelProps['actions'] = [
    {
        id: 'action_1',
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
                view: 'normal-contrast',
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 1'),
                text: 'Action 1',
            },
        },
    },
    {
        id: 'action_2',
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 2'),
                text: 'Action 2',
            },
        },
    },
    {
        id: 'action_3',
        button: {
            props: {
                children: 'Action 3',
                onClick: () => console.log('click button action 3'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 3'),
                text: 'Action 3',
            },
        },
    },
    {
        id: 'action_4',
        button: {
            props: {
                children: 'Action 4',
                onClick: () => console.log('click button action 4'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 4'),
                text: 'Action 4',
            },
        },
    },
];

export const actionsGroups: ActionsPanelProps['actions'] = [
    {
        id: 'action_1',
        collapsed: true,
        button: {
            props: {
                children: 'Action 1',
                onClick: () => console.log('click button action 1'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 1'),
                text: 'Action 1',
            },
            group: '1',
        },
    },
    {
        id: 'action_2',
        collapsed: true,
        button: {
            props: {
                children: 'Action 2',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 2'),
                text: 'Action 2',
            },
            group: '2',
        },
    },
    {
        id: 'action_3',
        collapsed: true,
        button: {
            props: {
                children: 'Action 3',
                onClick: () => console.log('click button action 3'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 3'),
                text: 'Action 3',
            },
            group: '1',
        },
    },
];

export const actionsSubmenu: ActionsPanelProps['actions'] = [
    {
        id: 'button-with-sub-menu',
        button: {
            props: {
                children: ['Sub-menu', <Icon key="icon" data={ChevronDown} />],
                view: 'outlined-contrast',
                onClick: () => console.log('click button action 2'),
            },
        },
        dropdown: {
            item: {
                text: 'Sub-menu',
                items: [
                    {
                        action: () => console.log('Edit'),
                        text: 'Edit',
                    },
                    {
                        action: () => console.log('Delete'),
                        text: 'Delete',
                        theme: 'danger',
                    },
                ],
            },
        },
    },
    {
        id: 'nested-menu',
        collapsed: true,
        button: {
            props: {
                children: 'Nested',
                onClick: () => console.log('click button nested'),
            },
        },
        dropdown: {
            item: {
                text: 'Other',
                items: [
                    {
                        text: 'Select',
                        items: [
                            {
                                action: () => console.log('Select One'),
                                text: 'One',
                            },
                            {
                                action: () => console.log('Select All'),
                                text: 'All',
                            },
                        ],
                    },
                    {
                        action: () => console.log('Copy'),
                        text: 'Copy',
                    },
                    {
                        text: 'Move to',
                        items: [
                            {
                                action: () => console.log('Move to folder 1'),
                                text: 'Folder 1',
                            },
                            {
                                action: () => console.log('Move to folder 2'),
                                text: 'Folder 2',
                            },
                        ],
                    },
                ],
            },
        },
    },
];
