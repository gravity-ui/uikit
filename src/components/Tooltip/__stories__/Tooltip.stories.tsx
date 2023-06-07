import React from 'react';

import type {StoryFn} from '@storybook/react';

import {Button} from '../../Button';
import {Tooltip} from '../Tooltip';
import type {TooltipProps} from '../Tooltip';

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
};

const DefaultTemplate: StoryFn<TooltipProps> = (args) => <Tooltip {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    content: 'Hello world!',
    children: <Button>Hover to see tooltip</Button>,
};
