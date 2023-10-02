import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Radio} from '../Radio';
import type {RadioProps} from '../Radio';

import {RadioShowcase} from './RadioShowcase';

export default {
    title: 'Components/Inputs/Radio',
    component: Radio,
} as Meta;

const DefaultTemplate: StoryFn<RadioProps> = (args) => <Radio {...args} />;
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: StoryFn = () => <RadioShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
