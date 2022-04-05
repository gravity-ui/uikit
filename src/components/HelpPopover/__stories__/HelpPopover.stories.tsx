import React from 'react';
import {Meta, Story} from '@storybook/react';
import {HelpPopover, HelpPopoverProps} from '../HelpPopover';

export default {
    title: 'Components/HelpPopover',
    component: HelpPopover,
} as Meta;

const DefaultTemplate: Story<HelpPopoverProps> = (args) => <HelpPopover {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    content: 'Some content',
};
