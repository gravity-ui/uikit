import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Spin} from '../Spin';
import type {SpinProps} from '../Spin';

export default {
    title: 'Components/Spin',
    component: Spin,
} as Meta;

const DefaultTemplate: StoryFn<SpinProps> = (args) => <Spin {...args} />;
export const Default = DefaultTemplate.bind({});

const SizeTemplate: StoryFn<SpinProps> = (args) => (
    <div>
        xs: <Spin {...args} size="xs" />
        <span style={{margin: '16px'}} />
        s: <Spin {...args} size="s" />
        <span style={{margin: '16px'}} />
        m: <Spin {...args} size="m" />
        <span style={{margin: '16px'}} />
        l: <Spin {...args} size="l" />
        <span style={{margin: '16px'}} />
        xl: <Spin {...args} size="xl" />
    </div>
);
export const Size = SizeTemplate.bind({});
