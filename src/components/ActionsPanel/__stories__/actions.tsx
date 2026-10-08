import {ChevronDown, Files, PencilToSquare, TrashBin} from '@gravity-ui/icons';

import type {ActionsPanelProps} from '..';
import {Icon} from '../../Icon';
import {Menu, MenuItem} from '../../Menu';
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
        menu: {
            item: {
                onClick: () => console.log('click menu action 1'),
                children: 'Action 1',
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
        menu: {
            item: {
                onClick: () => console.log('click menu action 2'),
                children: 'Action 2',
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
        menu: {
            item: {
                onClick: () => console.log('Edit'),
                children: (
                    <Flex alignItems="center" gap="spacing-1">
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
        menu: {
            item: {
                onClick: () => console.log('Copy'),
                children: (
                    <Flex alignItems="center" gap="spacing-1">
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
        menu: {
            item: {
                onClick: () => console.log('Delete'),
                children: (
                    <Flex alignItems="center" gap="spacing-1">
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
                view: 'contrast-light',
            },
        },
        menu: {
            item: {
                onClick: () => console.log('click menu action 1'),
                children: 'Action 1',
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
        menu: {
            item: {
                onClick: () => console.log('click menu action 2'),
                children: 'Action 2',
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
        menu: {
            item: {
                onClick: () => console.log('click menu action 3'),
                children: 'Action 3',
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
        menu: {
            item: {
                onClick: () => console.log('click menu action 4'),
                children: 'Action 4',
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
        menu: {
            item: {
                onClick: () => console.log('click menu action 1'),
                children: 'Action 1',
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
        menu: {
            item: {
                onClick: () => console.log('click menu action 2'),
                children: 'Action 2',
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
        menu: {
            item: {
                onClick: () => console.log('click menu action 3'),
                children: 'Action 3',
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
                view: 'outlined',
            },
        },
        menu: {
            item: {
                children: [
                    'Sub-menu',
                    <Menu key="submenu" size="s">
                        <MenuItem onClick={() => console.log('Edit')}>Edit</MenuItem>
                        <MenuItem onClick={() => console.log('Delete')} theme="danger">
                            Delete
                        </MenuItem>
                    </Menu>,
                ],
            },
        },
    },
    {
        id: 'nested-menu',
        collapsed: true,
        button: {props: {children: 'Nested'}},
        menu: {
            item: {
                children: [
                    'Other',
                    <Menu key="submenu" size="s">
                        <MenuItem>
                            Select
                            <Menu size="s">
                                <MenuItem onClick={() => console.log('Select One')}>One</MenuItem>
                                <MenuItem onClick={() => console.log('Select All')}>All</MenuItem>
                            </Menu>
                        </MenuItem>
                        <MenuItem onClick={() => console.log('Copy')}>Copy</MenuItem>
                        <MenuItem>
                            Move to
                            <Menu size="s">
                                <MenuItem onClick={() => console.log('Move to folder 1')}>
                                    Folder 1
                                </MenuItem>
                                <MenuItem onClick={() => console.log('Move to folder 2')}>
                                    Folder 2
                                </MenuItem>
                            </Menu>
                        </MenuItem>
                    </Menu>,
                ],
            },
        },
    },
];
