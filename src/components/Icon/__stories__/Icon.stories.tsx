import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Icon, IconProps} from '../Icon';
import {GearIcon} from '../../icons/GearIcon';

export default {
    title: 'Components/Icon',
    component: Icon,
} as Meta;

const DefaultTemplate: Story<IconProps> = (args) => <Icon {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    data: GearIcon,
};
