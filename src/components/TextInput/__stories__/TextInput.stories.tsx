import React from 'react';

import {Meta, Story} from '@storybook/react';

import {TextInput, TextInputProps} from '../TextInput';

import {TextInputShowcase} from './TextInputShowcase';

export default {
    title: 'Components/TextInput',
    component: TextInput,
} as Meta;

const fixConsoleErrors = {
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyPress: () => {},
};

const DefaultTemplate: Story<TextInputProps> = (args) => (
    <TextInput {...fixConsoleErrors} {...args} />
);
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: Story = () => <TextInputShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
