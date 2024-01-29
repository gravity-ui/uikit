import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {ArrowToggle, type ArrowToggleProps} from '../ArrowToggle';

const directions = ['top', 'left', 'bottom', 'right'] as Array<ArrowToggleProps['direction']>;

export default {
    title: 'Components/Utils/ArrowToggle',
    id: 'components/utils/ArrowToggle',
    args: {
        direction: 'bottom',
        size: 16,
    },
    argTypes: {
        direction: {
            options: directions,
            control: {type: 'select'},
        },
        size: {
            control: {type: 'input'},
        },
    },
} as Meta;

export const Playground: StoryFn = (args: ArrowToggleProps) => {
    return <ArrowToggle size={args.size} direction={args.direction} />;
};
Playground.storyName = 'ArrowToggle';
