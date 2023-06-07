import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {HelpPopover} from '../HelpPopover';
import type {HelpPopoverProps} from '../HelpPopover';

export default {
    title: 'Components/HelpPopover',
    component: HelpPopover,
} as Meta;

const DefaultTemplate: StoryFn<HelpPopoverProps> = (args) => <HelpPopover {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    content: 'Some content',
};
