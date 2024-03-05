import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {Switch} from '../Switch';

import {SwitchShowcase} from './SwitchShowcase';

export default {
    title: 'Components/Inputs/Switch',
    component: Switch,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'label',
                        enabled: true,
                        selector: '[id^="with-title"]', // other cases can not use labels
                    },
                ],
            },
        },
    },
} as Meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
    args: {
        content: 'Label',
    },
};

export const Checked: Story = {
    args: {
        ...Default.args,
        checked: true,
    },
};

export const Size: Story = {
    render: (args) => (
        <Showcase>
            <Switch {...args} size="m">
                Size m
            </Switch>
            <Switch {...args} size="l">
                Size l
            </Switch>
        </Showcase>
    ),
};

export const Disabled: Story = {
    render: (args) => (
        <Showcase>
            <Switch {...args} disabled checked={false}>
                Unchecked
            </Switch>
            <Switch {...args} disabled checked>
                Checked
            </Switch>
        </Showcase>
    ),
};

export const ShowcaseStory: Story = {
    render: () => <SwitchShowcase />,
    name: 'Showcase',
};
