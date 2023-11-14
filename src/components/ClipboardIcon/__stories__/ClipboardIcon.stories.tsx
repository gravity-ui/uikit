import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {ClipboardIcon} from '../ClipboardIcon';
import type {ClipboardIconProps} from '../ClipboardIcon';

import './ClipboardIcon.stories.scss';

export default {
    title: 'Components/Utils/ClipboardIcon',
    component: ClipboardIcon,
    args: {size: 24},
} as Meta;

const DefaultTemplate: StoryFn<ClipboardIconProps> = (args) => (
    <div className="clipboard-icon-stories">
        Default: <ClipboardIcon {...args} status="pending" />
        Success: <ClipboardIcon {...args} status="success" />
        Error: <ClipboardIcon {...args} status="error" />
    </div>
);
export const Default = DefaultTemplate.bind({});
