import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Slider} from '../Slider';

import {SliderShowcase} from './SliderShowcase';

type Story = StoryObj<typeof Slider>;

export default {
    title: 'Components/Inputs/Slider',
    component: Slider,
    tags: ['autodocs'],
} as Meta;

export const Default: Story = {};

export const Showcase: Story = {
    render: (args) => {
        return <SliderShowcase {...args} />;
    },
};
