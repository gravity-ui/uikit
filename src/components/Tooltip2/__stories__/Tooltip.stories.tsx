import React from 'react';
import {Story} from '@storybook/react';
import {Tooltip, TooltipProps} from '../Tooltip';
import {Button} from '../../Button';

export default {
    title: 'Components/Tooltip2',
    component: Tooltip,
};

const DefaultTemplate: Story<TooltipProps> = (args) => <Tooltip {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    text: 'Hello world!',
    children: <Button>Hover to see tooltip</Button>,
};
