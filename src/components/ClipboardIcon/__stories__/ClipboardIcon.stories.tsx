import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {ClipboardIcon} from '../ClipboardIcon';

export default {
    title: 'Components/Utils/ClipboardIcon',
    component: ClipboardIcon,
    args: {size: 20},
} as Meta;

type Story = StoryObj<typeof ClipboardIcon>;

export const Default: Story = {args: {status: 'pending'}};

export const Success: Story = {
    render: (args) => (
        <Showcase>
            <ClipboardIcon {...args} status="success" />
        </Showcase>
    ),
};
export const Error: Story = {
    render: (args) => (
        <Showcase>
            <ClipboardIcon {...args} status="error" />
        </Showcase>
    ),
};
