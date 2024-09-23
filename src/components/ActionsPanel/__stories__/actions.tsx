import React from 'react';

import {ChevronDown, PencilToSquare} from '@gravity-ui/icons';

import type {ActionsPanelProps} from '../../ActionsPanel';
import {Icon} from '../../Icon';

export const actions: ActionsPanelProps['actions'] = [
    {
        id: 'id1',
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
        id: 'id2',
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
        id: 'id3',
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
        id: 'id4',
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
    {
        id: 'id5',
        button: {
            props: {
                children: 'Action 5',
                onClick: () => console.log('click button action 5'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 5'),
                text: 'Action 5',
            },
        },
    },
    {
        id: 'id6',
        button: {
            props: {
                children: 'Action 6',
                onClick: () => console.log('click button action 6'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 6'),
                text: 'Action 6',
            },
        },
    },
];

export const actionsWithIcons: ActionsPanelProps['actions'] = [
    {
        id: 'id1',
        button: {
            props: {
                children: [<Icon key="icon" data={PencilToSquare} />, 'Action 1'],
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
        id: 'id2',
        button: {
            props: {
                children: [<Icon key="icon" data={PencilToSquare} />, 'Action 2'],
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
        id: 'id3',
        collapsed: true,
        button: {
            props: {
                children: [<Icon key="icon" data={PencilToSquare} />, 'Action 3'],
                onClick: () => console.log('click button action 3'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 3'),
                text: (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Icon key="icon" data={PencilToSquare} />
                        <span style={{paddingLeft: '8px'}}>Action 3</span>
                    </div>
                ),
            },
        },
    },
];

export const actionsGroups: ActionsPanelProps['actions'] = [
    {
        id: 'id1',
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
        id: 'id2',
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
            group: '1',
        },
    },
    {
        id: 'id3',
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
        },
    },
    {
        id: 'id4',
        collapsed: true,
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
            group: '1',
        },
    },
    {
        id: 'id5',
        button: {
            props: {
                children: 'Action 5',
                onClick: () => console.log('click button action 5'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 5'),
                text: 'Action 5',
            },
        },
    },
    {
        id: 'id6',
        collapsed: true,
        button: {
            props: {
                children: 'Action 6',
                onClick: () => console.log('click button action 6'),
            },
        },
        dropdown: {
            item: {
                action: () => console.log('click dropdown action 6'),
                text: 'Action 6',
            },
            group: '6',
        },
    },
];

export const actionsSubmenu: ActionsPanelProps['actions'] = [
    {
        id: 'id1',
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
        id: 'id2',
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
                        action: () => console.log('==> action "Edit" called'),
                        text: 'Edit',
                    },
                    {
                        action: () => console.log('==> action "Delete" called'),
                        text: 'Delete',
                        theme: 'danger',
                    },
                ],
            },
        },
    },
    {
        id: 'id3',
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
        id: 'id4',
        collapsed: true,
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
    {
        id: 'id5',
        collapsed: true,
        button: {
            props: {
                children: 'Action 5',
                onClick: () => console.log('click button action 5'),
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
                                action: () => console.log('==> action "Select one" called'),
                                text: 'One',
                            },
                            {
                                action: () => console.log('==> action "Select all" called'),
                                text: 'All',
                            },
                        ],
                    },
                    {
                        action: () => console.log('==> action "Copy" called'),
                        text: 'Copy',
                    },
                    {
                        text: 'Move to',
                        items: [
                            {
                                action: () => console.log('==> action "Move to Folder 1" called'),
                                text: 'Folder 1',
                            },
                            {
                                action: () => console.log('==> action "Move to Folder 2" called'),
                                text: 'Folder 2',
                            },
                        ],
                    },
                ],
            },
        },
    },
];
