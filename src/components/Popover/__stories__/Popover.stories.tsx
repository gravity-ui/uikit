import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Popover, PopoverProps} from '../Popover';
import {PopoverShowcase} from './PopoverShowcase';

export default {
    title: 'Components/Popover',
    component: Popover,
} as Meta;

const DefaultTemplate: Story<PopoverProps> = (args) => (
    <Popover {...args}>Move the cursor here to show popover</Popover>
);
export const Default = DefaultTemplate.bind({});
Default.args = {
    content: 'Popover content',
};

const ShowcaseTemplate: Story = () => <PopoverShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
