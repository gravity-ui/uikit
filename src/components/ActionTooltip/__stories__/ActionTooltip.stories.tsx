import React from 'react';
import {Story} from '@storybook/react';
import {ActionTooltip, ActionTooltipProps} from '../ActionTooltip';
import {Button} from '../../Button';

export default {
    title: 'Components/ActionTooltip',
    component: ActionTooltip,
};

const DefaultTemplate: Story<ActionTooltipProps> = (args) => <ActionTooltip {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    title: 'Tooltip text',
    hotkey: 'mod+s',
    description:
        'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
    children: <Button>Hover to see tooltip</Button>,
};
