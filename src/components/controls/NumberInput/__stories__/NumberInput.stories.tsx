import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {NumberInput} from '../NumberInput';
import type {NumberInputProps} from '../NumberInput';

import {CustomThemeShowcase} from './NumberInputCustomThemeShowcase';
import {NumberInputShowcase} from './NumberInputShowcase';

export default {
    title: 'Components/Inputs/NumberInput',
    component: NumberInput,
} as Meta;

const fixConsoleErrors = {
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyPress: () => {},
};

const DefaultTemplate: StoryFn<NumberInputProps> = (args) => (
    <NumberInput {...fixConsoleErrors} {...args} />
);
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: StoryFn = () => <NumberInputShowcase />;
export const Showcase = ShowcaseTemplate.bind({});

const CustomThemeTemplate: StoryFn = () => <CustomThemeShowcase />;
export const CustomTheme = CustomThemeTemplate.bind({});
