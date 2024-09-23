import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import type {ActionsPanelProps} from '../../ActionsPanel';
import {ActionsPanel} from '../../ActionsPanel';

import {actions, actionsGroups, actionsSubmenu, actionsWithIcons} from './actions';

export default {
    title: 'Components/Data Display/ActionsPanel',
    component: ActionsPanel,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta;

const WithIconsTemplate: StoryFn<ActionsPanelProps> = (args) => {
    return (
        <ActionsPanel
            {...args}
            actions={actionsWithIcons}
            onClose={() => console.log('onClose called')}
        />
    );
};
export const WithIcons = WithIconsTemplate.bind({});

const WithNoteTemplate: StoryFn<ActionsPanelProps> = (args) => {
    return (
        <ActionsPanel
            {...args}
            actions={actions}
            onClose={() => console.log('onClose called')}
            renderNote={() => '10 items'}
        />
    );
};
export const WithNote = WithNoteTemplate.bind({});

const GroupsTemplate: StoryFn<ActionsPanelProps> = (args) => {
    return <ActionsPanel {...args} actions={actionsGroups} />;
};
export const Groups = GroupsTemplate.bind({});

const SubmenuTemplate: StoryFn<ActionsPanelProps> = (args) => {
    return <ActionsPanel {...args} actions={actionsSubmenu} />;
};
export const Submenu = SubmenuTemplate.bind({});
