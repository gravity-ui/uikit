import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

export default {
    title: 'Components/Layout',
    id: 'Layout',
    parameters: {
        order: -100,
    },
} as Meta;

export const Playground: StoryFn = () => <React.Fragment></React.Fragment>;
Playground.storyName = 'Layout';
