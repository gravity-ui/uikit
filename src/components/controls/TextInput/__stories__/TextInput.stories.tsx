import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {TextInput} from '../TextInput';
import type {TextInputProps} from '../TextInput';

import {TextInputShowcase} from './TextInputShowcase';

export default {
    title: 'Components/Inputs/TextInput',
    component: TextInput,
} as Meta;

const fixConsoleErrors = {
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyPress: () => {},
};

const DefaultTemplate: StoryFn<TextInputProps> = (args) => (
    <TextInput {...fixConsoleErrors} {...args} />
);
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: StoryFn = () => <TextInputShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
