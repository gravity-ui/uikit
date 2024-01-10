import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Slider} from '../Slider';
import type {SliderProps} from '../sliderTypes';

export default {
    title: 'Components/Slider',
    component: Slider,
} as Meta;

const DefaultTemplate: StoryFn<SliderProps> = (args) => <Slider {...args} onChange={console.log} />;
export const Default = DefaultTemplate.bind({});

const SizeTemplate: StoryFn<SliderProps> = (args) => (
    <div>
        s: <Slider {...args} size="s" />
        <span style={{margin: '16px'}} />
        m: <Slider {...args} size="m" />
        <span style={{margin: '16px'}} />
        l: <Slider {...args} size="l" />
        <span style={{margin: '16px'}} />
        xl: <Slider {...args} size="xl" />
    </div>
);
export const Size = SizeTemplate.bind({});
