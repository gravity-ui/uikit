import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {RadioButton} from '../RadioButton';

import {RadioButtonShowcase} from './RadioButtonShowcase';

export default {
    title: 'Components/Inputs/RadioButton',
    component: RadioButton,
} as Meta;

type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
    args: {
        options: [
            {value: 'Value 1', content: 'Value 1'},
            {value: 'Value 2', content: 'Value 2'},
            {value: 'Value 3', content: 'Value 3'},
        ],
    },
};

export const Size: Story = {
    render: (args) => (
        <Showcase>
            <ShowcaseItem title="Size s">
                <RadioButton {...args} size="s" />
            </ShowcaseItem>
            <ShowcaseItem title="Size m">
                <RadioButton {...args} size="m" />
            </ShowcaseItem>
            <ShowcaseItem title="Size l">
                <RadioButton {...args} size="l" />
            </ShowcaseItem>
            <ShowcaseItem title="Size xl">
                <RadioButton {...args} size="xl" />
            </ShowcaseItem>
        </Showcase>
    ),
    args: {
        ...Default.args,
    },
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
    },
};

export const ShowcaseStory: Story = {
    render: () => <RadioButtonShowcase />,
    name: 'Showcase',
};
