import React from 'react';

import type {Meta, StoryFn, StoryObj} from '@storybook/react';

import {StoryLayout} from '../../../demo/StoryLayout/StoryLayout';
import {Checkbox} from '../Checkbox';

import {CheckboxShowcase} from './CheckboxShowcase';

export default {
    title: 'Components/Inputs/Checkbox',
    component: Checkbox,
} as Meta;

type Story = StoryObj<typeof Checkbox>;

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

export const Indeterminate: Story = {
    args: {
        ...Default.args,
        indeterminate: true,
    },
};

export const Size: Story = {
    render: (args) => (
        <StoryLayout>
            <Checkbox {...args} size="m">
                Size m
            </Checkbox>
            <Checkbox {...args} size="l">
                Size l
            </Checkbox>
        </StoryLayout>
    ),
};

export const Disabled: Story = {
    render: (args) => (
        <StoryLayout>
            <Checkbox {...args} disabled checked={false}>
                Unchecked
            </Checkbox>
            <Checkbox {...args} disabled checked>
                Checked
            </Checkbox>
            <Checkbox {...args} disabled indeterminate>
                Indeterminate
            </Checkbox>
        </StoryLayout>
    ),
};

const ShowcaseTemplate: StoryFn = () => <CheckboxShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
