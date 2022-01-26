import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {HelpTooltip, HelpTooltipProps} from '../HelpTooltip';

export default {
    title: 'Components/HelpTooltip',
    component: HelpTooltip,
} as Meta;

const DefaultTemplate: Story<HelpTooltipProps> = (args) => <HelpTooltip {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    content: 'Some content',
};
