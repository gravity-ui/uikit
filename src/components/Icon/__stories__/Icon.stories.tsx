import React from 'react';

import type {Meta, Story} from '@storybook/react';

import {GearIcon} from '../../icons/GearIcon';
import {Icon} from '../Icon';
import type {IconProps} from '../Icon';

export default {
    title: 'Components/Icon',
    component: Icon,
} as Meta;

const DefaultTemplate: Story<IconProps> = (args) => <Icon {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    data: GearIcon,
};
