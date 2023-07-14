import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Label} from '../Label';

export default {
    title: 'Components/Basic/Label',
    id: 'components/Label',
    args: {
        children: 'Label',
        theme: 'normal',
        type: 'default',
        size: 's',
        disabled: false,
        interactive: false,
    },
    argTypes: {
        theme: {
            options: ['normal', 'info', 'danger', 'warning', 'success', 'unknown', 'clear'],
            control: {type: 'select'},
        },
        type: {
            options: ['default', 'copy', 'close'],
            control: {type: 'select'},
        },
        size: {
            options: ['xs', 's', 'm'],
            control: {type: 'radio'},
        },
        disabled: {
            control: 'boolean',
        },
        interactive: {
            control: 'boolean',
        },
        children: {
            control: {type: 'text'},
        },
        value: {
            options: [undefined, 'With value'],
            control: {type: 'radio'},
        },
    },
    parameters: {
        order: -100,
    },
} as Meta;

export const Playground: StoryFn = (args) => {
    return <Label {...args} />;
};
Playground.storyName = 'Label';
