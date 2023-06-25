import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {TextArea} from '../TextArea';
import type {TextAreaProps} from '../types';

import {TextAreaShowcase} from './TextAreaShowcase';

export default {
    title: 'Components/TextArea',
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
