import React from 'react';

import {Meta, Story} from '@storybook/react';

import {ClipboardButton, ClipboardButtonProps} from '../ClipboardButton';

export default {
    title: 'Components/ClipboardButton',
    component: ClipboardButton,
} as Meta;

const DefaultTemplate: Story<ClipboardButtonProps> = (args) => <ClipboardButton {...args} />;
export const Default = DefaultTemplate.bind({});
