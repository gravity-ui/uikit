import React from 'react';

import type {Meta, StoryFn, StoryObj} from '@storybook/react';

import {StoryLayout} from '../../../demo/StoryLayout/StoryLayout';
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
        <StoryLayout>
            <Radio {...args} size="m">
                Size m
            </Radio>
            <Radio {...args} size="l">
                Size l
            </Radio>
        </StoryLayout>
    ),
};

export const Disabled: Story = {
    render: (args) => (
        <StoryLayout>
            <Radio {...args} disabled checked={false}>
                Unchecked
            </Radio>
            <Radio {...args} disabled checked>
                Checked
            </Radio>
        </StoryLayout>
    ),
};

const ShowcaseTemplate: StoryFn = () => <RadioShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
