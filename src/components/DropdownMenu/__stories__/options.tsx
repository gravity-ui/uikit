import React from 'react';

import type {DropdownMenuItem, DropdownMenuItemMixed} from '../types';

export const options: DropdownMenuItem<unknown>[] = [
    {
        action: () => console.log('==> action "Delete" called'),
        text: 'Delete',
        theme: 'danger',
    },
    {
        action: () => console.log('==> action "Rename" called'),
        text: 'Rename',
    },
];

export const userOptions: DropdownMenuItem<unknown>[] = [
    {
        action: () => console.log('==> action "Call" called'),
        text: 'Call',
    },
    {
        action: () => console.log('==> action "Send email" called'),
        text: 'Send email',
    },
];

// export const optionsWithIcons: DropdownMenuItem<unknown>[] = [
//     {
//         action: () => console.log('==> action "Delete" called'),
//         text: 'Delete',
//         icon: <Icon data={iconTrash} />,
//         theme: 'danger',
//     },
//     {
//         action: () => console.log('==> action "Rename" called'),
//         text: 'Rename',
//         icon: <Icon data={iconRename} />,
//     },
// ];

export const optionsWithGroups: DropdownMenuItemMixed<unknown>[] = [
    [
        {
            action: () => console.log('==> action "Delete" called'),
            text: 'Delete',
            theme: 'danger',
        },
        {
            action: () => console.log('==> action "Rename" called'),
            text: 'Rename',
        },
    ],
    {
        action: () => console.log('==> action "Call" called'),
        text: 'Call',
    },
    {
        action: () => console.log('==> action "Send email" called'),
        text: 'Send email',
    },
    [
        {
            action: () => console.log('==> action "Accept call" called'),
            text: 'Accept call',
        },
        {
            action: () => console.log('==> action "Accept email" called'),
            text: 'Accept email',
        },
    ],
    [
        {
            action: () => console.log('==> action "Decline call" called'),
            text: 'Decline call',
        },
        {
            action: () => console.log('==> action "Decline email" called'),
            text: 'Decline email',
        },
    ],
];

export const optionsAssorted: DropdownMenuItem<unknown>[] = [
    {
        action: () => console.log('==> normal item action called'),
        text: 'I am an item',
    },
    {
        action: () => console.log('==> disabled item action called -_-'),
        text: 'I am disabled item',
        disabled: true,
    },
    {
        action: () => console.log('==> link action called'),
        text: 'I am a link item',
        title: '(I open in new folder)',
        href: 'https://cloud.yandex.com',
        target: '_blank',
        rel: 'noopener noreferrer',
    },
    {
        action: () => console.log('==> magic action called'),
        text: (
            <>
                I am <span style={{color: 'deeppink'}}>magic</span> item with React.Node
            </>
        ),
    },
];
