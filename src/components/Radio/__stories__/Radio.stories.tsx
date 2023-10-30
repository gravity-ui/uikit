import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {Radio} from '../Radio';

import {RadioShowcase} from './RadioShowcase';

export default {
    title: 'Components/Inputs/Radio',
    component: Radio,
} as Meta;

type Story = StoryObj<typeof Radio>;

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
            <Radio {...args} size="m">
                Size m
            </Radio>
            <Radio {...args} size="l">
                Size l
            </Radio>
        </Showcase>
    ),
};

export const Disabled: Story = {
    render: (args) => (
        <Showcase>
            <Radio {...args} disabled checked={false}>
                Unchecked
            </Radio>
            <Radio {...args} disabled checked>
                Checked
            </Radio>
        </Showcase>
    ),
};

export const ShowcaseStory: Story = {
    render: () => <RadioShowcase />,
    name: 'Showcase',
};
