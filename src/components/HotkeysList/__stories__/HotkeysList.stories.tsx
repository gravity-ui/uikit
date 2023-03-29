import block from 'bem-cn-lite';
import React, {JSXElementConstructor} from 'react';
import type {ComponentMeta, ComponentStory} from '@storybook/react';
import {HotkeysGroup, HotkeysList, HotkeysListProps} from '..';
import './HotkeysList.scss';

const b = block('hotkeys-list-story');

type ComponentType = JSXElementConstructor<HotkeysListProps<{}>>;

export default {
    title: 'Components/HotkeysList',
    component: HotkeysList,
    args: {
        filterable: false,
        virtualized: false,
        sortable: false,
        deactivateOnLeave: true,
    },
} as ComponentMeta<ComponentType>;

const hotkeys: HotkeysGroup[] = [
    {
        title: 'General',
        items: [
            {
                title: 'Copy',
                value: 'ctrl+c',
            },
            {
                title: 'Paste',
                value: 'ctrl+v',
            },
        ],
    },
    {
        title: 'Issue',
        items: [
            {
                title: 'Go to comments',
                value: 'shift+c',
            },
            {
                title: 'Got to history',
                value: 'shift+h',
            },
            {
                title: 'Edit description',
                value: 'alt+d',
            },
        ],
    },
];

const DefaultTemplate: ComponentStory<ComponentType> = (args) => <HotkeysList {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    hotkeys,
    className: b(),
};
