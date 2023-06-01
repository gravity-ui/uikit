import React from 'react';

import type {Meta, Story} from '@storybook/react';

import {ClipboardButton} from '../ClipboardButton';
import type {ClipboardButtonProps} from '../ClipboardButton';

export default {
    title: 'Components/ClipboardButton',
    component: ClipboardButton,
} as Meta;

const DefaultTemplate: Story<ClipboardButtonProps> = (args) => <ClipboardButton {...args} />;
export const Default = DefaultTemplate.bind({});
