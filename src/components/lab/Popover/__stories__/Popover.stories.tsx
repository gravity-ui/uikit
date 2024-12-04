import React from 'react';

import {action} from '@storybook/addon-actions';
import type {Meta, StoryObj} from '@storybook/react';

import {Button} from '../../../Button';
import {Flex} from '../../../layout';
import {Popover} from '../Popover';

const meta: Meta<typeof Popover> = {
    title: 'Lab/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
    },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
    render: (args) => (
        <Popover {...args}>
            <Button>Anchor</Button>
        </Popover>
    ),
    args: {
        content: <div style={{padding: 10}}>Content</div>,
        onOpenChange: action('onOpenChange'),
    },
};

export const Delay: Story = {
    render: (args) => (
        <Flex gap={3}>
            <Popover {...args} delay={{open: 1000}}>
                <Button>Open Delay: 1000ms</Button>
            </Popover>
            <Popover {...args} delay={{close: 2000}}>
                <Button>Close Delay: 2000ms</Button>
            </Popover>
        </Flex>
    ),
    args: {
        ...Default.args,
    },
};

export const OnlyClick: Story = {
    ...Default,
    args: {
        ...Default.args,
        trigger: 'click',
    },
};

export const Disabled: Story = {
    ...Default,
    args: {
        ...Default.args,
        disabled: true,
    },
};

export const SafePolygon: Story = {
    ...Default,
    args: {
        ...Default.args,
        delay: 0,
        offset: 50,
        enableSafePolygon: true,
    },
};
