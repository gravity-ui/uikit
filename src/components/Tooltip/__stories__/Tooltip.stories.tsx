import React from 'react';

import {Story} from '@storybook/react';

import {Button} from '../../Button';
import {Tooltip, TooltipProps} from '../Tooltip';

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
