import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {Tooltip, TooltipProps} from '../Tooltip';
import {TooltipShowcase} from './TooltipShowcase';

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
} as Meta;

const DefaultTemplate: Story<TooltipProps> = (args) => (
    <Tooltip {...args}>Move the cursor here to show tooltip</Tooltip>
);
export const Default = DefaultTemplate.bind({});
Default.args = {
    content: <>Tooltip content</>,
};

const ShowcaseTemplate: Story = () => <TooltipShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
