import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Slider} from '../Slider';
import type {SliderProps} from '../sliderTypes';

export default {
    title: 'Components/Inputs/Slider',
    component: Slider,
} as Meta;

const DefaultTemplate: StoryFn<SliderProps> = (args) => <Slider {...args} />;
export const Default = DefaultTemplate.bind({});
