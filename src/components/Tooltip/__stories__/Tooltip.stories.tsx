import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Button} from '../../Button';
import {Tooltip} from '../Tooltip';

const meta: Meta<typeof Tooltip> = {
    title: 'Components/Overlays/Tooltip',
    component: Tooltip,
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    render: (args) => {
        return (
            <Tooltip {...args}>
                <Button extraProps={{'aria-describedby': args.id}}>Hover to see tooltip</Button>
            </Tooltip>
        );
    },
    args: {
        id: 'tooltip-id',
        content: 'Hello world!',
    },
};
