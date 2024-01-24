import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {TextArea} from '../TextArea';
import type {TextAreaProps} from '../TextArea';

import {TextAreaCustomShowcase, TextAreaShowcase} from './TextAreaShowcase';

export default {
    title: 'Components/Inputs/TextArea',
    component: TextArea,
} as Meta;

const fixConsoleErrors = {
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyPress: () => {},
};

const DefaultTemplate: StoryFn<TextAreaProps> = (args) => (
    <TextArea {...fixConsoleErrors} {...args} />
);
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: StoryFn = () => <TextAreaShowcase />;
export const Showcase = ShowcaseTemplate.bind({});

const CustomTemplate: StoryFn = () => <TextAreaCustomShowcase />;
export const CustomTheme = CustomTemplate.bind({});
