import React from 'react';
import {Story} from '@storybook/react';
import {Tooltip, TooltipProps} from '../Tooltip';
import {Button} from '../../Button';

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
};

const DefaultTemplate: Story<TooltipProps> = (args) => <Tooltip {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    content: 'Hello world!',
    children: <Button>Hover to see tooltip</Button>,
};
