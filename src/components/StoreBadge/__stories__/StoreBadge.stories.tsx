import React from 'react';

import {Meta, Story} from '@storybook/react';

import {Platform} from '../../mobile/constants';
import {StoreBadge, StoreBadgeProps} from '../StoreBadge';

export default {
    title: 'Components/StoreBadge',
    component: StoreBadge,
} as Meta;

const DefaultTemplate: Story<StoreBadgeProps> = (args) => <StoreBadge {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    platform: Platform.IOS,
};
