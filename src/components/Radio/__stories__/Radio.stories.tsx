import React from 'react';

import type {Meta, Story} from '@storybook/react';

import {Radio} from '../Radio';
import type {RadioProps} from '../Radio';

import {RadioShowcase} from './RadioShowcase';

export default {
    title: 'Components/Radio',
    component: Radio,
} as Meta;

const DefaultTemplate: Story<RadioProps> = (args) => <Radio {...args} />;
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: Story = () => <RadioShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
